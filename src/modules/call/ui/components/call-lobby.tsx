import React from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CallLobbyProps {
  onJoin: () => void;
}

function LobbyPreview() {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
}

function AllowPermissions() {
  return <p>Please allow your browser to access your camera and microphone.</p>;
}

export default function CallLobby({ onJoin }: CallLobbyProps) {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-fit w-[90%] flex-col items-center justify-center gap-4 rounded-xl border p-4 md:w-[40%]">
        <span className="text-3xl font-medium">Ready to join?</span>
        <span className="text-muted-foreground">
          Set up your call before joining.
        </span>
        <VideoPreview
          DisabledVideoPreview={
            hasBrowserPermission ? LobbyPreview : AllowPermissions
          }
        />
        <div className="flex items-center gap-x-2">
          <ToggleAudioPreviewButton />
          <ToggleVideoPreviewButton />
        </div>
        <div className="flex w-full items-center justify-between gap-x-2">
          <Button
            className="rounded-full border font-semibold uppercase"
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href="/meetings">cancel</Link>
          </Button>
          <Button
            className="rounded-full font-semibold uppercase"
            onClick={onJoin}
            size="sm"
          >
            start
          </Button>
        </div>
      </div>
    </div>
  );
}
