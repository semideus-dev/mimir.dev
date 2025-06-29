import React from "react";
import type { Metadata } from "next";

import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import MeetingHeader from "@/modules/meetings/ui/components/meetings-headers";
import { LoadingIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mimir - Meetings",
  description: "Join a scheduled meeting with your AI.",
};

export default async function MeetingPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <>
      <MeetingHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Suspense fallback={<LoadingIcon className="animate-spin" />}>
          <ErrorBoundary fallback={<LoadingIcon className="animate-spin" />}>
            <MeetingsView />
          </ErrorBoundary>
        </React.Suspense>
      </HydrationBoundary>
    </>
  );
}
