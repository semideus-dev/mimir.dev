import {
  CallControls,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import Image from "next/image";
import React from "react";

interface CallActiveProps {
  onLeave: () => void;
  meetingName: string;
}

export default function CallActive({ onLeave, meetingName }: CallActiveProps) {
  const { useParticipants, useCallClosedCaptions } = useCallStateHooks();
  const participants = useParticipants();
  const closedCaptions = useCallClosedCaptions();

  return (
    <div className="flex h-screen flex-col items-center p-4">
      {/* Header with logo and meeting name */}
      <div className="flex w-full items-center space-x-2 rounded-xl border p-1">
        <Image src="/assets/mimir-logo.png" width={50} height={50} alt="logo" />
        <span className="text-xl font-semibold">{meetingName}</span>
      </div>

      {/* Custom participant view area */}
      <div className="my-4 w-full flex-1">
        {participants.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {participants.map((participant) => (
              <ParticipantView
                key={participant.userId}
                participant={participant}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Waiting for participants to join...</p>
          </div>
        )}
      </div>
      <div className="my-2 flex w-fit items-center rounded-xl border p-2">
        {closedCaptions.map(({ user, text, start_time }) => (
          <p
            className="flex items-center gap-x-2 text-sm"
            key={`${user.id}-${start_time}`}
          >
            <span className="text-muted-foreground font-medium">
              {user.name}:
            </span>
            <span className="md:text-base">{text}</span>
          </p>
        ))}
      </div>

      {/* Call controls */}
      <div className="w-fit rounded-xl border px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
}
