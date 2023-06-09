import { prisma } from "../src/server/db";
import { cookbook } from "./seed-data";

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  const sections = await prisma.cookbookSection.findMany();
  const recipes = await prisma.recipe.findMany();
  const ingredients = await prisma.ingredient.findMany();

  for (const ingredient of ingredients) {
    await prisma.ingredient.delete({ where: { id: ingredient.id } });
  }
  for (const recipe of recipes) {
    await prisma.recipe.delete({ where: { id: recipe.id } });
  }
  for (const section of sections) {
    await prisma.cookbookSection.delete({ where: { id: section.id } });
  }

  for (const section in cookbook) {
    const recipes = cookbook[section];
    const createdSection = await prisma.cookbookSection.create({
      data: {
        title: section,
      },
    });

    for (const recipe of recipes ?? []) {
      await prisma.recipe.create({
        data: {
          title: recipe.title,
          serves: recipe.serves,
          author: recipe.author,
          instructions: recipe.instructions,
          cookbookSectionId: createdSection.id,
          ingredients: {
            create: recipe.ingredients,
          },
        },
      });
    }
  }
}
