import mongoose from 'mongoose';

const careerTwinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    education: {
      degreeName: { type: String, default: '' },
      level: { type: String, default: '' },
      stream: { type: String, default: '' },
      completionYear: { type: Number },
      status: { type: String, default: 'completed' },
      institution: { type: String, default: '' },
    },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
        verified: { type: Boolean, default: false },
        addedAt: { type: Date, default: Date.now },
      }
    ],
    interests: [{ type: String }],
    targetCareers: [{ type: String }],
    targetJobs: [{ type: String }],
    currentGpsProgress: { type: Number, default: 25, min: 0, max: 100 },
    twinScore: { type: Number, default: 35, min: 0, max: 100 },
    completedProjectsCount: { type: Number, default: 0 },
    completedCertificationsCount: { type: Number, default: 0 },
    completedRoadmapTasksCount: { type: Number, default: 0 },
    interviewReadinessScore: { type: Number, default: 40, min: 0, max: 100 },
    resumeScore: { type: Number, default: 50, min: 0, max: 100 },
    activeDailyStreak: { type: Number, default: 1 },
    passportSlug: { type: String, unique: true, sparse: true },
    isPassportPublic: { type: Boolean, default: true },
    recentActivity: [
      {
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
        detail: { type: String },
      }
    ]
  },
  { timestamps: true }
);

export const CareerTwin = mongoose.model('CareerTwin', careerTwinSchema);
