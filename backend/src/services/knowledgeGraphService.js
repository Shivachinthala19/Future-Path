import { Education } from '../models/Education.js';
import { StudyProgram } from '../models/StudyProgram.js';
import { StudyPathway } from '../models/StudyPathway.js';
import { CareerField } from '../models/CareerField.js';
import { Career } from '../models/Career.js';
import { JobRole } from '../models/JobRole.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { EligibilityRule } from '../models/EligibilityRule.js';

export class KnowledgeGraphService {
  /**
   * Identifies education record matching user query
   */
  static async identifyEducation(queryText) {
    if (!queryText || typeof queryText !== 'string') return null;
    const cleanQuery = queryText.trim();
    const safeRegex = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 1. Direct case-insensitive exact name or slug match
    let education = null;
    try {
      education = await Education.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${safeRegex}$`, 'i') } },
          { slug: cleanQuery.toLowerCase().replace(/[^a-z0-9]/g, '-') },
          { aliases: { $in: [new RegExp(`^${safeRegex}$`, 'i')] } }
        ]
      });

      if (education) return education;

      // 2. Partial regex match against aliases or name
      education = await Education.findOne({
        $or: [
          { name: { $regex: safeRegex, $options: 'i' } },
          { aliases: { $regex: safeRegex, $options: 'i' } },
          { branch: { $regex: safeRegex, $options: 'i' } },
          { specialization: { $regex: safeRegex, $options: 'i' } }
        ]
      });

      if (education) return education;

      // 3. Text search match
      const textMatches = await Education.find(
        { $text: { $search: cleanQuery } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } }).limit(1);

      if (textMatches && textMatches.length > 0) {
        return textMatches[0];
      }

      // 4. Tokenized keyword search
      const words = cleanQuery.split(/[\s,.-]+/).filter(w => w.length > 2);
      if (words.length > 0) {
        education = await Education.findOne({
          $or: words.map(w => ({ name: { $regex: w, $options: 'i' } }))
        });
      }

      if (education) return education;
    } catch (_) {
      // MongoDB offline or empty, proceed to dynamic synthesis & Supabase
    }

    // 5. Intelligent dynamic synthesis for ANY study entered (Section 1)
    const lower = cleanQuery.toLowerCase();
    let level = 'Undergraduate';
    let qualification = 'Bachelor Degree';
    let stream = 'General';

    if (lower.includes('10th') || lower.includes('ssc') || lower.includes('matric')) {
      level = 'School (10th)';
      qualification = 'Secondary School Certificate';
      stream = 'General';
    } else if (lower.includes('12th') || lower.includes('intermediate') || lower.includes('hsc')) {
      level = 'Higher Secondary (12th)';
      qualification = 'Senior School Certificate';
      if (lower.includes('science')) stream = 'Science';
      else if (lower.includes('commerce')) stream = 'Commerce';
      else if (lower.includes('arts') || lower.includes('humanities')) stream = 'Arts & Humanities';
    } else if (lower.includes('diploma') || lower.includes('polytechnic')) {
      level = 'Diploma';
      qualification = 'Polytechnic Diploma';
      stream = 'Engineering';
    } else if (lower.includes('iti') || lower.includes('vocational') || lower.includes('trade')) {
      level = 'Vocational / ITI';
      qualification = 'National Trade Certificate (NTC)';
      stream = 'Vocational';
    } else if (lower.includes('m.') || lower.includes('master') || lower.includes('msc') || lower.includes('mcom') || lower.includes('mba') || lower.includes('mtech') || lower.includes('mca')) {
      level = 'Postgraduate';
      qualification = 'Master Degree';
      if (lower.includes('tech') || lower.includes('mca')) stream = 'Computer Science / Engineering';
      else if (lower.includes('com') || lower.includes('mba')) stream = 'Commerce & Management';
      else if (lower.includes('sc')) stream = 'Science';
    } else if (lower.includes('phd') || lower.includes('doctorate')) {
      level = 'Doctorate / PhD';
      qualification = 'Doctorate Degree';
      stream = 'Research';
    } else if (lower.includes('mbbs') || lower.includes('doctor') || lower.includes('medical')) {
      level = 'Professional Degree';
      qualification = 'Medical Degree';
      stream = 'Medical';
    } else if (lower.includes('ca') || lower.includes('cma') || lower.includes('cs')) {
      level = 'Professional Degree';
      qualification = 'Statutory Professional Qualification';
      stream = 'Commerce';
    } else if (lower.includes('llb') || lower.includes('law')) {
      level = 'Professional Degree';
      qualification = 'Law Degree';
      stream = 'Law';
    } else if (lower.includes('b.tech') || lower.includes('btech') || lower.includes('b.e') || lower.includes('engineering')) {
      level = 'Undergraduate';
      qualification = 'Bachelor of Technology';
      stream = 'Engineering';
    } else if (lower.includes('b.com') || lower.includes('commerce') || lower.includes('bba')) {
      level = 'Undergraduate';
      qualification = 'Bachelor of Commerce';
      stream = 'Commerce';
    } else if (lower.includes('b.sc') || lower.includes('bsc') || lower.includes('bca')) {
      level = 'Undergraduate';
      qualification = 'Bachelor of Science';
      stream = 'Science & Computing';
    }

    // Try finding closest existing education in DB to borrow associations
    const closest = await Education.findOne({
      $or: [
        { stream: stream },
        { level: level }
      ]
    });

    if (closest) {
      return {
        ...closest.toObject(),
        _id: closest._id,
        name: cleanQuery,
        slug: cleanQuery.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        level,
        qualification,
        stream
      };
    }

    return {
      _id: 'dynamic-edu',
      name: cleanQuery,
      slug: cleanQuery.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      level,
      qualification,
      stream,
      typicalSubjects: ['Core Domain Foundations', 'Applied Practicum', 'Professional Standards']
    };
  }

  /**
   * Retrieves all connected education, study options, careers, jobs, skills, certifications & counts
   */
  static async getConnectedKnowledgeGraph(educationId) {
    const education = await Education.findById(educationId);
    if (!education) return null;

    // 1. Fetch direct and related Study Pathways
    const studyPathways = await StudyPathway.find({ fromEducation: education._id })
      .populate('toStudy')
      .lean();

    const studyOptions = studyPathways.map(sp => ({
      pathwayId: sp._id,
      studyProgram: sp.toStudy,
      relationshipType: sp.relationshipType,
      eligibilityCriteria: sp.eligibilityCriteria,
      rationale: sp.rationale,
      verificationStatus: sp.verificationStatus
    })).filter(item => item.studyProgram);

    // 2. Fetch Careers directly or indirectly connected
    const careers = await Career.find({
      'relatedEducation.education': education._id
    })
      .populate('careerField')
      .populate('skills')
      .populate('certifications')
      .lean();

    // 3. Fetch Job Roles connected to this education or its careers
    const careerIds = careers.map(c => c._id);
    const jobs = await JobRole.find({
      $or: [
        { 'relatedEducation.education': education._id },
        { career: { $in: careerIds } }
      ]
    })
      .populate('careerField')
      .populate('requiredSkills')
      .populate('preferredSkills')
      .populate('certifications')
      .lean();

    // 4. Aggregate unique Career Fields
    const fieldMap = new Map();
    careers.forEach(c => {
      if (c.careerField && c.careerField._id) {
        fieldMap.set(c.careerField._id.toString(), c.careerField);
      }
    });
    jobs.forEach(j => {
      if (j.careerField && j.careerField._id) {
        fieldMap.set(j.careerField._id.toString(), j.careerField);
      }
    });
    const careerFields = Array.from(fieldMap.values());

    // 5. Aggregate unique Skills
    const skillMap = new Map();
    careers.forEach(c => {
      (c.skills || []).forEach(s => {
        if (s && s._id) skillMap.set(s._id.toString(), s);
      });
    });
    jobs.forEach(j => {
      (j.requiredSkills || []).forEach(s => {
        if (s && s._id) skillMap.set(s._id.toString(), s);
      });
      (j.preferredSkills || []).forEach(s => {
        if (s && s._id) skillMap.set(s._id.toString(), s);
      });
    });
    const skills = Array.from(skillMap.values());

    // 6. Aggregate unique Certifications
    const certMap = new Map();
    careers.forEach(c => {
      (c.certifications || []).forEach(cert => {
        if (cert && cert._id) certMap.set(cert._id.toString(), cert);
      });
    });
    jobs.forEach(j => {
      (j.certifications || []).forEach(cert => {
        if (cert && cert._id) certMap.set(cert._id.toString(), cert);
      });
    });
    const certifications = Array.from(certMap.values());

    // 7. Fetch Eligibility Rules
    const eligibilityRules = await EligibilityRule.find({ education: education._id }).lean();

    // 8. Dynamic pathway counts (NEVER HARDCODED)
    const counts = {
      studyPathways: studyOptions.length,
      careerFields: careerFields.length,
      jobRoles: jobs.length,
      skills: skills.length,
      certifications: certifications.length
    };

    return {
      education,
      studyOptions,
      careerFields,
      careers,
      jobs,
      skills,
      certifications,
      eligibilityRules,
      counts
    };
  }
}
