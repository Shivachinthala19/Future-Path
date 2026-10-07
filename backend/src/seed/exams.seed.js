import { Exam } from '../models/Exam.js';
import { structuredExams } from './exams.js';

export const seedExams = async () => {
  let importedCount = 0;
  for (const item of structuredExams) {
    const id = (item.id || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-');
    await Exam.findOneAndUpdate(
      { id },
      { ...item, id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    importedCount++;
  }
  return importedCount;
};

export default seedExams;
