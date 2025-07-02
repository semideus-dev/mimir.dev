import { MeetingIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface MeetingsVariantsProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  meetingId: string;
  isUpcoming?: boolean;
  isActive?: boolean;
  onCancel?: () => void;
}

export default function MeetingsVariants({
  icon,
  title,
  description,
  meetingId,
  isUpcoming,
  isActive,
  onCancel,
}: MeetingsVariantsProps) {
  return (
    <div className="bg-card flex flex-col items-center justify-center gap-8 rounded-xl p-4 py-10">
      {icon}
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl font-medium">{title}</span>
        <span className="text-muted-foreground text-center text-sm">
          {description}
        </span>
      </div>
      {isUpcoming && (
        <div className="flex items-center justify-center gap-x-2">
          <Button
            variant="ghost"
            className="rounded-full border font-semibold tracking-wide uppercase"
            size="sm"
            onClick={onCancel}
          >
            Cancel Meeting
          </Button>
          <Button
            asChild
            className="rounded-full border font-semibold tracking-wide uppercase"
            size="sm"
          >
            <Link href={`/call/${meetingId}`}>Start Meeting</Link>
          </Button>
        </div>
      )}
      {isActive && (
        <div className="flex items-center justify-center ">
          
          <Button
            asChild
            className="rounded-full border font-semibold tracking-wide uppercase"
            size="sm"
          >
            <Link href={`/call/${meetingId}`}>Join Meeting</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
