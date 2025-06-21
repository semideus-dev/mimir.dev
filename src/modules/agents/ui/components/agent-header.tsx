"use client";
import React from "react";

import PageHeader from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/agent-dialogs";

import { AddIcon } from "@/components/icons";

export default function AgentHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
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
  );
}
