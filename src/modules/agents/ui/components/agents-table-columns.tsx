"use client";

import type { AgentGetOne } from "@/modules/agents/utils/types";

import { ColumnDef } from "@tanstack/react-table";

import CustomAvatar from "@/components/custom/custom-avatar";

import { DownRightIcon, MeetingIcon } from "@/components/icons";

const AgentsTableColumns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <CustomAvatar
          variant="botttsNeutral"
          seed={row.original.name}
          className="size-11"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{row.original.name}</span>
          <div className="text-muted-foreground hidden items-center gap-x-[1px] md:flex">
            <DownRightIcon />
            <span className="max-w-[200px] truncate text-sm">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meeting Count",
    cell: () => (
      <div className="flex w-full justify-end">
        <div className="border flex w-fit items-center gap-1 rounded-xl p-1 px-3 font-medium">
          <MeetingIcon className="text-primary mr-1" width={20} height={20} />
          <span>5</span>
          <span>meetings</span>
        </div>
      </div>
    ),
  },
];

export default AgentsTableColumns