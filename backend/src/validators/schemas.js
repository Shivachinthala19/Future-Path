import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  currentEducation: z.string().optional(),
  targetCareer: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const analyzeEducationSchema = z.object({
  study: z.string().min(1, 'Education or study query is required'),
  status: z.enum(['completed', 'pursuing', 'discontinued']).optional().default('completed'),
  country: z.string().optional().default('India'),
  targetGoal: z.string().optional(),
  interests: z.array(z.string()).optional(),
  availableWeeklyHours: z.number().optional().default(15),
});

export const skillGapSchema = z.object({
  targetRoleOrCareer: z.string().min(1, 'Target job role or career is required'),
  currentSkills: z.array(z.string()).default([]),
  education: z.string().optional(),
});

export const roadmapGenerateSchema = z.object({
  startingEducation: z.string().min(1, 'Starting education is required'),
  targetCareer: z.string().min(1, 'Target career is required'),
  targetJobRole: z.string().optional(),
  durationMonths: z.number().min(1).max(24).optional().default(6),
  availableWeeklyHours: z.number().min(1).max(80).optional().default(15),
});

export const resumeAnalyzeSchema = z.object({
  resumeText: z.string().min(20, 'Resume text must contain at least 20 characters for a meaningful analysis'),
  targetJob: z.string().optional(),
});

export const interviewAnswerSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  questionIndex: z.number().min(0),
  userAnswer: z.string().min(5, 'Answer should be at least 5 characters'),
});

export const aiChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  context: z.record(z.any()).optional(),
});

export const validateRequest = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    next(error);
  }
};
