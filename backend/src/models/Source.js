import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    title: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: [
        'OFFICIAL',
        'REFERENCE',
        'LEARNING',
        'UNIVERSITY',
        'GOVERNMENT',
        'RECRUITMENT',
        'PROFESSIONAL_BODY',
        'SEARCH',
        'OTHER'
      ],
      default: 'OFFICIAL',
      index: true
    },
    organization: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    lastVerified: {
      type: String,
      default: 'September 2026'
    }
  },
  { timestamps: true }
);

sourceSchema.pre('validate', function(next) {
  if (!this.title && this.name) {
    this.title = this.name;
  }
  if (!this.name && this.title) {
    this.name = this.title;
  }
  next();
});

sourceSchema.index({ name: 'text', title: 'text', organization: 'text' });

export const Source = mongoose.models.Source || mongoose.model('Source', sourceSchema);
export default Source;
