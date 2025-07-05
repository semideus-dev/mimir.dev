import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "react-error-boundary";

import MeetingDetailsView from "@/modules/meetings/ui/views/meeting-details-view";
import { MeetingsDetailsLoadingView } from "@/components/custom/loading-views";

import { LoadingIcon } from "@/components/icons";

interface MeetingDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingDetailsPage({
  params,
}: MeetingDetailsProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<MeetingsDetailsLoadingView />}>
        <ErrorBoundary fallback={<LoadingIcon className="animate-spin" />}>
          <MeetingDetailsView meetingId={id} />
        </ErrorBoundary>
      </React.Suspense>
    </HydrationBoundary>
  );
}
