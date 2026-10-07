import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    passwordHash: {
      type: String,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: '',
    },
    headline: {
      type: String,
      default: 'Lifelong Learner & Career Explorer',
    },
    location: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({ country: 'India', city: '' })
    },
    education: {
      type: String,
      default: 'B.Com'
    },
    educationName: { type: String, default: 'B.Com' },
    educationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
    qualificationLevel: { type: String, default: 'Undergraduate' },
    specialization: { type: String, default: '' },
    currentJob: { type: String, default: '' },
    currentEducation: {
      name: { type: String, default: 'B.Com' },
      educationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
      qualificationLevel: { type: String, default: 'Undergraduate' },
      specialization: { type: String, default: '' },
      status: {
        type: String,
        enum: ['currently_studying', 'completed', 'pursuing', 'discontinued'],
        default: 'completed'
      },
      completionYear: { type: Number, default: 2024 },
      country: { type: String, default: 'India' },
      region: { type: String, default: '' }
    },
    targetJob: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({
        targetJobId: '',
        targetJobName: 'Data Analyst',
        sector: 'Technology & Analytics',
        category: 'Private',
        relevance: 'Directly Related'
      })
    },
    careerGoal: {
      targetCareer: { type: String, default: '' },
      targetJobRole: { type: String, default: '' },
      targetTimelineMonths: { type: Number, default: 6 },
    },
    skills: [{
      type: String
    }],
    preferences: {
      learningMode: { type: String, enum: ['online', 'hybrid', 'offline', 'flexible'], default: 'hybrid' },
      willingToRelocate: { type: Boolean, default: true },
      availableWeeklyHours: { type: Number, default: 15 },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordHash = this.password;
  }
  if (this.education && !this.educationName) {
    this.educationName = typeof this.education === 'string' ? this.education : this.education.name;
  }
  if (this.educationName && !this.education) {
    this.education = this.educationName;
  }
  if (this.currentEducation && this.currentEducation.name) {
    this.education = this.currentEducation.name;
    this.educationName = this.currentEducation.name;
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password || this.passwordHash);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
