import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export function AgentsGridLoadingView() {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      <Skeleton className="bg-muted h-[200px] w-full rounded-xl" />
      <Skeleton className="bg-muted h-[200px] w-full rounded-xl" />
      <Skeleton className="bg-muted h-[200px] w-full rounded-xl" />
    </div>
  );
}

export function UserButtonLoadingView() {
  return <Skeleton className="size-9 rounded-full" />;
}
