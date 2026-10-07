import { Skill } from '../models/Skill.js';
import { structuredSkills } from './skills.js';

export const seedSkills = async () => {
  let importedCount = 0;
  for (const item of structuredSkills) {
    const slug = (item.id || item.slug || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-');
    await Skill.findOneAndUpdate(
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

export default seedSkills;
