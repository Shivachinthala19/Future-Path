import { Study } from '../models/Study.js';
import { structuredStudies } from './studies.js';

export const seedStudies = async () => {
  let importedCount = 0;
  for (const item of structuredStudies) {
    await Study.findOneAndUpdate(
      { id: item.id.toLowerCase() },
      { ...item, id: item.id.toLowerCase() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    importedCount++;
  }
  return importedCount;
};

export default seedStudies;
