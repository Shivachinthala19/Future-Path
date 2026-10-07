import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
    careerField: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerField',
    },
    targetRoles: [{ type: String }],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Portfolio Hero'],
      default: 'Intermediate',
    },
    description: { type: String, default: '' },
    problemStatement: { type: String, default: '' },
    deliverables: [{ type: String }],
    technologies: [{ type: String }],
    skillsDemonstrated: [{ type: String }],
    estimatedHours: { type: Number, default: 25 },
    githubTemplateUrl: { type: String, default: '' },
    resumeBulletExample: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
