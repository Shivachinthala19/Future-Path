import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
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
      default: 'EXAM'
    },
    category: {
      type: String,
      default: 'Competitive & Entrance'
    },
    organization: {
      type: String,
      default: ''
    },
    qualification: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    },
    eligibility: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({})
    },
    subjects: [{
      type: String
    }],
    examPattern: {
      type: String,
      default: ''
    },
    applicationPeriod: {
      type: String,
      default: ''
    },
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
        sourceType: { type: String, default: 'GOVERNMENT' },
        organization: { type: String },
        lastVerified: { type: String }
      }
    ],
    lastVerified: {
      type: String,
      default: 'September 2026'
    }
  },
  { timestamps: true }
);

examSchema.index({
  name: 'text',
  aliases: 'text',
  organization: 'text',
  category: 'text',
  description: 'text'
});
examSchema.index({ type: 1, category: 1 });

export const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema);
export default Exam;
