import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    structuredData: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    title: {
      type: String,
      default: 'New Guidance Session'
    },
    userContext: {
      currentEducation: { type: String, default: '' },
      targetJob: { type: String, default: '' },
      skills: [{ type: String }],
      goal: { type: String, default: '' }
    },
    messages: [messageSchema],
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

conversationSchema.index({ userId: 1, updatedAt: -1 });

export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
export default Conversation;
