"use client";

import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { authClient } from "@/lib/auth-client";
import { DashboardLoadingView } from "@/components/custom/loading-views";
import { Badge } from "@/components/ui/badge";
import { CreditIcon } from "@/components/icons";

export default function DashboardHeader() {
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return <DashboardLoadingView />;
  }
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dashboard"
              className="text-xl font-semibold md:text-3xl"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-semibold md:text-3xl">
              {data?.user.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Badge
        variant="outline"
        className="text-muted-foreground hidden text-base md:flex [&>svg]:size-4"
      >
        <CreditIcon />
        <span>3 Credits</span>
      </Badge>
    </div>
  );
}
