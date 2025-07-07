import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CallView from "@/modules/call/ui/views/call-view";

import { LoadingIcon } from "@/components/icons";

interface AgentCallProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CallPage({ params }: AgentCallProps) {
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
      <React.Suspense fallback={<LoadingIcon />}>
        <ErrorBoundary fallback={<LoadingIcon />}>
          <CallView meetingId={id} />
        </ErrorBoundary>
      </React.Suspense>
    </HydrationBoundary>
  );
}
