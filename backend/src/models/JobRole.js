import mongoose from 'mongoose';

const jobRoleSchema = new mongoose.Schema(
  {
    title: {
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
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
    },
    careerField: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerField',
      required: true,
      index: true,
    },
    jobFamily: {
      type: String,
      default: 'General Professional',
      index: true,
    },
    jobType: {
      type: String,
      enum: ['Private', 'Government', 'Public Sector', 'Self-Employment', 'Freelance', 'Contract', 'Apprenticeship', 'Internship'],
      default: 'Private',
      index: true,
    },
    sector: {
      type: String,
      default: 'General',
      index: true,
    },
    description: { type: String, default: '' },
    overview: { type: String, default: '' },
    whyFit: { type: String, default: '' },
    relatedEducation: [
      {
        education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
        educationName: { type: String },
        relationshipType: {
          type: String,
          enum: [
            'DIRECT',
            'RELATED',
            'POSSIBLE_WITH_SKILLS',
            'POSSIBLE_WITH_QUALIFICATION',
            'LICENSE_REQUIRED',
            'EXPERIENCE_REQUIRED',
            'EXAM_REQUIRED'
          ],
          default: 'DIRECT'
        },
        relevanceExplanation: { type: String }
      }
    ],
    acceptedQualifications: [{ type: String }],
    acceptedFields: [{ type: String }],
    requiredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    preferredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    skillsToLearn: [{ type: String }],
    certifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certification' }],
    tools: [{ type: String }],
    responsibilities: [{ type: String }],
    experienceLevel: {
      type: String,
      enum: ['Entry Level (0-2 yrs)', 'Mid Level (2-5 yrs)', 'Senior Level (5+ yrs)', 'Lead / Principal'],
      default: 'Entry Level (0-2 yrs)',
    },
    salaryRange: {
      min: { type: Number, default: 400000 },
      max: { type: Number, default: 800000 },
      currency: { type: String, default: 'INR' },
      formatted: { type: String, default: '₹4.5 - ₹8 LPA' }
    },
    ageRequirements: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 35 }
    },
    entranceExam: { type: String, default: '' },
    requiredLicense: { type: String, default: '' },
    locationRequirements: { type: String, default: 'Pan-India / Regional' },
    additionalRequirements: [{ type: String }],
    source: { type: String, default: 'Verified Recruiter Database / Official Examination Board' },
    sourceUrl: { type: String, default: '' },
    lastVerified: { type: String, default: 'September 2026' },
    notificationDate: { type: String, default: '' },
    applicationDeadline: { type: String, default: '' },
    stepByStepRoadmap: [{ type: String }],
    projects: [
      {
        name: { type: String },
        tech: { type: String },
        desc: { type: String }
      }
    ],
    interviewPreparation: [
      {
        category: { type: String, default: 'Technical' },
        question: { type: String },
        answerGuidance: { type: String }
      }
    ],
    interviewTopics: [{ type: String }],
    howToApply: { type: String, default: '' },
    careerProgression: [{ type: String }],
  },
  { timestamps: true }
);

jobRoleSchema.index({ title: 'text', description: 'text', tools: 'text', sector: 'text', jobType: 'text' });

export const JobRole = mongoose.model('JobRole', jobRoleSchema);
