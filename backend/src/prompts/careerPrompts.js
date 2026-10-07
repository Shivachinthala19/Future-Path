export const CAREER_COMPASS_SYSTEM_PROMPT = `
You are Future Path, an intelligent, objective, and empowering education and career navigation engine.

CORE DIRECTIVES:
1. Analyze the user's current education using ONLY the structured knowledge graph supplied by the server.
2. DO NOT invent eligibility requirements, courses, jobs, certifications, universities, or official regulatory requirements.
3. Clearly categorize all pathways with explicit relationship types:
   - DIRECT (naturally accessible with this qualification)
   - POSSIBLE_WITH_SKILLS (accessible by acquiring specific practical skills)
   - POSSIBLE_WITH_QUALIFICATION (requires completing a bridge course, diploma, or higher degree)
   - LICENSE_REQUIRED (requires clearing statutory bar exams, medical councils, or government licensing)
   - EXPERIENCE_REQUIRED (requires prior domain track record or internships)
4. DO NOT promise or guarantee employment.
5. DO NOT claim to "predict" the user's future. Instead, empower the user with structured, verified pathways.
6. Provide pragmatic, actionable next steps: learning order, project milestones, resume advice, and interview prep.
7. Return strictly valid JSON conforming exactly to the requested output structure.
`;

export const buildAnalysisPrompt = ({ education, knowledgeContext, userGoal, status, country }) => {
  return `
USER CONTEXT:
- Studied: ${education.name} (${education.level}, Stream: ${education.stream})
- Status: ${status || 'Completed'}
- Country/Region: ${country || 'India'}
- User Specified Goal: ${userGoal || 'Open to all viable pathways'}

STRUCTURED KNOWLEDGE GRAPH CONTEXT (From Verified Database):
- Connected Study Options (${knowledgeContext.studyOptions.length} records):
${JSON.stringify(knowledgeContext.studyOptions.map(s => ({
  name: s.studyProgram?.name,
  degreeLevel: s.studyProgram?.degreeLevel,
  relationship: s.relationshipType,
  eligibility: s.eligibilityCriteria,
  rationale: s.rationale
})), null, 2)}

- Connected Career Fields (${knowledgeContext.careerFields.length} records):
${JSON.stringify(knowledgeContext.careerFields.map(cf => ({
  name: cf.name,
  growthOutlook: cf.growthOutlook,
  demandScore: cf.highDemandScore
})), null, 2)}

- Connected Job Roles (${knowledgeContext.jobs.length} records):
${JSON.stringify(knowledgeContext.jobs.map(j => ({
  title: j.title,
  jobFamily: j.jobFamily,
  experienceLevel: j.experienceLevel,
  salary: j.salaryRange?.formatted,
  tools: j.tools
})), null, 2)}

- Key Required & Preferred Skills (${knowledgeContext.skills.length} records):
${JSON.stringify(knowledgeContext.skills.map(sk => ({
  name: sk.name,
  category: sk.category,
  demandLevel: sk.demandLevel
})), null, 2)}

- Industry Certifications (${knowledgeContext.certifications.length} records):
${JSON.stringify(knowledgeContext.certifications.map(c => ({
  title: c.title,
  issuer: c.issuer,
  costTier: c.costTier
})), null, 2)}

TASK:
Produce an in-depth, structured Future Path personalization in JSON format.
Ensure you return an object with:
{
  "currentEducation": {
    "name": "${education.name}",
    "level": "${education.level}",
    "stream": "${education.stream}",
    "description": "${education.description}"
  },
  "summary": "Clear, encouraging 2-3 sentence overview of where this qualification stands and the primary doors it unlocks.",
  "counts": {
    "studyPathways": ${knowledgeContext.counts.studyPathways},
    "careerFields": ${knowledgeContext.counts.careerFields},
    "jobRoles": ${knowledgeContext.counts.jobRoles},
    "skills": ${knowledgeContext.counts.skills},
    "certifications": ${knowledgeContext.counts.certifications}
  },
  "studyOptions": [
    {
      "name": "Study program name",
      "level": "Degree level",
      "relationshipType": "DIRECT | POSSIBLE_WITH_SKILLS | POSSIBLE_WITH_QUALIFICATION | LICENSE_REQUIRED | EXPERIENCE_REQUIRED",
      "rationale": "Why this is a natural next step and what it leads to",
      "eligibilityNote": "Eligibility summary"
    }
  ],
  "careerFields": [
    {
      "name": "Field name",
      "demandScore": 85,
      "growthOutlook": "Growth rate summary",
      "description": "Short description"
    }
  ],
  "jobOptions": [
    {
      "title": "Job title",
      "family": "Job family",
      "relationshipType": "DIRECT | POSSIBLE_WITH_SKILLS | POSSIBLE_WITH_QUALIFICATION | LICENSE_REQUIRED",
      "entrySalary": "Salary string",
      "keyTools": ["Tool1", "Tool2"],
      "whyFit": "Why this matches this education"
    }
  ],
  "skills": [
    {
      "name": "Skill name",
      "category": "Technical | Domain Knowledge | Analytical | Tool / Software | Soft Skill / Behavioral",
      "demandLevel": "High | Crucial",
      "alreadyCoveredInEducation": true/false
    }
  ],
  "certifications": [
    {
      "title": "Cert name",
      "issuer": "Issuer",
      "costTier": "Tier",
      "relevance": "Why this certification gives a competitive edge"
    }
  ],
  "eligibility": [
    {
      "target": "Target study or career",
      "minimumCriteria": "Minimum qualification and percentage needed",
      "licensingNotice": "Any statutory licensing or bar council requirement, or none"
    }
  ],
  "careerPaths": [
    {
      "pathTitle": "e.g. Corporate Finance Specialist or Cloud Engineer",
      "stages": ["Step 1", "Step 2", "Step 3", "Step 4", "Target Role"],
      "estimatedTimeToReach": "3 to 6 months",
      "difficulty": "Moderate"
    }
  ],
  "skillGaps": [
    {
      "skill": "Skill name",
      "status": "Already Learned in Degree | High Priority to Acquire | Secondary Skill",
      "actionRecommendation": "Recommended next action to acquire"
    }
  ],
  "nextActions": [
    {
      "step": 1,
      "title": "Action title",
      "description": "Concrete action description",
      "timeframe": "Week 1-2"
    }
  ]
}
`;
};
