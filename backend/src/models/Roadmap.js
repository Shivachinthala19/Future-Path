import mongoose from 'mongoose';

const roadmapStepSchema = new mongoose.Schema({
  order: { type: Number, required: true, default: 1 },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: {
    type: String,
    enum: ['LEARNING', 'PROJECT', 'CERTIFICATION', 'MILESTONE', 'EXAM', 'APPLICATION', 'INTERVIEW', 'CORE'],
    default: 'LEARNING'
  },
  phaseNumber: { type: Number, default: 1 },
  phaseTitle: { type: String, default: 'Foundation' },
  month: { type: Number, default: 1 },
  estimatedHours: { type: Number, default: 10 },
  prerequisites: [{ type: String }],
  skills: [{ type: String }],
  studies: [{ type: String }],
  resources: [
    {
      title: { type: String },
      url: { type: String },
      type: { type: String, default: 'guide' }
    }
  ],
  projects: [
    {
      name: { type: String },
      tech: { type: String },
      desc: { type: String }
    }
  ],
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
});

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    targetType: {
      type: String,
      enum: ['STUDY', 'JOB', 'CAREER'],
      default: 'JOB',
      index: true
    },
    targetId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    targetCareer: {
      type: String,
      default: ''
    },
    targetJobRole: {
      type: String,
      default: ''
    },
    startingEducation: {
      type: String,
      default: ''
    },
    durationMonths: {
      type: Number,
      default: 6
    },
    overallProgressPercentage: {
      type: Number,
      default: 0
    },
    phases: [
      {
        phaseNumber: { type: Number },
        title: { type: String },
        focus: { type: String }
      }
    ],
    steps: [roadmapStepSchema],
    tasks: [roadmapStepSchema], // alias for compatibility
    isAiGenerated: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

roadmapSchema.pre('save', function(next) {
  if (this.steps && (!this.tasks || this.tasks.length === 0)) {
    this.tasks = this.steps;
  } else if (this.tasks && (!this.steps || this.steps.length === 0)) {
    this.steps = this.tasks;
  }
  next();
});

export const Roadmap = mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
