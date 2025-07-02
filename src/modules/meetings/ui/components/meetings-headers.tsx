"use client";
import React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filters";

import MeetingsAgentFilter from "@/modules/meetings/ui/components/filters/meetings-agent-filter";
import MeetingsStatusFilter from "@/modules/meetings/ui/components/filters/meetings-status-filter";
import MeetingsSearchFilter from "@/modules/meetings/ui/components/filters/meetings-search-filter";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/meetings-dialogs";

import PageHeader from "@/components/custom/page-header";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AddIcon, EditIcon, SettingsIcon, TrashIcon } from "@/components/icons";
import { XIcon } from "lucide-react";

export default function MeetingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [filters, setFilters] = useMeetingsFilter();
  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: "",
      agentId: "",
      status: null,
      page: 1,
    });
  };

  const isMobile = useIsMobile();

  return (
    <section className="mb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <NewMeetingDialog open={isOpen} onOpenChange={setIsOpen} />
        <PageHeader
          header="Your Meetings"
          description="Join a scheduled meeting with your AI."
        />
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full font-semibold tracking-wide uppercase"
          size={isMobile ? "icon" : "default"}
        >
          <AddIcon />
          {!isMobile && "New Meeting"}
        </Button>
      </div>
      <ScrollArea>
        <div className="flex items-center gap-x-1">
          <MeetingsSearchFilter />
          <MeetingsStatusFilter />
          <MeetingsAgentFilter />
          {isAnyFilterModified && (
            <Button
              variant="ghost"
              className="border"
              size="icon"
              onClick={onClearFilters}
            >
              <XIcon />
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

interface MeetingDetailsHeaderProps {
  header: string;
  onEdit: () => void;
  onRemove: () => void;
}

export function MeetingDetailsHeader({
  header,
  onEdit,
  onRemove,
}: MeetingDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-xl font-semibold md:text-3xl"
              href="/meetings"
            >
              Your Meetings
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-semibold md:text-3xl">
              {header}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="border" variant="ghost" size="icon">
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <EditIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
