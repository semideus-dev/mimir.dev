import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AgentsTableLoadingView() {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="size-11 rounded-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="bg-muted h-3 w-20 rounded-2xl" />
          <Skeleton className="bg-muted h-2 w-[200px] rounded-2xl" />
        </div>
      </div>
      <Skeleton className="bg-muted h-5 w-24 rounded-2xl" />
    </div>
  );
}

export function AgentDetailsLoadingView() {
  return (
    <div className="flex flex-col gap-4">
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
              <BreadcrumbPage>
                <Skeleton className="h-4 w-[200px] rounded-xl" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Skeleton className="size-9" />
      </div>
      <Skeleton className="h-[100px] w-full rounded-xl" />
    </div>
  );
}

export function UserButtonLoadingView() {
  return <Skeleton className="size-9 rounded-full" />;
}
