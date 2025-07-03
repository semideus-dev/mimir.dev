"use client";
import React from "react";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import CallLobby from "@/modules/call/ui/components/call-lobby";
import CallEnded from "@/modules/call/ui/components/call-ended";
import CallActive from "@/modules/call/ui/components/call-active";
import { LoadingIcon } from "@/components/icons";

interface CallUIProps {
  meetingId: string;
  meetingName: string;
}

export default function CallUI({ meetingName, meetingId }: CallUIProps) {
  const call = useCall();
  const [show, setShow] = React.useState<"lobby" | "call" | "ended">("lobby");

  async function handleJoin() {
    if (!call) return <LoadingIcon />;

    await call.join();

    setShow("call");
  }

  function handleLeave() {
    if (!call) return;

    call.endCall();

    setShow("ended");
  }

  return (
    <StreamTheme>
      {show === "call" && (
        <CallActive meetingName={meetingName} onLeave={handleLeave} />
      )}
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
}
