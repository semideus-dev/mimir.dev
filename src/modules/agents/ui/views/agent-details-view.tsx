"use client";
import React from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { AgentDetailsHeader } from "@/modules/agents/ui/components/agents-headers";
import CustomAvatar from "@/components/custom/custom-avatar";
import { MeetingIcon } from "@/components/icons";

interface AgentDetailsViewProps {
  id: string;
}

export default function AgentDetailsView({ id }: AgentDetailsViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: id }),
  );
  return (
    <section className="flex flex-col gap-4">
      <AgentDetailsHeader
        header={data.name}
        agentId={id}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-card flex flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <CustomAvatar
            variant="botttsNeutral"
            seed={data.name}
            className="size-16"
          />
          <div className="flex flex-col gap-1 items-start">
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
        <div className="text-justify text-muted-foreground italic">{data.instructions}</div>
      </div>
    </section>
  );
}
