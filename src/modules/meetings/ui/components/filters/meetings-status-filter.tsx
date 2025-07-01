import React from "react";

import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filters";

import CommandSelect from "@/components/ui/command-select";

import { MeetingStatus } from "@/modules/meetings/utils/types";

import {
  CheckIcon,
  ErrorIcon,
  LoadingIcon,
  ScheduleIcon,
  ActiveIcon,
} from "@/components/icons";

const options = [
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ActiveIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ErrorIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoadingIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ScheduleIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
];

export default function MeetingsStatusFilter() {
  const [filters, setFilters] = useMeetingsFilter();
  return (
    <CommandSelect
      options={options}
      placeholder="Status"
      className="h-9"
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  );
}
