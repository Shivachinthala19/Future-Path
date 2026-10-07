import mongoose from 'mongoose';

const dailyMissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Skill Practice', 'Project Building', 'Concept Mastery', 'Interview Prep', 'Career Action'],
      default: 'Skill Practice',
    },
    targetSkill: {
      type: String,
      default: '',
    },
    estimatedMinutes: {
      type: Number,
      default: 45,
    },
    points: {
      type: Number,
      default: 50,
    },
    actionUrl: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    date: {
      type: String, // YYYY-MM-DD
      default: () => new Date().toISOString().split('T')[0],
      index: true,
    }
  },
  { timestamps: true }
);

export const DailyMission = mongoose.model('DailyMission', dailyMissionSchema);
