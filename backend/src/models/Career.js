import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    aliases: [{
      type: String,
      trim: true
    }],
    description: {
      type: String,
      default: ''
    },
    overview: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'General',
      index: true
    },
    careerField: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerField'
    },
    relatedStudies: [{
      type: String
    }],
    relatedEducation: [
      {
        education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
        relationshipType: {
          type: String,
          enum: [
            'DIRECT',
            'RELATED',
            'POSSIBLE_WITH_SKILLS',
            'POSSIBLE_WITH_QUALIFICATION',
            'LICENSE_REQUIRED',
            'EXPERIENCE_REQUIRED'
          ],
          default: 'DIRECT'
        },
        notes: { type: String, default: '' }
      }
    ],
    relatedJobs: [{
      type: String
    }],
    jobRoles: [{
      type: String
    }],
    requiredSkills: [{
      type: String
    }],
    skills: [{
      type: mongoose.Schema.Types.Mixed
    }],
    certifications: [{
      type: mongoose.Schema.Types.Mixed
    }],
    responsibilities: [{
      type: String
    }],
    averageSalary: {
      entry: { type: String, default: '₹4.5 - ₹7.0 LPA' },
      mid: { type: String, default: '₹8.0 - ₹15.0 LPA' },
      senior: { type: String, default: '₹16.0 - ₹30.0 LPA' }
    },
    careerGrowth: [{
      type: String
    }],
    progression: [
      {
        stage: { type: String },
        role: { type: String },
        years: { type: String }
      }
    ],
    higherStudies: [{
      type: mongoose.Schema.Types.Mixed
    }],
    roadmap: [
      {
        step: { type: Number },
        title: { type: String },
        description: { type: String },
        resources: [{ type: String }]
      }
    ],
    sources: [
      {
        title: { type: String },
        name: { type: String },
        url: { type: String },
        type: { type: String, default: 'OFFICIAL' },
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

careerSchema.pre('validate', function(next) {
  if (!this.id && this.slug) {
    this.id = this.slug;
  }
  if (!this.slug && this.id) {
    this.slug = this.id;
  }
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    this.id = this.slug;
  }
  next();
});

careerSchema.index({ name: 'text', description: 'text', aliases: 'text', category: 'text' });

export const Career = mongoose.models.Career || mongoose.model('Career', careerSchema);
export default Career;
