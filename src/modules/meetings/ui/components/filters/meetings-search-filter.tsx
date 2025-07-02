import React from "react";

import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filters";

import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";

export default function MeetingsSearchFilter() {
  const [filters, setFilters] = useMeetingsFilter();

  return (
    <div className="relative">
      <Input
        placeholder="Search by name"
        className="h-9 w-[180px] pl-7 text-sm"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
}
