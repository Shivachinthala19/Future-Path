import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
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
    category: {
      type: String,
      default: 'Technical',
      index: true
    },
    description: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'High', 'Very High', 'Crucial', 'Moderate'],
      default: 'Intermediate'
    },
    demandLevel: {
      type: String,
      default: 'High'
    },
    relatedJobs: [{
      type: String
    }],
    relatedStudies: [{
      type: String
    }],
    suggestedLearningHours: {
      type: Number,
      default: 20
    },
    learningResources: [
      {
        title: { type: String },
        provider: { type: String },
        type: { type: String, enum: ['course', 'documentation', 'practice', 'book', 'tutorial', 'guide'], default: 'course' },
        url: { type: String },
        isFree: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

skillSchema.pre('validate', function(next) {
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

skillSchema.index({ name: 'text', description: 'text', aliases: 'text', category: 'text' });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export default Skill;
