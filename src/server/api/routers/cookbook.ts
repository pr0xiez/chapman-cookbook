import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const addSectionSchema = z.object({
  title: z.string(),
});

const searchTextSchema = z.object({
  title: z.string().optional(),
});

export const cookbookRouter = createTRPCRouter({
  addSection: publicProcedure
    .input(addSectionSchema)
    .mutation(async ({ input, ctx }) => {
      const createdSection = await ctx.prisma.cookbookSection.create({
        data: {
          title: input.title,
        },
      });

      return { cookbookSection: createdSection };
    }),
  getSections: publicProcedure
    .input(searchTextSchema)
    .query(({ ctx, input }) => {
      if (input.title === undefined) {
        return ctx.prisma.cookbookSection.findMany({
          include: {
            recipes: {},
          },
        });
      }

      return ctx.prisma.cookbookSection.findMany({
        where: {
          recipes: {
            some: {
              title: {
                contains: input.title,
              },
            },
          },
        },
        include: {
          recipes: {
            where: {
              title: {
                contains: input.title,
              },
            },
          },
        },
      });
    }),
});
