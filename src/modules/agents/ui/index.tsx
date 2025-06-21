import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import PageHeader from "@/components/custom/page-header";
import AgentsGrid from "@/modules/agents/ui/components/agents-grid";
import { Button } from "@/components/ui/button";
import { AgentsGridLoadingView } from "@/components/custom/loading-views";

import { AddIcon } from "@/components/icons";

export default function AgentsView() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageHeader
          header="Your Agents"
          description="Schedule meetings with your own personalized AI bots."
        />
        <Button className="border" variant="ghost" size="lg">
          <AddIcon />
          New Agent
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<AgentsGridLoadingView />}>
          <AgentsGrid />
        </React.Suspense>
      </HydrationBoundary>
    </div>
  );
}
