import mongoose from 'mongoose';

export const EDUCATION_CATEGORIES = [
  'School',
  '10th / SSC',
  '11th / 12th',
  'Diploma',
  'Polytechnic',
  'ITI',
  'Undergraduate',
  'Postgraduate',
  'Professional Qualification',
  'Medical',
  'Paramedical',
  'Engineering',
  'Computer Science',
  'Information Technology',
  'Science',
  'Commerce',
  'Arts & Humanities',
  'Management',
  'Law',
  'Agriculture',
  'Architecture',
  'Design',
  'Media & Journalism',
  'Education & Teaching',
  'Nursing',
  'Pharmacy',
  'Veterinary',
  'Hospitality & Tourism',
  'Aviation',
  'Maritime',
  'Defence',
  'Sports',
  'Vocational',
  'Certification',
  'Research & Doctoral',
  'Online & Continuing Education'
];

export const ENTITY_TYPES = [
  'STUDY',
  'JOB',
  'CAREER',
  'EXAM',
  'CERTIFICATION',
  'SKILL',
  'GOVERNMENT_JOB',
  'PRIVATE_JOB',
  'INTERNSHIP',
  'APPRENTICESHIP'
];

const entitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    shortName: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ENTITY_TYPES,
      index: true
    },
    educationLevel: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    },
    aliases: [{
      type: String,
      trim: true
    }],
    duration: {
      type: String,
      default: ''
    },
    educationRequirements: [{
      type: String
    }],
    educationRoutes: [
      {
        routeName: { type: String },
        title: { type: String },
        type: { type: String, default: 'Direct Route' },
        degrees: [{ type: String }],
        skills: [{ type: String }],
        timeline: { type: String },
        description: { type: String },
        steps: [{ type: String }],
        prerequisites: [{ type: String }]
      }
    ],
    eligibility: {
      qualification: { type: String },
      streams: [{ type: String }],
      minimumRequirements: [{ type: String }],
      ageLimit: { type: String },
      aggregatePercentage: { type: Number },
      details: { type: String }
    },
    admissionRequirements: [{
      type: String
    }],
    subjects: [{
      type: String
    }],
    specializations: [{
      type: String
    }],
    skills: [{
      type: String
    }],
    requiredSkills: [{
      type: String
    }],
    preferredSkills: [{
      type: String
    }],
    certifications: [{
      type: String
    }],
    entranceExams: [{
      type: String
    }],
    careerPaths: [{
      type: String
    }],
    careerFields: [{
      type: String
    }],
    careerGrowth: [{
      type: String
    }],
    higherStudies: [{
      type: mongoose.Schema.Types.Mixed
    }],
    relatedStudies: [{
      type: String
    }],
    relatedJobs: [{
      type: String
    }],
    jobRoles: [{
      type: String
    }],
    seniorRoles: [{
      type: String
    }],
    experience: {
      entryLevel: { type: Boolean, default: true },
      level: { type: String, default: 'Entry Level' },
      minYears: { type: Number, default: 0 },
      maxYears: { type: Number, default: 2 }
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'INR' },
      formatted: { type: String }
    },
    roadmap: [
      {
        step: { type: Number },
        title: { type: String },
        type: { type: String, default: 'LEARNING' },
        description: { type: String },
        whatToLearn: { type: String },
        whyItMatters: { type: String },
        resources: [{ type: String }]
      }
    ],
    projects: [
      {
        name: { type: String },
        tech: { type: String },
        desc: { type: String },
        difficulty: { type: String, default: 'Intermediate' }
      }
    ],
    interviewPreparation: [
      {
        category: { type: String, default: 'Technical' },
        question: { type: String },
        answerGuidance: { type: String }
      }
    ],
    howToApply: {
      type: String,
      default: ''
    },
    organization: {
      type: String,
      default: ''
    },
    qualification: {
      type: String,
      default: ''
    },
    ageLimit: {
      type: String,
      default: 'Please refer to current official notification'
    },
    exams: [{
      type: String
    }],
    posts: [{
      type: String
    }],
    officialSource: {
      type: String,
      default: ''
    },
    officialSources: [
      {
        title: { type: String },
        url: { type: String },
        sourceType: {
          type: String,
          enum: ['OFFICIAL', 'UNIVERSITY', 'GOVERNMENT', 'RECRUITMENT', 'PROFESSIONAL_BODY', 'REFERENCE', 'SEARCH'],
          default: 'OFFICIAL'
        },
        lastVerified: { type: String }
      }
    ],
    referenceSources: [
      {
        title: { type: String },
        url: { type: String },
        sourceType: { type: String, default: 'REFERENCE' },
        lastVerified: { type: String }
      }
    ],
    sources: [
      {
        title: { type: String },
        url: { type: String },
        sourceType: {
          type: String,
          enum: ['OFFICIAL', 'UNIVERSITY', 'GOVERNMENT', 'RECRUITMENT', 'PROFESSIONAL_BODY', 'REFERENCE', 'SEARCH'],
          default: 'OFFICIAL'
        },
        lastVerified: { type: String }
      }
    ],
    notificationUrl: {
      type: String,
      default: ''
    },
    lastVerified: {
      type: String,
      default: 'September 2026'
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED'
    },
    isHighDemand: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Indexes for high-performance universal search
entitySchema.index({
  name: 'text',
  aliases: 'text',
  category: 'text',
  description: 'text',
  shortName: 'text',
  skills: 'text'
});

entitySchema.index({ type: 1, category: 1 });
entitySchema.index({ educationLevel: 1 });
entitySchema.index({ aliases: 1 });

export const Entity = mongoose.model('Entity', entitySchema);
