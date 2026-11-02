/**
 * Intent Classifier for Future Path AI Assistant
 * Classifies natural language inquiries into structured education & career intents.
 */

export const INTENTS = {
  STUDY_DISCOVERY: 'STUDY_DISCOVERY',
  STUDY_ELIGIBILITY: 'STUDY_ELIGIBILITY',
  COURSE_INFORMATION: 'COURSE_INFORMATION',
  CAREER_DISCOVERY: 'CAREER_DISCOVERY',
  JOB_DISCOVERY: 'JOB_DISCOVERY',
  JOB_ELIGIBILITY: 'JOB_ELIGIBILITY',
  SKILL_REQUIREMENTS: 'SKILL_REQUIREMENTS',
  SKILL_GAP: 'SKILL_GAP',
  ROADMAP: 'ROADMAP',
  EXAM_INFORMATION: 'EXAM_INFORMATION',
  GOVERNMENT_JOB: 'GOVERNMENT_JOB',
  CAREER_SWITCH: 'CAREER_SWITCH',
  HIGHER_STUDIES: 'HIGHER_STUDIES',
  COMPARISON: 'COMPARISON',
  LEARNING_GUIDANCE: 'LEARNING_GUIDANCE',
  RESUME_GUIDANCE: 'RESUME_GUIDANCE',
  INTERVIEW_GUIDANCE: 'INTERVIEW_GUIDANCE',
  GENERAL_EDUCATION: 'GENERAL_EDUCATION',
  GENERAL_CAREER: 'GENERAL_CAREER'
};

export function detectIntent(query = '') {
  const q = (query || '').toLowerCase().trim();

  if (!q) return INTENTS.GENERAL_CAREER;

  // 1. COMPARISON ("vs", "difference between", "better than", "compare")
  if (
    q.includes(' vs ') ||
    q.includes(' vs. ') ||
    q.includes('versus') ||
    q.includes('difference between') ||
    q.includes('which one is better') ||
    q.includes('compare ') ||
    (q.includes(' or ') && (q.includes('which') || q.includes('better') || q.includes('choose')))
  ) {
    return INTENTS.COMPARISON;
  }

  // 2. SKILL GAP ("what skills am i missing", "my skill gap", "missing skills", "skills i lack")
  if (
    q.includes('skill gap') ||
    q.includes('skills am i missing') ||
    q.includes('missing skills') ||
    q.includes('what skills do i lack') ||
    q.includes('skills i need to learn') ||
    (q.includes('missing') && q.includes('skill'))
  ) {
    return INTENTS.SKILL_GAP;
  }

  // 3. ROADMAP ("roadmap", "step by step", "how to become", "path to become", "how can i become")
  if (
    q.includes('roadmap') ||
    q.includes('step by step') ||
    q.includes('step-by-step') ||
    q.includes('how to become') ||
    q.includes('how can i become') ||
    q.includes('path to become') ||
    q.includes('journey to become') ||
    q.includes('complete guide to become')
  ) {
    return INTENTS.ROADMAP;
  }

  // 4. ELIGIBILITY (JOB vs STUDY)
  const isEligibility =
    q.includes('can i become') ||
    q.includes('can i do') ||
    q.includes('can i apply') ||
    q.includes('can i get') ||
    q.includes('am i eligible') ||
    q.includes('is it possible for me') ||
    q.includes('eligibility for') ||
    q.includes('eligible for') ||
    q.includes('requirements for') ||
    q.includes('criteria for');

  if (isEligibility) {
    const isJobRelated =
      q.includes('job') ||
      q.includes('analyst') ||
      q.includes('developer') ||
      q.includes('engineer') ||
      q.includes('officer') ||
      q.includes('manager') ||
      q.includes('role') ||
      q.includes('career') ||
      q.includes('work as');
    return isJobRelated ? INTENTS.JOB_ELIGIBILITY : INTENTS.STUDY_ELIGIBILITY;
  }

  // 5. GOVERNMENT JOBS & EXAMS ("government job", "govt job", "ssc", "upsc", "bank po", "rrb", "defence", "police")
  if (
    q.includes('government job') ||
    q.includes('govt job') ||
    q.includes('sarkari') ||
    q.includes('public sector') ||
    q.includes('psu job') ||
    q.includes('ssc cgl') ||
    q.includes('ssc chsl') ||
    q.includes('upsc') ||
    q.includes('civil services') ||
    q.includes('bank po') ||
    q.includes('ibps') ||
    q.includes('sbi po') ||
    q.includes('rbi grade b') ||
    q.includes('railway') ||
    q.includes('rrb ntpc') ||
    q.includes('defence') ||
    q.includes('police si')
  ) {
    if (q.includes('exam') || q.includes('pattern') || q.includes('syllabus') || q.includes('cutoff') || q.includes('age limit')) {
      return INTENTS.EXAM_INFORMATION;
    }
    return INTENTS.GOVERNMENT_JOB;
  }

  // 6. EXAM INFORMATION ("cat exam", "gate exam", "jee", "neet", "entrance exam", "exam pattern")
  if (
    q.includes('exam') ||
    q.includes('cat ') ||
    q.includes('gate ') ||
    q.includes('cuet') ||
    q.includes('entrance') ||
    q.includes('syllabus') ||
    q.includes('test required')
  ) {
    return INTENTS.EXAM_INFORMATION;
  }

  // 7. CAREER SWITCH / TRANSITION ("switch to tech", "non-it to it", "change field", "career transition")
  if (
    q.includes('switch') ||
    q.includes('transition') ||
    q.includes('change field') ||
    q.includes('non-it to it') ||
    q.includes('non tech to tech') ||
    q.includes('switch career')
  ) {
    return INTENTS.CAREER_SWITCH;
  }

  // 8. SKILL REQUIREMENTS ("what skills do i need", "skills required for", "tools required", "tech stack")
  if (
    (q.includes('skill') || q.includes('tool') || q.includes('technolog') || q.includes('language')) &&
    (q.includes('need') || q.includes('require') || q.includes('must have') || q.includes('essential'))
  ) {
    return INTENTS.SKILL_REQUIREMENTS;
  }

  // 9. LEARNING GUIDANCE ("what should i learn first", "what to learn next", "how to start learning")
  if (
    q.includes('what should i learn') ||
    q.includes('what to learn') ||
    q.includes('learn first') ||
    q.includes('learn next') ||
    q.includes('start learning') ||
    q.includes('where to start')
  ) {
    return INTENTS.LEARNING_GUIDANCE;
  }

  // 10. RESUME GUIDANCE ("resume", "portfolio", "ats", "cv")
  if (
    q.includes('resume') ||
    q.includes('portfolio') ||
    q.includes('ats ') ||
    q.includes('cv ') ||
    q.includes('github project')
  ) {
    return INTENTS.RESUME_GUIDANCE;
  }

  // 11. INTERVIEW GUIDANCE ("interview", "technical questions", "tell me about yourself")
  if (
    q.includes('interview') ||
    q.includes('mock test') ||
    q.includes('behavioral question') ||
    q.includes('tell me about yourself')
  ) {
    return INTENTS.INTERVIEW_GUIDANCE;
  }

  // 12. HIGHER STUDIES / STUDY DISCOVERY ("what can i study after", "higher studies", "courses after", "degrees after")
  if (
    q.includes('what can i study') ||
    q.includes('study after') ||
    q.includes('courses after') ||
    q.includes('degrees after') ||
    q.includes('programs after') ||
    q.includes('higher study') ||
    q.includes('higher studies') ||
    q.includes('master degree') ||
    q.includes('post graduation') ||
    q.includes('pg options')
  ) {
    return INTENTS.HIGHER_STUDIES;
  }

  // 13. COURSE INFORMATION ("what is mba", "what is b.tech", "tell me about bca", "details of")
  if (
    q.startsWith('what is ') ||
    q.startsWith('what are ') ||
    q.includes('tell me about ') ||
    q.includes('course details') ||
    q.includes('degree duration')
  ) {
    return INTENTS.COURSE_INFORMATION;
  }

  // 14. JOB DISCOVERY ("what jobs can i get", "jobs after", "career options after", "which jobs")
  if (
    q.includes('jobs can i get') ||
    q.includes('jobs after') ||
    q.includes('job options') ||
    q.includes('which jobs') ||
    q.includes('hiring for') ||
    q.includes('roles after')
  ) {
    return INTENTS.JOB_DISCOVERY;
  }

  // 15. CAREER DISCOVERY ("careers after", "suitable for my education", "which career")
  if (
    q.includes('career') ||
    q.includes('future path') ||
    q.includes('scope') ||
    q.includes('opportunities')
  ) {
    return INTENTS.CAREER_DISCOVERY;
  }

  return INTENTS.GENERAL_CAREER;
}
