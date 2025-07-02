"use client";

import type { MeetingGetMany } from "@/modules/meetings/utils/types";

import { ColumnDef } from "@tanstack/react-table";

import humanizeDuration from "humanize-duration";

import CustomAvatar from "@/components/custom/custom-avatar";

import {
  CheckIcon,
  DownRightIcon,
  ErrorIcon,
  LoadingIcon,
  ScheduleIcon,
  ActiveIcon,
  ClockIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ScheduleIcon,
  active: ActiveIcon,
  completed: CheckIcon,
  processing: LoadingIcon,
  cancelled: ErrorIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/10 text-yellow-500 border-yellow-500",
  active: "bg-primary/10 text-primary border-primary",
  completed: "bg-green-500/10 text-green-500 border-green-500",
  processing: "bg-zinc-500/10 text-zinc-500 border-zinc-500",
  cancelled: "bg-rose-500/10 text-rose-500 border-rose-500",
};

const MeetingsTableColumns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <CustomAvatar
          variant="botttsNeutral"
          seed={row.original.agent.name}
          className="size-11"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{row.original.name}</span>
          <div className="text-muted-foreground items-center gap-x-[1px] flex">
            <DownRightIcon />
            <span className="max-w-[200px] text-sm">
              {row.original.agent.name}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];
      return (
        <div className="hidden items-center justify-end gap-x-1 md:flex">
          <Badge
            variant="outline"
            className={cn(
              "text-base capitalize [&>svg]:size-4",
              statusColorMap[
                row.original.status as keyof typeof statusColorMap
              ],
            )}
          >
            <Icon
              className={cn(
                row.original.status === "processing" && "animate-spin",
              )}
            />
            {row.original.status}
          </Badge>
          <Badge
            variant="outline"
            className="text-muted-foreground flex items-center gap-x-2 text-base capitalize [&>svg]:size-4"
          >
            <ClockIcon  />
            {row.original.duration
              ? formatDuration(row.original.duration)
              : "No Duration"}
          </Badge>
        </div>
      );
    },
  },
];

export default MeetingsTableColumns;
