"use client";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useAgentsFilter } from "@/modules/agents/hooks/use-agents-filters";

import { DataTable } from "@/components/custom/data-table";

import AgentsPagination from "@/modules/agents/ui/components/filters/agents-pagination";
import AgentsTableColumns from "@/modules/agents/ui/components/agents-table-columns";

import { useRouter } from "next/navigation";

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFilter();

  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data.items}
        columns={AgentsTableColumns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <AgentsPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
}
