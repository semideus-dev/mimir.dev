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
  active: LoadingIcon,
  completed: CheckIcon,
  processing: LoadingIcon,
  cancelled: ErrorIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-400/10 text-yellow-600 border-yellow-600",
  active: "bg-primary/20 text-primary border-primary/5",
  completed: "bg-green-500/20 text-green-800 border-green-800/5",
  processing: "bg-zinc-500/20 text-zinv-800 border-zinv-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
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
          <div className="text-muted-foreground hidden items-center gap-x-[1px] md:flex">
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
        <div className="flex items-center justify-end gap-x-1">
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
                "text-lg",
                row.original.status === "processing" && "animate-spin",
              )}
            />
            {row.original.status}
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 text-base capitalize [&>svg]:size-4"
          >
            <ClockIcon className="text-primary" />
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
