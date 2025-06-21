import { AddIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-semibold">Your Agents</span>
        <p className="text-muted-foreground text-sm">Schedule meetings with your own personalized AI bots.</p>
      </div>
      <Button variant="ghost" className="border" size="lg">
        <AddIcon />
        New Agent
      </Button>
    </div>
  );
}
