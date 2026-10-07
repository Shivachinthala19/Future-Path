import { Job } from '../models/Job.js';
import { structuredJobs } from './jobs.js';

export const seedJobs = async () => {
  let importedCount = 0;
  for (const item of structuredJobs) {
    const jobData = {
      ...item,
      id: item.id.toLowerCase(),
      title: item.name || item.title || item.id,
      name: item.name || item.title || item.id
    };
    await Job.findOneAndUpdate(
      { id: item.id.toLowerCase() },
      jobData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    importedCount++;
  }
  return importedCount;
};

export default seedJobs;
