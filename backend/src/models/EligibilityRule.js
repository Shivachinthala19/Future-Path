import mongoose from 'mongoose';

const eligibilityRuleSchema = new mongoose.Schema(
  {
    education: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education',
      required: true,
      index: true,
    },
    targetType: {
      type: String,
      enum: ['StudyProgram', 'JobRole', 'Career'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    minimumPercentage: {
      type: Number,
      default: 50,
    },
    mandatorySubjects: [{ type: String }],
    recognizedEntranceExams: [
      {
        name: { type: String },
        cutoffPercentile: { type: Number, default: 0 },
        conductingBody: { type: String }
      }
    ],
    experienceRequiredMonths: {
      type: Number,
      default: 0,
    },
    isRegulatedProfession: {
      type: Boolean,
      default: false,
    },
    licensingAuthority: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'Official Education Board & Accreditation Catalog',
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED',
    }
  },
  { timestamps: true }
);

export const EligibilityRule = mongoose.model('EligibilityRule', eligibilityRuleSchema);
