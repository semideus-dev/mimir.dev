"use client";
import React from "react";

import { NewMeetingDialog } from "@/modules/meetings/ui/components/meetings-dialogs";

import PageHeader from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";

import { AddIcon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MeetingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const isMobile = useIsMobile();

  return (
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
  );
}
