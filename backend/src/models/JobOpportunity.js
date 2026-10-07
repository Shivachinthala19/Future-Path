import mongoose from 'mongoose';

const jobOpportunitySchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      default: 'Remote / Bengaluru, India',
    },
    workplaceType: {
      type: String,
      enum: ['Remote', 'Hybrid', 'Onsite'],
      default: 'Hybrid',
    },
    category: {
      type: String,
      enum: ['Job', 'Internship', 'Apprenticeship', 'Scholarship', 'Training Program'],
      default: 'Job',
      index: true,
    },
    experience: {
      type: String,
      default: '0-2 years (Fresher eligible)',
    },
    skills: [{ type: String }],
    salaryOrStipend: {
      type: String,
      default: 'Competitive Industry Standard',
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: 'National Career Service / Industry Direct Board',
    },
    applicationUrl: {
      type: String,
      required: true,
    },
    retrievedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

jobOpportunitySchema.index({ role: 'text', company: 'text', skills: 'text' });

export const JobOpportunity = mongoose.model('JobOpportunity', jobOpportunitySchema);
