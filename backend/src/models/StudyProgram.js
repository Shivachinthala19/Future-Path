import mongoose from 'mongoose';

const studyProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    degreeLevel: {
      type: String,
      required: true,
      enum: [
        'School (10th)',
        'Higher Secondary (12th)',
        'Vocational / ITI',
        'Certificate',
        'Diploma',
        'Undergraduate',
        'Postgraduate',
        'Doctorate / PhD',
        'Professional Degree',
        'Professional Qualification',
        'Advanced Fellowship'
      ],
      index: true,
    },
    duration: { type: String, default: '2 Years' },
    field: { type: String, default: 'General' },
    description: { type: String, default: '' },
    subjects: [{ type: String }],
    specializations: [{ type: String }],
    admissionRequirements: { type: String, default: '' },
    entranceExams: [{ type: String }],
    popularEntranceExams: [{ type: String }],
    careerOpportunities: [{ type: String }],
    higherStudyOptions: [{ type: String }],
    typicalCurriculum: [{ type: String }],
    careerOutcomes: [{ type: String }],
    eligibilitySummary: { type: String, default: '' },
    topInstitutes: [{ type: String }],
    isHighDemand: { type: Boolean, default: false },
    source: { type: String, default: 'UGC / AICTE / Official Education Board' },
    sourceUrl: { type: String, default: 'https://ugc.gov.in' },
    lastVerified: { type: String, default: 'September 2026' },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED',
    },
  },
  { timestamps: true }
);

studyProgramSchema.index({ name: 'text', description: 'text', field: 'text' });

export const StudyProgram = mongoose.model('StudyProgram', studyProgramSchema);
