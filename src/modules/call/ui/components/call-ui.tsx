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
    if (!call) return;

    try {
      await call.join();
      setShow("call");
    } catch (error) {
      console.error("Failed to join call:", error);
      // Could show error message or retry logic
      // For now, stay in lobby state
    }
  }

  function handleLeave() {
    if (!call) return;

    try {
      call.endCall();
      setShow("ended");
    } catch (error) {
      console.error("Failed to end call:", error);
      setShow("ended");
    }
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
