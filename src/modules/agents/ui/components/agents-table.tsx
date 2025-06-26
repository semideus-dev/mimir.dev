"use client";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useAgentsFilter } from "@/modules/agents/hooks/use-agents-filters";
import AgentsSearchFilter from "@/modules/agents/ui/components/agents-search-filter";

import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";
import { pagination } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import AgentsPagination from "./agents-pagination";

export default function AgentsTable() {
  const [filters, setFilters] = useAgentsFilter();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: pagination.defaultPage,
    });
  };

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-x-1">
        <AgentsSearchFilter />
        {isAnyFilterModified && (
          <Button
            variant="ghost"
            className="border"
            size="icon"
            onClick={onClearFilters}
          >
            <XIcon />
          </Button>
        )}
      </div>
      <DataTable data={data.items} columns={columns} />
      <AgentsPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
}
