"use client";
import React from "react";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { AgentDetailsHeader } from "@/modules/agents/ui/components/agents-headers";
import CustomAvatar from "@/components/custom/custom-avatar";
import { MeetingIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useConfirmation from "@/hooks/use-confirmation";
import { UpdateAgentDialog } from "@/modules/agents/ui/components/agents-dialogs";

interface AgentDetailsViewProps {
  id: string;
}

export default function AgentDetailsView({ id }: AgentDetailsViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] =
    React.useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirmation(
    "Are you sure?",
    "All meetings and their transcripts will be deleted alongside.",
  );

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: id }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
      },
    }),
  );

  async function handleOnRemove() {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: id });
  }

  return (
    <section className="flex flex-col gap-4">
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <AgentDetailsHeader
        header={data.name}
        agentId={id}
        onEdit={() => setUpdateAgentDialogOpen(true)}
        onRemove={handleOnRemove}
      />
      <div className="bg-card flex flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <CustomAvatar
            variant="botttsNeutral"
            seed={data.name}
            className="size-16"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="text-xl font-semibold">{data.name}</span>
            <div className="flex w-fit items-center gap-1 rounded-xl border p-1 px-3 text-sm font-medium">
              <MeetingIcon
                className="text-primary mr-1"
                width={20}
                height={20}
              />
              <span>5</span>
              <span>meetings</span>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground text-justify italic">
          {data.instructions}
        </div>
      </div>
    </section>
  );
}
