"use client";

import { CheckIcon } from "@/components/icons";
import MeetingsVariants from "@/modules/meetings/ui/components/meetings-variants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import CallProvider from "@/modules/call/ui/components/call-provider";

interface CallViewProps {
  meetingId: string;
}

export default function CallView({ meetingId }: CallViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <MeetingsVariants
          title="Meeting Completed"
          description="This meeting has ended."
          className="w-[90%] md:w-[40%]"
          icon={<CheckIcon width={80} height={80} className="text-green-500" />}
          meetingId={data.id}
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
}
