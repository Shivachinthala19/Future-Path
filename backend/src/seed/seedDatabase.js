import mongoose from 'mongoose';
import { connectDB, closeDB } from '../config/db.js';
import { Study } from '../models/Study.js';
import { Job } from '../models/Job.js';
import { Career } from '../models/Career.js';
import { Exam } from '../models/Exam.js';
import { Skill } from '../models/Skill.js';
import { Certification } from '../models/Certification.js';
import { User } from '../models/User.js';
import { Entity } from '../models/Entity.js';

import { seedStudies } from './studies.seed.js';
import { seedJobs } from './jobs.seed.js';
import { seedCareers } from './careers.seed.js';
import { seedExams } from './exams.seed.js';
import { seedSkills } from './skills.seed.js';
import { seedCertifications } from './certifications.seed.js';

import { structuredStudies } from './studies.js';
import { structuredJobs } from './jobs.js';
import { structuredCareers } from './careers.js';
import { structuredExams } from './exams.js';
import { structuredCertifications } from './certifications.js';
import { structuredSkills } from './skills.js';

export const seedDatabase = async (options = {}) => {
  const isReset = options.reset || process.argv.includes('--reset');

  try {
    await connectDB();
    console.log('[Seed] Database connected successfully.');

    if (isReset) {
      console.log('[Seed:Reset] Performing destructive collection reset...');
      await Promise.all([
        Study.deleteMany({}),
        Job.deleteMany({}),
        Career.deleteMany({}),
        Exam.deleteMany({}),
        Skill.deleteMany({}),
        Certification.deleteMany({}),
        Entity.deleteMany({})
      ]);
      console.log('[Seed:Reset] Collections cleared.');
    }

    const [studiesCount, jobsCount, careersCount, examsCount, skillsCount, certsCount] = await Promise.all([
      seedStudies(),
      seedJobs(),
      seedCareers(),
      seedExams(),
      seedSkills(),
      seedCertifications()
    ]);

    // Also populate unified Entity knowledge graph
    const allEntities = [
      ...structuredStudies,
      ...structuredJobs,
      ...structuredCareers,
      ...structuredExams,
      ...structuredCertifications,
      ...structuredSkills
    ];

    for (const ent of allEntities) {
      await Entity.findOneAndUpdate(
        { id: ent.id.toLowerCase() },
        { ...ent, id: ent.id.toLowerCase() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    // Ensure default demo and admin users exist
    const adminExists = await User.findOne({ email: 'admin@careercompass.ai' });
    if (!adminExists) {
      await User.create({
        name: 'System Administrator',
        email: 'admin@careercompass.ai',
        password: 'AdminPassword123!',
        role: 'admin',
        headline: 'Platform Content Director & Education Analyst',
        location: { country: 'India', city: 'Bengaluru' }
      });
    }

    const demoExists = await User.findOne({ email: 'demo@careercompass.ai' });
    if (!demoExists) {
      await User.create({
        name: 'Priya Sharma',
        email: 'demo@careercompass.ai',
        password: 'DemoPassword123!',
        role: 'user',
        headline: 'B.Com Graduate | Aspiring Financial & Business Analyst',
        location: { country: 'India', city: 'Mumbai' },
        currentEducation: {
          name: 'B.Com',
          status: 'completed',
          completionYear: 2024
        },
        careerGoal: {
          targetCareer: 'Corporate Finance & Analytics',
          targetJobRole: 'Junior Financial Analyst',
          targetTimelineMonths: 6
        }
      });
    }

    console.log('\n=============================================');
    console.log('       FUTURE PATH DATABASE SEED REPORT      ');
    console.log('=============================================');
    console.log(`Studies imported:        ${studiesCount}`);
    console.log(`Jobs imported:           ${jobsCount}`);
    console.log(`Careers imported:        ${careersCount}`);
    console.log(`Exams imported:          ${examsCount}`);
    console.log(`Skills imported:         ${skillsCount}`);
    console.log(`Certifications imported: ${certsCount}`);
    console.log('---------------------------------------------');
    console.log('Database seeding completed successfully.\n');

  } catch (error) {
    console.error('[Seed] Seeding error:', error);
    throw error;
  } finally {
    if (options.close !== false) {
      await closeDB();
    }
  }
};

if (process.argv[1] && process.argv[1].includes('seedDatabase.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedDatabase;
