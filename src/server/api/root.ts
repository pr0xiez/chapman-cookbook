import { recipeRouter } from "@/server/api/routers/recipe";
import { cookbookRouter } from "@/server/api/routers/cookbook";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipe: recipeRouter,
  cookbook: cookbookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
