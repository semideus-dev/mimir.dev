import React from "react";
import type { Metadata } from "next";
import AgentsView from "@/modules/agents/ui";

export const metadata: Metadata = {
  title: "Mimir - Agents",
  description: "The modern way of learning.",
};

export default function AgentsPage() {
  return <AgentsView />;
}
