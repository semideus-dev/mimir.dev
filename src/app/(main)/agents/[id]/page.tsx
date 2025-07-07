import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "react-error-boundary";

import AgentDetailsView from "@/modules/agents/ui/views/agent-details-view";

import { LoadingIcon } from "@/components/icons";
import { AgentDetailsLoadingView } from "@/components/custom/loading-views";

interface AgentDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function AgentDetailsPage({ params }: AgentDetailsProps) {
  const { id } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: id }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<AgentDetailsLoadingView />}>
        <ErrorBoundary fallback={<LoadingIcon className="animate-spin" />}>
          <AgentDetailsView id={id} />
        </ErrorBoundary>
      </React.Suspense>
    </HydrationBoundary>
  );
}
