import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    provider: {
      type: String,
      trim: true
    },
    issuer: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      default: 'Professional Certification'
    },
    careerField: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerField'
    },
    eligibility: {
      type: mongoose.Schema.Types.Mixed,
      default: ''
    },
    duration: {
      type: String,
      default: ''
    },
    validityYears: {
      type: Number,
      default: 3
    },
    costTier: {
      type: String,
      enum: ['Free', 'Low Cost (<$100)', 'Moderate ($100-$500)', 'Premium ($500+)'],
      default: 'Moderate ($100-$500)'
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
      default: 'Intermediate'
    },
    skillsCovered: [{
      type: String
    }],
    skills: [{
      type: String
    }],
    relatedJobs: [{
      type: String
    }],
    officialUrl: {
      type: String,
      default: ''
    },
    officialSource: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING_VERIFICATION', 'OUTDATED', 'REQUIRES_REVIEW'],
      default: 'VERIFIED'
    },
    lastVerified: {
      type: String,
      default: 'September 2026'
    }
  },
  { timestamps: true }
);

certificationSchema.pre('validate', function(next) {
  if (!this.name && this.title) {
    this.name = this.title;
  }
  if (!this.title && this.name) {
    this.title = this.name;
  }
  if (!this.provider && this.issuer) {
    this.provider = this.issuer;
  }
  if (!this.issuer && this.provider) {
    this.issuer = this.provider;
  }
  if (!this.skills && this.skillsCovered) {
    this.skills = this.skillsCovered;
  }
  if (!this.skillsCovered && this.skills) {
    this.skillsCovered = this.skills;
  }
  if (!this.id && this.slug) {
    this.id = this.slug;
  }
  if (!this.slug && this.id) {
    this.slug = this.id;
  }
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    this.id = this.slug;
  }
  next();
});

certificationSchema.index({ title: 'text', name: 'text', description: 'text', provider: 'text', issuer: 'text' });
certificationSchema.index({ category: 1 });

export const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
export default Certification;
