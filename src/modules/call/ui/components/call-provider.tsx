"use client";

import { LoadingIcon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";
import React from "react";
import CallConnect from "@/modules/call/ui/components/call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface CallProviderProps {
  meetingId: string;
  meetingName: string;
}

export default function CallProvider({
  meetingId,
  meetingName,
}: CallProviderProps) {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return <LoadingIcon className="animate-spin" />;
  }
  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
}
