import { JobRole } from '../models/JobRole.js';
import { Career } from '../models/Career.js';
import { Skill } from '../models/Skill.js';
import { Roadmap } from '../models/Roadmap.js';
import { DailyMission } from '../models/DailyMission.js';

export class RecommendationEngine {
  /**
   * Compares current user skills against target job/career required skills
   */
  static async computeSkillGap({ targetRoleOrCareer, currentSkills = [], education = '' }) {
    // 1. Try finding matching JobRole
    let role = await JobRole.findOne({
      $or: [
        { title: { $regex: new RegExp(`^${targetRoleOrCareer}$`, 'i') } },
        { title: { $regex: targetRoleOrCareer, $options: 'i' } }
      ]
    }).populate('requiredSkills').populate('preferredSkills');

    // 2. If not found as JobRole, try Career
    let career = null;
    if (!role) {
      career = await Career.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${targetRoleOrCareer}$`, 'i') } },
          { name: { $regex: targetRoleOrCareer, $options: 'i' } }
        ]
      }).populate('skills');
    }

    // Collect all expected skills
    let targetSkills = [];
    if (role) {
      targetSkills = [
        ...(role.requiredSkills || []).map(s => ({ name: s.name, category: s.category, priority: 'Required' })),
        ...(role.preferredSkills || []).map(s => ({ name: s.name, category: s.category, priority: 'Preferred' }))
      ];
    } else if (career) {
      targetSkills = (career.skills || []).map(s => ({ name: s.name, category: s.category, priority: 'Required' }));
    }

    // If still empty, fetch standard skills matching the domain
    if (targetSkills.length === 0) {
      const fallbackSkills = await Skill.find().limit(6).lean();
      targetSkills = fallbackSkills.map(s => ({ name: s.name, category: s.category, priority: 'Required' }));
    }

    const normalizedCurrent = currentSkills.map(s => s.trim().toLowerCase());

    const alreadyHave = [];
    const needToDevelop = [];

    targetSkills.forEach(skillObj => {
      const match = normalizedCurrent.some(cs => cs === skillObj.name.toLowerCase() || skillObj.name.toLowerCase().includes(cs));
      if (match) {
        alreadyHave.push(skillObj);
      } else {
        needToDevelop.push(skillObj);
      }
    });

    const total = targetSkills.length || 1;
    const matchPercentage = Math.round((alreadyHave.length / total) * 100);

    return {
      target: role ? role.title : (career ? career.name : targetRoleOrCareer),
      matchPercentage,
      totalTargetSkillsCount: total,
      alreadyHaveCount: alreadyHave.length,
      needToDevelopCount: needToDevelop.length,
      alreadyHave,
      needToDevelop,
      suggestedFirstFocus: needToDevelop.length > 0 ? needToDevelop[0].name : 'Polish Portfolio & Interview Prep'
    };
  }

  /**
   * Generates a step-by-step 3-12 month roadmap
   */
  static async generateRoadmap({ userId, startingEducation, targetCareer, targetJobRole, durationMonths = 6 }) {
    const roleTitle = targetJobRole || targetCareer;

    // Retrieve skills for this target
    const gap = await this.computeSkillGap({ targetRoleOrCareer: roleTitle, currentSkills: [] });
    const skillsToLearn = gap.needToDevelop.map(s => s.name);

    const phases = [
      { phaseNumber: 1, title: 'Core Foundations', focus: 'Master fundamental domain concepts and core primary tools.' },
      { phaseNumber: 2, title: 'Tool Proficiency & Mini-Labs', focus: 'Hands-on practice, syntax fluency, and practical problem solving.' },
      { phaseNumber: 3, title: 'Capstone Project 1', focus: 'Build a production-grade or real-world case study project.' },
      { phaseNumber: 4, title: 'Advanced Topics & Capstone 2', focus: 'Implement complex workflows and optimize architecture/analysis.' },
      { phaseNumber: 5, title: 'Resume & Portfolio Construction', focus: 'ATS resume alignment, GitHub/Portfolio showcase, LinkedIn optimization.' },
      { phaseNumber: 6, title: 'Interview Drills & Targeted Applications', focus: 'Domain technical mock interviews, behavioral prep, and direct job outreach.' },
    ];

    const activePhases = phases.slice(0, Math.min(durationMonths, 6));

    const tasks = [];
    activePhases.forEach((phase, index) => {
      const monthNum = index + 1;
      const primarySkill = skillsToLearn[index] || 'Domain Problem Solving';
      const secondarySkill = skillsToLearn[index + 1] || 'Industry Tool Proficiency';

      tasks.push({
        title: `Month ${monthNum} Focus: ${phase.title}`,
        description: `Dedicate 10-15 hours weekly to ${phase.focus} Target skill: ${primarySkill}.`,
        phaseNumber: phase.phaseNumber,
        phaseTitle: phase.title,
        month: monthNum,
        order: monthNum,
        estimatedHours: 40,
        skills: [primarySkill, secondarySkill],
        resources: [
          { title: `${primarySkill} Structured Reference & Interactive Practice`, url: 'https://roadmap.sh', type: 'guide' },
          { title: `Official Documentation & Exercises`, url: 'https://developer.mozilla.org', type: 'documentation' }
        ],
        completed: monthNum === 1 // Start first task as partially active or ready
      });
    });

    const roadmapDoc = new Roadmap({
      user: userId || null,
      title: `${startingEducation} → ${roleTitle} Career Mastery Roadmap`,
      targetCareer,
      targetJobRole: roleTitle,
      startingEducation,
      durationMonths,
      overallProgressPercentage: 15,
      phases: activePhases,
      tasks,
      isAiGenerated: true,
    });

    if (userId) {
      await roadmapDoc.save();
    }

    return roadmapDoc;
  }

  /**
   * Generates or fetches daily missions for consistency
   */
  static async getDailyMissions(userId) {
    const today = new Date().toISOString().split('T')[0];

    let missions = [];
    if (userId) {
      missions = await DailyMission.find({ user: userId, date: today });
    }

    if (missions.length === 0) {
      missions = [
        {
          title: 'Daily Micro-Skill: Practice Essential Syntax & Functions',
          description: 'Spend 35 minutes completing 3 practical exercises or writing query snippets in your core tool.',
          category: 'Skill Practice',
          estimatedMinutes: 35,
          points: 50,
          completed: false,
          date: today,
        },
        {
          title: 'Review 1 Real-World Case Study / Architecture',
          description: 'Read an industry technical post or real-world project repository to understand best practices.',
          category: 'Concept Mastery',
          estimatedMinutes: 25,
          points: 30,
          completed: false,
          date: today,
        },
        {
          title: 'Mock Interview Flashcards: Answer 2 Common Questions Out Loud',
          description: 'Practice the STAR method on one behavioral and one technical fundamental question.',
          category: 'Interview Prep',
          estimatedMinutes: 20,
          points: 25,
          completed: false,
          date: today,
        }
      ];

      if (userId) {
        missions = await DailyMission.insertMany(missions.map(m => ({ ...m, user: userId })));
      }
    }

    return missions;
  }
}
