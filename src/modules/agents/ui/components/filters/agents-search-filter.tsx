import React from "react";

import { useAgentsFilter } from "@/modules/agents/hooks/use-agents-filters";

import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";

export default function AgentsSearchFilter() {
  const [filters, setFilters] = useAgentsFilter();

  return (
    <div className="relative">
      <Input
        placeholder="Filter agents by name"
        className="h-9 w-[200px] pl-7 text-sm"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
}
