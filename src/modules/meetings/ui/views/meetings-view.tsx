"use client";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/custom/data-table";
import MeetingsTableColumns from "@/modules/meetings/ui/components/meetings-table-columns";

export default function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div>
      <DataTable data={data.items} columns={MeetingsTableColumns} />
    </div>
  );
}
