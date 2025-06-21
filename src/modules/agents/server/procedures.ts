import { createTRPCRouter, baseProcedure } from "@/trpc/init";

import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
});
