"use client";

import React from "react";

import useConfirmation from "@/hooks/use-confirmation";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { MeetingDetailsHeader } from "@/modules/meetings/ui/components/meetings-headers";
import { UpdateMeetingDialog } from "@/modules/meetings/ui/components/meetings-dialogs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MeetingsVariants from "../components/meetings-variants";
import {
  ActiveIcon,
  CheckIcon,
  ErrorIcon,
  LoadingIcon,
  ScheduleIcon,
} from "@/components/icons";

interface MeetingDetailsProps {
  meetingId: string;
}

export default function MeetingDetailsView({ meetingId }: MeetingDetailsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirmation(
    "Are you sure?",
    "All of the transcripts along with the recording will also be deleted.",
  );

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
      },
    }),
  );

  async function handleOnRemove() {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  }

  const isActive = data.status === "active";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  const isUpcoming = data.status === "upcoming";

  return (
    <section className="flex flex-col gap-4">
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={open}
        onOpenChange={setOpen}
        initialValues={data}
      />
      <MeetingDetailsHeader
        header={data.name}
        onEdit={() => setOpen(true)}
        onRemove={handleOnRemove}
      />
      {isUpcoming && (
        <MeetingsVariants
          title="Not started yet"
          description="A summary will appear once the meeting has been started."
          meetingId={meetingId}
          icon={
            <ScheduleIcon width={80} height={80} className="text-yellow-400" />
          }
          isUpcoming
        />
      )}
      {isActive && (
        <MeetingsVariants
          title="Meeting is active"
          description="The meeting will end once all participants have left."
          meetingId={meetingId}
          icon={<ActiveIcon width={80} height={80} className="text-primary" />}
          isActive
        />
      )}
      {isCompleted && (
        <MeetingsVariants
          title="Completed"
          description="The meeting has been ended by the user."
          meetingId={meetingId}
          icon={<CheckIcon width={80} height={80} className="text-green-500" />}
        />
      )}
      {isCancelled && (
        <MeetingsVariants
          title="Cancelled"
          description="The meetings has been cancelled."
          meetingId={meetingId}
          icon={<ErrorIcon width={80} height={80} className="text-rose-500" />}
        />
      )}
      {isProcessing && (
        <MeetingsVariants
          title="Processing"
          description="Kindly wait as we process the meeting."
          meetingId={meetingId}
          icon={
            <LoadingIcon
              width={80}
              height={80}
              className="animate-spin text-zinc-500"
            />
          }
        />
      )}
    </section>
  );
}
