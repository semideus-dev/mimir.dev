"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AgentGetOne } from "@/modules/agents/utils/types";
import CustomAvatar from "@/components/custom/custom-avatar";
import { DownRightIcon, MeetingIcon } from "@/components/icons";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<AgentGetOne>[] = [
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
          <div className="text-muted-foreground hidden max-w-[200px] items-center gap-x-[1px] truncate text-sm md:flex">
            <DownRightIcon />
            <span>{row.original.instructions}</span>
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
        <div className="bg-muted/50 flex w-fit items-center gap-1 rounded-xl p-1 px-3 font-medium">
          <MeetingIcon className="text-primary" width={20} height={20} />
          <span>5</span>
          <span>meetings</span>
        </div>
      </div>
    ),
  },
];
