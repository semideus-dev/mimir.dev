import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AgentsTable from "@/modules/agents/ui/components/agents-table";

import { ErrorBoundary } from "react-error-boundary";
import { AgentsTableErrorView } from "@/components/custom/error-views";
import { AgentsTableLoadingView } from "@/components/custom/loading-views";

import AgentHeader from "@/modules/agents/ui/components/agent-header";

export default function AgentsView() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

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
