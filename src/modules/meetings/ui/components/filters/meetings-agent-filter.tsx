"use client";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filters";

import CommandSelect from "@/components/ui/command-select";
import CustomAvatar from "@/components/custom/custom-avatar";

export default function MeetingsAgentFilter() {
  const [filters, setFilters] = useMeetingsFilter();

  const [agentSearch, setAgentSearch] = React.useState("");

  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );
  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <CustomAvatar
              variant="botttsNeutral"
              seed={agent.name}
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
}
