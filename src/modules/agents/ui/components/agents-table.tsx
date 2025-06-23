"use client";

import React from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";


export default function AgentsTable() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
