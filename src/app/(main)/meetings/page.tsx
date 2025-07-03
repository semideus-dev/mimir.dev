import React from "react";
import type { Metadata } from "next";

import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import MeetingHeader from "@/modules/meetings/ui/components/meetings-headers";
import { LoadingIcon } from "@/components/icons";
import { MeetingsTableLoadingView } from "@/components/custom/loading-views";
import { loadSearchParams } from "@/modules/meetings/utils/params";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Mimir - Meetings",
  description: "Join a scheduled meeting with your AI.",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function MeetingPage({ searchParams }: Props) {
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );
  return (
    <>
      <MeetingHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<MeetingsTableLoadingView />}>
          <ErrorBoundary fallback={<LoadingIcon className="animate-spin" />}>
            <MeetingsView />
          </ErrorBoundary>
        </React.Suspense>
      </HydrationBoundary>
    </>
  );
}
