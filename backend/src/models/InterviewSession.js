import mongoose from 'mongoose';

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    targetRole: {
      type: String,
      required: true,
    },
    interviewType: {
      type: String,
      enum: ['Technical', 'Behavioral', 'HR / Cultural', 'Project Discussion', 'System / Domain Case'],
      default: 'Technical',
    },
    difficulty: {
      type: String,
      enum: ['Junior / Fresher', 'Mid-Level', 'Senior'],
      default: 'Junior / Fresher',
    },
    questions: [
      {
        question: { type: String, required: true },
        category: { type: String, default: 'Core' },
        idealKeyPoints: [{ type: String }],
        userAnswer: { type: String, default: '' },
        aiFeedback: { type: String, default: '' },
        score: { type: Number, default: 0, min: 0, max: 100 },
      }
    ],
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    summaryFeedback: {
      type: String,
      default: '',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);
