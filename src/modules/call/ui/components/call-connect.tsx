"use client";

import React, { useEffect } from "react";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import CallUI from "@/modules/call/ui/components/call-ui";

import env from "@/lib/env";

import { LoadingIcon } from "@/components/icons";

interface CallConnectProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export default function CallConnect({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: CallConnectProps) {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  const [client, setClient] = React.useState<StreamVideoClient>();
  const [call, setCall] = React.useState<Call>();

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: env.streamApiKey!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });

    setClient(_client);

    return () => {
      _client.disconnectUser();
      setClient(undefined);
    };
  }, [userId, userName, userImage, generateToken]);

  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();

    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();

        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return <LoadingIcon className="animate-spin" />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingId={meetingId} meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
}
