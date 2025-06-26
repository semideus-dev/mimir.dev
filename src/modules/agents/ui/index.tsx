import React from "react";

import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/utils/params";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AgentsTable from "@/modules/agents/ui/components/agents-table";
import AgentHeader from "@/modules/agents/ui/components/agents-header";

import { ErrorBoundary } from "react-error-boundary";
import { AgentsTableErrorView } from "@/components/custom/error-views";
import { AgentsTableLoadingView } from "@/components/custom/loading-views";


interface QueryProps {
  searchParams: Promise<SearchParams>;
}

export default async function AgentsView({ searchParams }: QueryProps) {
  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );

  return (
    <div className="flex flex-col gap-4">
      <AgentHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<AgentsTableLoadingView />}>
          <ErrorBoundary fallback={<AgentsTableErrorView />}>
            <AgentsTable />
          </ErrorBoundary>
        </React.Suspense>
      </HydrationBoundary>
    </div>
  );
}
