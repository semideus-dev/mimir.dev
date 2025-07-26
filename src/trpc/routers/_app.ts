import { createTRPCRouter } from "@/trpc/init";

import { agentsRouter } from "@/modules/agents/server/procedures";
import { meetingsRouter } from "@/modules/meetings/server/procedures";
import { proRouter } from "@/modules/pro/server/procedures";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  pro: proRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
