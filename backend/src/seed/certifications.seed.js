import { Certification } from '../models/Certification.js';
import { structuredCertifications } from './certifications.js';

export const seedCertifications = async () => {
  let importedCount = 0;
  for (const item of structuredCertifications) {
    const slug = (item.id || item.slug || item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-');
    await Certification.findOneAndUpdate(
      { slug },
      {
        ...item,
        id: slug,
        slug,
        title: item.title || item.name,
        name: item.name || item.title
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    importedCount++;
  }
  return importedCount;
};

export default seedCertifications;
