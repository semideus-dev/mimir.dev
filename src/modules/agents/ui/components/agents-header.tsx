"use client";
import React from "react";

import { useAgentsFilter } from "@/modules/agents/hooks/use-agents-filters";

import PageHeader from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/agents-dialogs";

import { AddIcon } from "@/components/icons";
import AgentsSearchFilter from "./agents-search-filter";
import { pagination } from "@/lib/constants";
import { XIcon } from "lucide-react";

export default function AgentHeader() {
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
