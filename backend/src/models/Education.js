import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
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
      index: true,
    },
    aliases: [{ type: String, trim: true, index: true }],
    level: {
      type: String,
      required: true,
      enum: [
        'School (10th)',
        'Higher Secondary (12th)',
        'Vocational / ITI',
        'Diploma',
        'Undergraduate',
        'Postgraduate',
        'Professional Degree',
        'Doctorate / PhD',
        'Certificate'
      ],
      index: true,
    },
    qualification: { type: String, default: '' },
    stream: { type: String, default: 'General', index: true },
    branch: { type: String, default: '' },
    specialization: { type: String, default: '' },
    description: { type: String, default: '' },
    durationYears: { type: Number, default: 3 },
    country: { type: String, default: 'Global', index: true },
    region: { type: String, default: 'All' },
    status: { type: String, enum: ['active', 'legacy', 'deprecated'], default: 'active' },
    typicalSubjects: [{ type: String }],
    source: { type: String, default: 'National Education Framework & Industry Standard' },
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

educationSchema.index({ name: 'text', aliases: 'text', description: 'text', branch: 'text' });

export const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
export default Education;
