import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { Ingredient, Recipe } from "@prisma/client";

const addIngredientSchema = z.object({
  text: z.string(),
});

const addRecipeSchema = z.object({
  title: z.string(),
  author: z.string(),
  serves: z.number().optional(),
  instructions: z.string(),
  cookbookSectionId: z.string(),
  ingredients: z.array(addIngredientSchema),
});

const editIngredientSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
});

const editRecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  serves: z.number().optional(),
  instructions: z.string(),
  cookbookSectionId: z.string(),
  ingredients: z.array(editIngredientSchema),
});

const deleteIngredientSchema = z.object({
  id: z.string(),
});

export type AddIngredient = z.infer<typeof addIngredientSchema>;
export type AddRecipe = z.infer<typeof addRecipeSchema>;
export type EditIngredient = z.infer<typeof editIngredientSchema>;
export type EditRecipe = z.infer<typeof editRecipeSchema>;
export type IngredientRecipe = Recipe & {
  ingredients: Ingredient[];
};

export const recipeRouter = createTRPCRouter({
  addRecipe: publicProcedure
    .input(addRecipeSchema)
    .mutation(async ({ input, ctx }) => {
      const createdRecipe = await ctx.prisma.recipe.create({
        data: {
          title: input.title,
          author: input.author,
          serves: input.serves,
          instructions: input.instructions,
          cookbookSectionId: input.cookbookSectionId,
          ingredients: {
            create: input.ingredients,
          },
        },
        include: {
          ingredients: {},
        },
      });

      return { recipe: createdRecipe };
    }),
  editRecipe: publicProcedure
    .input(editRecipeSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          author: input.author,
          serves: input.serves,
          instructions: input.instructions,
          cookbookSectionId: input.cookbookSectionId,
        },
      });

      for (const ingredient of input.ingredients) {
        await ctx.prisma.ingredient.upsert({
          where: {
            id: ingredient.id ?? "",
          },
          update: {
            text: ingredient.text,
          },
          create: {
            text: ingredient.text,
            recipeId: input.id,
          },
        });
      }

      const updatedRecipe = ctx.prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ingredients: {},
        },
      });

      return { recipe: updatedRecipe };
    }),
  deleteIngredient: publicProcedure
    .input(deleteIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ingredient.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ingredients: {},
        },
      });
    }),
});
