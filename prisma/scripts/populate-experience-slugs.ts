import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../../lib/slug-util';

const prisma = new PrismaClient();

async function main() {
  const experiences = await prisma.experience.findMany();

  for (const experience of experiences) {
      const baseSlug = generateSlug(`${experience.title}-${experience.name}`);
      let newSlug = baseSlug;
      let counter = 0;
      let existingExperience = await prisma.experience.findFirst({ where: { slug: newSlug } });

      while (existingExperience && existingExperience.id !== experience.id) {
        counter++;
        newSlug = `${baseSlug}-${counter}`;
        existingExperience = await prisma.experience.findUnique({ where: { slug: newSlug } });
      } // No change needed, already applied.
      console.log(`Updating experience "${experience.title}" with new slug: ${newSlug}`);
      await prisma.experience.update({
        where: { id: experience.id },
        data: { slug: newSlug },
      });
  }
  console.log('Experience slugs populated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
