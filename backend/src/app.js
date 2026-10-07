import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { ENV } from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import studyRoutes from './routes/studyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import examRoutes from './routes/examRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import twinRoutes from './routes/twinRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import targetJobRoutes from './routes/targetJobRoutes.js';
import eligibilityRoutes from './routes/eligibilityRoutes.js';
import learnRoutes from './routes/learnRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development and standard frontend urls
      callback(null, true);
    },
    credentials: true,
  })
);

// General rate limiter
app.use(generalLimiter);

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (ENV.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'Future Path API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/future-path', careerRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/careers', jobRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/study-options', studyRoutes);
app.use('/api/study-next', studyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/certification', certificationRoutes);
app.use('/api/target-job', targetJobRoutes);
app.use('/api/job-roadmap', targetJobRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/roadmap', careerRoutes);
app.use('/api/projects', careerRoutes);
app.use('/api/resume', careerRoutes);
app.use('/api/interview', careerRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/career-twin', twinRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
