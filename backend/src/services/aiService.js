import { z } from 'zod';
import { ENV } from '../config/env.js';
import { CAREER_COMPASS_SYSTEM_PROMPT, buildAnalysisPrompt } from '../prompts/careerPrompts.js';
import { CareerGptEngine } from './careerGptEngine.js';
import { RagService } from './ragService.js';
import { detectIntent, INTENTS } from '../utils/intentDetector.js';

// Strict Zod schema for structured AI Pathway analysis
export const aiPathwayOutputSchema = z.object({
  currentEducation: z.object({
    name: z.string(),
    level: z.string().optional(),
    stream: z.string().optional(),
    description: z.string().optional()
  }),
  summary: z.string(),
  counts: z.object({
    studyPathways: z.number(),
    careerFields: z.number(),
    jobRoles: z.number(),
    skills: z.number(),
    certifications: z.number()
  }),
  studyOptions: z.array(
    z.object({
      name: z.string(),
      level: z.string().optional(),
      relationshipType: z.string(),
      rationale: z.string(),
      eligibilityNote: z.string().optional()
    })
  ),
  careerFields: z.array(
    z.object({
      name: z.string(),
      demandScore: z.number().optional(),
      growthOutlook: z.string().optional(),
      description: z.string().optional()
    })
  ),
  jobOptions: z.array(
    z.object({
      title: z.string(),
      family: z.string().optional(),
      relationshipType: z.string(),
      entrySalary: z.string().optional(),
      keyTools: z.array(z.string()).optional(),
      whyFit: z.string().optional()
    })
  ),
  skills: z.array(
    z.object({
      name: z.string(),
      category: z.string().optional(),
      demandLevel: z.string().optional(),
      alreadyCoveredInEducation: z.boolean().optional()
    })
  ),
  certifications: z.array(
    z.object({
      title: z.string(),
      issuer: z.string().optional(),
      costTier: z.string().optional(),
      relevance: z.string().optional()
    })
  ),
  eligibility: z.array(
    z.object({
      target: z.string(),
      minimumCriteria: z.string(),
      licensingNotice: z.string().optional()
    })
  ),
  careerPaths: z.array(
    z.object({
      pathTitle: z.string(),
      stages: z.array(z.string()),
      estimatedTimeToReach: z.string().optional(),
      difficulty: z.string().optional()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      status: z.string(),
      actionRecommendation: z.string()
    })
  ),
  nextActions: z.array(
    z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
      timeframe: z.string().optional()
    })
  )
});

// Strict Zod schema for Chat Response (Section 17)
export const aiChatResponseSchema = z.object({
  answer: z.string(),
  intent: z.string(),
  confidence: z.enum(['HIGH', 'MEDIUM', 'NEEDS_VERIFICATION', 'GENERAL']),
  personalized: z.boolean(),
  userContextSummary: z
    .object({
      education: z.string().optional(),
      targetJob: z.string().optional(),
      knownSkills: z.array(z.string()).optional()
    })
    .optional(),
  eligibilityStatus: z
    .enum(['ELIGIBLE', 'POTENTIALLY_ELIGIBLE', 'NOT_ELIGIBLE', 'INSUFFICIENT_INFORMATION'])
    .nullable()
    .optional(),
  keyPoints: z.array(z.string()).optional(),
  skillGap: z
    .object({
      hasSkills: z.array(z.string()).optional(),
      missingSkills: z.array(z.string()).optional(),
      recommendedSkills: z.array(z.string()).optional()
    })
    .optional(),
  missingSkills: z.array(z.string()).optional(),
  roadmap: z
    .array(
      z.object({
        step: z.number(),
        title: z.string(),
        type: z.string().optional(),
        description: z.string().optional(),
        completed: z.boolean().optional()
      })
    )
    .optional(),
  comparisonTable: z
    .object({
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string()))
    })
    .optional(),
  sources: z
    .array(
      z.object({
        sourceName: z.string(),
        sourceUrl: z.string(),
        sourceType: z.string().optional(),
        organization: z.string().optional(),
        lastVerified: z.string().optional()
      })
    )
    .optional(),
  relatedActions: z
    .array(
      z.object({
        label: z.string(),
        to: z.string(),
        icon: z.string().optional()
      })
    )
    .optional()
});

export class AIService {
  /**
   * Generates AI personalized pathway analysis based on verified knowledge graph
   */
  static async generateFuturePath({ education, knowledgeContext, userGoal, status, country }) {
    const prompt = buildAnalysisPrompt({ education, knowledgeContext, userGoal, status, country });

    if (ENV.AI_API_KEY) {
      try {
        const responseJson = await this._callExternalAI(prompt);
        const parsed = aiPathwayOutputSchema.safeParse(responseJson);
        if (parsed.success) {
          return parsed.data;
        } else {
          console.warn('[AIService] External LLM output failed schema validation. Falling back to knowledge-graph synthesis.', parsed.error?.message);
        }
      } catch (err) {
        console.warn('[AIService] External AI call error:', err.message, '- falling back to knowledge synthesis engine.');
      }
    }

    return this._synthesizeFromKnowledgeGraph({ education, knowledgeContext, userGoal, status });
  }

  /**
   * RAG-Powered Conversational AI Assistant
   * Executes: Intent Detection -> User Context -> DB Search (RAG) -> LLM / Synthesis -> Response Validation
   */
  static async chatResponse({ message, userContext = {}, careerTwin = null, conversationHistory = [] }) {
    const rawQuestion = (message || '').trim();

    // 1. INTENT DETECTION
    const intent = detectIntent(rawQuestion);

    // 2. USER CONTEXT EXTRACTION
    const sanitizedUserContext = {
      currentEducation: userContext?.currentEducation || userContext?.education || userContext?.study || careerTwin?.education?.degreeName || 'B.Com',
      targetJob: userContext?.targetJob || userContext?.targetCareer || careerTwin?.targetJobs?.[0] || 'Data Analyst',
      skills: Array.isArray(userContext?.skills) ? userContext.skills : (careerTwin?.skills || []),
      specialization: userContext?.specialization || '',
      educationStatus: userContext?.educationStatus || userContext?.status || 'completed',
      goal: userContext?.goal || 'Job'
    };

    // 3. RAG KNOWLEDGE RETRIEVAL FROM MONGODB
    const ragData = await RagService.retrieveContext({
      query: rawQuestion,
      intent,
      userContext: sanitizedUserContext
    });

    // 4. ATTEMPT LIVE LLM GENERATION WITH STRICT SYSTEM PROMPT IF API KEY AVAILABLE
    if (ENV.AI_API_KEY) {
      try {
        const structuredLLMResponse = await this._callLLMChatWithRAG({
          message: rawQuestion,
          intent,
          userContext: sanitizedUserContext,
          ragData,
          conversationHistory
        });

        const validated = aiChatResponseSchema.safeParse(structuredLLMResponse);
        if (validated.success) {
          return validated.data;
        } else {
          console.warn('[AIService] LLM Structured Response validation failed:', validated.error?.message);
        }
      } catch (err) {
        console.warn('[AIService] External LLM failed, using deterministic RAG engine:', err.message);
      }
    }

    // 5. DETERMINISTIC RAG-GROUNDED SYNTHESIS (Zero hallucination fallback)
    return CareerGptEngine.generateStructuredResponse({
      message: rawQuestion,
      intent,
      userContext: sanitizedUserContext,
      careerTwin,
      ragData
    });
  }

  /**
   * Calls Google Gemini / OpenAI with Strict RAG Context & JSON Schema Output
   */
  static async _callLLMChatWithRAG({ message, intent, userContext, ragData, conversationHistory }) {
    const apiKey = ENV.AI_API_KEY;
    const model = ENV.AI_MODEL || 'gemini-1.5-flash';

    const systemInstructions = `You are Future Path AI, a professional, intelligent, personalized education and career counselor.
APP NAME: Future Path
TAGLINE: Your Education. Your Choices. Your Future.

STRICT ANTI-HALLUCINATION RULES:
1. Ground all factual assertions (eligibility, exams, government jobs, age limits, syllabus, required skills) in the provided VERIFIED FUTURE PATH DATABASE CONTEXT.
2. NEVER invent government recruitment rules, age limits, exam dates, or official licensing criteria.
3. If verified information is insufficient, explicitly state: "I don't have enough verified information to confirm that. Please check the latest official source."
4. Source Priority: Official Source > Verified Database > Trusted Reference > General Knowledge.
5. Answer "What does this mean for ME?" based on the user's background (${userContext.currentEducation}) and target (${userContext.targetJob}).

VERIFIED DATABASE CONTEXT:
${JSON.stringify(ragData.verifiedData, null, 2)}

VERIFIED SOURCES:
${JSON.stringify(ragData.sources, null, 2)}

USER PROFILE CONTEXT:
Current Education: ${userContext.currentEducation}
Status: ${userContext.educationStatus}
Target Job: ${userContext.targetJob}
Known Skills: ${userContext.skills.join(', ') || 'None stated'}

CONVERSATION INTENT: ${intent}

You MUST return a VALID JSON object matching this schema:
{
  "answer": "Clear markdown answer with structured headings (###, ####), bullet points, and personalized guidance.",
  "intent": "${intent}",
  "confidence": "HIGH",
  "personalized": true,
  "userContextSummary": {
    "education": "${userContext.currentEducation}",
    "targetJob": "${userContext.targetJob}"
  },
  "eligibilityStatus": "ELIGIBLE" | "POTENTIALLY_ELIGIBLE" | "NOT_ELIGIBLE" | "INSUFFICIENT_INFORMATION" | null,
  "keyPoints": ["Takeaway 1", "Takeaway 2"],
  "missingSkills": ["Skill 1", "Skill 2"],
  "roadmap": [
    { "step": 1, "title": "Step title", "type": "SKILL" | "PROJECT" | "CERTIFICATION" }
  ],
  "comparisonTable": {
    "headers": ["Dimension", "Option A", "Option B"],
    "rows": [["Duration", "..."], ["Focus", "..."]]
  },
  "sources": [
    {
      "sourceName": "Source name",
      "sourceUrl": "Source URL",
      "sourceType": "OFFICIAL",
      "lastVerified": "2026"
    }
  ],
  "relatedActions": [
    { "label": "View Full Roadmap", "to": "/my-path" },
    { "label": "Explore Related Jobs", "to": "/jobs" },
    { "label": "Check Skill Gap", "to": "/learn" }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstructions}\n\nUser Question: ${message}\n\nRespond ONLY with valid JSON.` }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`LLM API failed with status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) throw new Error('Empty response from AI LLM');

    const cleanJson = candidate.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson);
  }

  /**
   * Deterministic Knowledge Synthesis Engine
   */
  static _synthesizeFromKnowledgeGraph({ education, knowledgeContext, userGoal, status }) {
    const { studyOptions, careerFields, jobs, skills, certifications, counts } = knowledgeContext;

    const topJobs = jobs.slice(0, 10).map((j, idx) => ({
      title: j.title,
      family: j.jobFamily || 'General',
      relationshipType: idx === 0 ? 'DIRECT' : (j.relatedEducation?.[0]?.relationshipType || 'POSSIBLE_WITH_SKILLS'),
      entrySalary: j.salaryRange?.formatted || '₹4.5 - ₹8 LPA',
      keyTools: j.tools?.slice(0, 4) || ['Domain Fundamentals', 'Industry Tools'],
      whyFit: `Strong synergy with your ${education.name} background and analytical core.`
    }));

    const mappedStudy = studyOptions.slice(0, 8).map((s) => ({
      name: s.studyProgram?.name || 'Higher Studies Program',
      level: s.studyProgram?.degreeLevel || 'Postgraduate',
      relationshipType: s.relationshipType || 'DIRECT',
      rationale: s.rationale || `Natural academic advancement pathway following ${education.name}.`,
      eligibilityNote: s.eligibilityCriteria?.minimumMarksPercentage
        ? `Min ${s.eligibilityCriteria.minimumMarksPercentage}% in ${education.name}`
        : 'Subject to standard university entrance criteria'
    }));

    const mappedSkills = skills.slice(0, 15).map((sk, i) => ({
      name: sk.name,
      category: sk.category || 'Technical',
      demandLevel: sk.demandLevel || 'High',
      alreadyCoveredInEducation: i < 3
    }));

    const skillGaps = skills.slice(0, 8).map((sk, i) => ({
      skill: sk.name,
      status: i < 2 ? 'Already Learned in Degree' : (i < 5 ? 'High Priority to Acquire' : 'Secondary Skill'),
      actionRecommendation:
        i < 2
          ? `Consolidate into portfolio projects demonstrating practical capability.`
          : `Dedicate 2-3 weeks to hands-on exercises and real-world case studies.`
    }));

    const nextActions = [
      {
        step: 1,
        title: `Audit Core Competencies in ${education.name}`,
        description: `Review your existing subject foundation and list high-confidence areas versus practical blindspots.`,
        timeframe: 'Day 1 - 3'
      },
      {
        step: 2,
        title: topJobs[0] ? `Target ${topJobs[0].title} as Primary Objective` : 'Select Primary Career Track',
        description: `Explore day-to-day responsibilities, industry tools (${topJobs[0]?.keyTools?.join(', ') || 'essential software'}), and real job postings.`,
        timeframe: 'Week 1'
      },
      {
        step: 3,
        title: 'Bridge High-Priority Skill Gaps',
        description: `Start hands-on projects focusing on: ${skills.slice(2, 5).map((s) => s.name).join(', ') || 'industry technical skills'}.`,
        timeframe: 'Month 1 - 2'
      },
      {
        step: 4,
        title: 'Construct Tailored Portfolio & Career Passport',
        description: `Deploy 2 end-to-end projects demonstrating end-to-end domain problem solving before applying.`,
        timeframe: 'Month 3'
      }
    ];

    const careerPaths = [
      {
        pathTitle: topJobs[0] ? `${topJobs[0].title} Fast-Track` : `${education.name} Direct Professional Track`,
        stages: [
          education.name,
          'Core Skill Mastery',
          '2 Industry Capstone Projects',
          'Resume & Interview Readiness',
          topJobs[0]?.title || 'Entry Specialist'
        ],
        estimatedTimeToReach: '3 to 6 months',
        difficulty: 'Moderate'
      },
      {
        pathTitle: mappedStudy[0] ? `${mappedStudy[0].name} Academic Pathway` : 'Specialized Postgraduate Specialization',
        stages: [
          education.name,
          'Entrance Exam Prep',
          mappedStudy[0]?.name || 'Masters Program',
          'Specialized Research/Internship',
          'Senior Domain Specialist'
        ],
        estimatedTimeToReach: '2 Years',
        difficulty: 'Structured Academic'
      }
    ];

    return {
      currentEducation: {
        name: education.name,
        level: education.level,
        stream: education.stream,
        description: education.description
      },
      summary: `Your ${education.name} background provides a robust foundation. Through verified pathways, you have ${counts.jobRoles} directly connected or transitionable job roles across ${counts.careerFields} expanding career fields, alongside ${counts.studyPathways} higher study options.`,
      counts,
      studyOptions: mappedStudy,
      careerFields: careerFields.slice(0, 6).map((cf) => ({
        name: cf.name,
        demandScore: cf.highDemandScore || 85,
        growthOutlook: cf.growthOutlook || 'High Growth',
        description: cf.description || 'Active market sector with steady recruitment.'
      })),
      jobOptions: topJobs,
      skills: mappedSkills,
      certifications: certifications.slice(0, 6).map((c) => ({
        title: c.title,
        issuer: c.issuer,
        costTier: c.costTier || 'Moderate',
        relevance: `Validates verified domain proficiency to recruiters.`
      })),
      eligibility: studyOptions.slice(0, 5).map((s) => ({
        target: s.studyProgram?.name || 'Higher Program',
        minimumCriteria: s.eligibilityCriteria?.minimumMarksPercentage
          ? `Minimum ${s.eligibilityCriteria.minimumMarksPercentage}% marks required in ${education.name}`
          : 'Graduation/completion with pass grade',
        licensingNotice:
          s.relationshipType === 'LICENSE_REQUIRED'
            ? 'Requires statutory board accreditation and state licensing exam.'
            : 'Standard professional eligibility.'
      })),
      careerPaths,
      skillGaps,
      nextActions
    };
  }

  static async _callExternalAI(userPrompt) {
    const apiKey = ENV.AI_API_KEY;
    const model = ENV.AI_MODEL || 'gemini-1.5-flash';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${CAREER_COMPASS_SYSTEM_PROMPT}\n\n${userPrompt}\n\nRespond ONLY with valid JSON.` }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`AI API failed with status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) throw new Error('Empty response from AI service');

    const cleanJson = candidate.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson);
  }
}

export default AIService;
