import { ArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CallEnded() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-fit w-[40%] flex-col items-center justify-center gap-4 rounded-xl border p-4">
        <span className="text-3xl font-medium">Call Ended</span>
        <span className="text-muted-foreground">
          Summary generation has already started.
        </span>
        <Button
          asChild
          size="sm"
          className="rounded-full font-semibold uppercase"
        >
          <Link href="/meetings">
            <ArrowIcon className="rotate-180" />
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
