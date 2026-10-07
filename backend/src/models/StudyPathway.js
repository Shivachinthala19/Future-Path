import mongoose from 'mongoose';

const studyPathwaySchema = new mongoose.Schema(
  {
    fromEducation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education',
      required: true,
      index: true,
    },
    toStudy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudyProgram',
      required: true,
      index: true,
    },
    relationshipType: {
      type: String,
      required: true,
      enum: [
        'DIRECT',
        'RELATED',
        'POSSIBLE_WITH_SKILLS',
        'POSSIBLE_WITH_QUALIFICATION',
        'LICENSE_REQUIRED',
        'EXPERIENCE_REQUIRED'
      ],
      default: 'DIRECT',
    },
    eligibilityCriteria: {
      minimumMarksPercentage: { type: Number, default: 50 },
      requiredSubjects: [{ type: String }],
      entranceExams: [{ type: String }],
      workExperienceMonths: { type: Number, default: 0 },
      specialConditions: { type: String, default: '' },
    },
    rationale: { type: String, default: '' },
    country: { type: String, default: 'Global' },
    region: { type: String, default: 'All' },
    source: { type: String, default: 'Statutory Higher Education Regulatory Guidelines' },
    sourceUrl: { type: String, default: 'https://education.gov.in' },
    lastVerified: { type: Date, default: Date.now },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED',
    },
  },
  { timestamps: true }
);

studyPathwaySchema.index({ fromEducation: 1, toStudy: 1 }, { unique: true });

export const StudyPathway = mongoose.model('StudyPathway', studyPathwaySchema);
