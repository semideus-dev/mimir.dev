"use client";
import { useRouter } from "next/navigation";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filters";

import { DataTable } from "@/components/custom/data-table";
import MeetingsTableColumns from "@/modules/meetings/ui/components/meetings-table-columns";
import DataPagination from "@/components/ui/data-pagination";

export default function MeetingsView() {
  const [filters, setFilters] = useMeetingsFilter();

  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data.items}
        columns={MeetingsTableColumns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
}
