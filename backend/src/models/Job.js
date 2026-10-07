import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      trim: true
    },
    aliases: [{
      type: String,
      trim: true
    }],
    type: {
      type: String,
      default: 'JOB',
      enum: ['JOB', 'GOVERNMENT_JOB', 'PRIVATE_JOB', 'INTERNSHIP', 'APPRENTICESHIP', 'CAREER'],
      index: true
    },
    description: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    },
    jobFamily: {
      type: String,
      index: true
    },
    sector: {
      type: String,
      index: true
    },
    category: {
      type: String,
      default: 'Private',
      index: true
    },
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
    acceptedQualifications: [{
      type: String
    }],
    educationRequirements: [{
      type: String
    }],
    acceptedFields: [{
      type: String
    }],
    requiredSkills: [{
      type: String
    }],
    preferredSkills: [{
      type: String
    }],
    skills: [{
      type: String
    }],
    certifications: [{
      type: String
    }],
    licenses: [{
      type: String
    }],
    exams: [{
      type: String
    }],
    requiredExperience: {
      entryLevel: { type: Boolean, default: true },
      level: { type: String, default: 'Entry Level' },
      minYears: { type: Number, default: 0 },
      maxYears: { type: Number, default: 2 }
    },
    experience: {
      entryLevel: { type: Boolean, default: true },
      level: { type: String, default: 'Entry Level' },
      minYears: { type: Number, default: 0 },
      maxYears: { type: Number, default: 2 }
    },
    additionalRequirements: [{
      type: String
    }],
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
    careerProgression: [{
      type: String
    }],
    careerGrowth: [{
      type: String
    }],
    higherStudies: [{
      type: mongoose.Schema.Types.Mixed
    }],
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
      default: 'Please refer to official advertisement'
    },
    posts: [{
      type: String
    }],
    officialSource: {
      type: String,
      default: ''
    },
    notificationUrl: {
      type: String,
      default: ''
    },
    sources: [
      {
        title: { type: String },
        name: { type: String },
        url: { type: String },
        type: { type: String, default: 'OFFICIAL' },
        sourceType: {
          type: String,
          enum: ['OFFICIAL', 'UNIVERSITY', 'GOVERNMENT', 'RECRUITMENT', 'PROFESSIONAL_BODY', 'REFERENCE', 'SEARCH'],
          default: 'OFFICIAL'
        },
        organization: { type: String },
        lastVerified: { type: String }
      }
    ],
    lastVerified: {
      type: String,
      default: 'September 2026'
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED'
    },
    relationshipTypes: [{
      type: String,
      enum: [
        'DIRECT',
        'RELATED',
        'ADDITIONAL_SKILLS',
        'ADDITIONAL_QUALIFICATION',
        'LICENSE_REQUIRED',
        'EXPERIENCE_REQUIRED',
        'EXAM_REQUIRED',
        'VERIFICATION_REQUIRED'
      ]
    }]
  },
  { timestamps: true }
);

jobSchema.pre('validate', function(next) {
  if (!this.title && this.name) {
    this.title = this.name;
  }
  if (!this.name && this.title) {
    this.name = this.title;
  }
  next();
});

jobSchema.index({
  title: 'text',
  name: 'text',
  aliases: 'text',
  category: 'text',
  description: 'text',
  requiredSkills: 'text',
  preferredSkills: 'text'
});

jobSchema.index({ type: 1, sector: 1, jobFamily: 1 });

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default Job;
