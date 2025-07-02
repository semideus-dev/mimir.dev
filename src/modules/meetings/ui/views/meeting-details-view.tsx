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
      <div>MeetingDetailsView</div>
    </section>
  );
}
