import { createTRPCRouter } from "@/server/trpc";
import { companiesRouter } from "./routers/companies";
import { companyProfilesRouter } from "./routers/company-profiles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  companies: companiesRouter,
  companyProfiles: companyProfilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
