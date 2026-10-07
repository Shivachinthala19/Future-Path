import mongoose from 'mongoose';

const studySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    shortName: {
      type: String,
      trim: true
    },
    aliases: [{
      type: String,
      trim: true
    }],
    type: {
      type: String,
      default: 'STUDY'
    },
    educationLevel: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    field: {
      type: String
    },
    description: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: ''
    },
    eligibility: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({})
    },
    admissionRequirements: [{
      type: String
    }],
    entranceExams: [{
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
    relatedStudies: [{
      type: String
    }],
    higherStudies: [{
      type: mongoose.Schema.Types.Mixed
    }],
    careerFields: [{
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
    sources: [
      {
        title: { type: String },
        name: { type: String },
        url: { type: String },
        type: { type: String, default: 'OFFICIAL' },
        sourceType: { type: String, default: 'OFFICIAL' },
        organization: { type: String },
        lastVerified: { type: String }
      }
    ],
    officialSources: [
      {
        title: { type: String },
        url: { type: String },
        sourceType: { type: String, default: 'OFFICIAL' },
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
    notificationUrl: {
      type: String,
      default: ''
    },
    officialSource: {
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
    }
  },
  { timestamps: true }
);

studySchema.index({
  name: 'text',
  aliases: 'text',
  category: 'text',
  description: 'text',
  shortName: 'text',
  skills: 'text'
});

studySchema.index({ type: 1, category: 1 });
studySchema.index({ educationLevel: 1 });
studySchema.index({ aliases: 1 });

export const Study = mongoose.models.Study || mongoose.model('Study', studySchema);
export default Study;
