"use client";
import React from "react";

import { useAgentsFilter } from "@/modules/agents/hooks/use-agents-filters";

import PageHeader from "@/components/custom/page-header";
import AgentsSearchFilter from "@/modules/agents/ui/components/filters/agents-search-filter";
import { NewAgentDialog } from "@/modules/agents/ui/components/agents-dialogs";

import { Button } from "@/components/ui/button";
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

import { pagination } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AgentHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [filters, setFilters] = useAgentsFilter();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: pagination.defaultPage,
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
        <PageHeader
          header="Your Agents"
          description="Schedule meetings with your own personalized AI bots."
        />
        <Button
          className="border"
          variant="ghost"
          size="lg"
          onClick={() => setIsOpen(true)}
        >
          <AddIcon />
          New Agent
        </Button>
      </div>
      <div className="flex items-center gap-x-1">
        <AgentsSearchFilter />
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
    </section>
  );
}

interface AgentDetailsHeaderProps {
  header: string;
  agentId: string;
  onEdit: () => void;
  onRemove: () => void;
}

export function AgentDetailsHeader({
  header,
  agentId,
  onEdit,
  onRemove,
}: AgentDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-xl font-semibold md:text-3xl"
              href="/agents"
            >
              Your Agents
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
