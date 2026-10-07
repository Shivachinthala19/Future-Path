import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'My Primary Resume',
    },
    rawText: {
      type: String,
      default: '',
    },
    targetJobTitle: {
      type: String,
      default: '',
    },
    detectedEducation: [{ type: String }],
    detectedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    recommendedKeywords: [{ type: String }],
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    overallScore: {
      type: Number,
      default: 65,
      min: 0,
      max: 100,
    },
    atsBreakdown: {
      formattingScore: { type: Number, default: 80 },
      skillsMatchScore: { type: Number, default: 60 },
      experienceClarityScore: { type: Number, default: 70 },
      keywordDensityScore: { type: Number, default: 65 },
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model('Resume', resumeSchema);
