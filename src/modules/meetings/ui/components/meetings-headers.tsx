import PageHeader from "@/components/custom/page-header";
import { AddIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

export default function MeetingHeader() {
  return (
    <div className="flex items-center justify-between">
      <PageHeader
        header="Meetings"
        description="Join a scheduled meeting with your AI."
      />
      <Button className="rounded-full font-semibold tracking-wide uppercase">
        {/* <AddIcon /> */}
        New Meeting
      </Button>
    </div>
  );
}
