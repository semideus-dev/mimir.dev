import React from "react";
import { ErrorIcon } from "@/components/icons";

export function AgentsTableErrorView() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <ErrorIcon width={60} height={60} className="text-rose-400" />
      <span className="text-2xl font-semibold">Something went wrong!</span>
      <p className="text-sm">Unable to load agents at this moment.</p>
    </div>
  );
}
