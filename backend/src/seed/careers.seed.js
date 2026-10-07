import { Career } from '../models/Career.js';
import { structuredCareers } from './careers.js';

export const seedCareers = async () => {
  let importedCount = 0;
  for (const item of structuredCareers) {
    const slug = (item.id || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-');
    await Career.findOneAndUpdate(
      { slug },
      {
        ...item,
        id: slug,
        slug,
        name: item.name
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    importedCount++;
  }
  return importedCount;
};

export default seedCareers;
