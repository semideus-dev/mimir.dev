import React from "react";
import Link from "next/link";

import { cn, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { MeetingGetOne } from "@/modules/meetings/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ChatIcon,
  ClockIcon,
  ErrorIcon,
  RecordingIcon,
  SummaryIcon,
  TranscriptIcon,
} from "@/components/icons";
import CustomAvatar from "@/components/custom/custom-avatar";
import { format } from "date-fns";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";

interface MeetingsVariantsProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  meetingId: string;
  className?: string;
  isUpcoming?: boolean;
  isActive?: boolean;
  onCancel?: () => void;
}

interface CompletedMeetingVariantProps {
  data: MeetingGetOne;
}

export function MeetingsVariants({
  icon,
  title,
  description,
  meetingId,
  isUpcoming,
  className,
  isActive,
  onCancel,
}: MeetingsVariantsProps) {
  return (
    <div
      className={cn(
        className,
        "bg-card flex flex-col items-center justify-center gap-8 rounded-xl p-4 py-10",
      )}
    >
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
        <div className="flex items-center justify-center">
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

export function CompletedMeetingVariant({
  data,
}: CompletedMeetingVariantProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-xl border px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-start gap-x-4 rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="dark:hover:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:border-b-primary dark:data-[state=active]:text-primary cursor-pointer rounded-none border-x-0 border-t-0 border-b-2"
              >
                <SummaryIcon /> Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="dark:hover:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:border-b-primary dark:data-[state=active]:text-primary cursor-pointer rounded-none border-x-0 border-t-0 border-b-2"
              >
                <TranscriptIcon /> Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="dark:hover:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:border-b-primary dark:data-[state=active]:text-primary cursor-pointer rounded-none border-x-0 border-t-0 border-b-2"
              >
                <RecordingIcon /> Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="dark:hover:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:border-b-primary dark:data-[state=active]:text-primary cursor-pointer rounded-none border-x-0 border-t-0 border-b-2"
              >
                <ChatIcon /> Chat
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="recording">
          <div className="flex flex-col gap-y-2 rounded-lg border px-4 py-5">
            <div className="from-primary/20 via-background to-background border-primary flex flex-col gap-y-2 rounded-lg border bg-gradient-to-r p-4">
              <div className="text-primary flex items-center gap-x-1">
                <ErrorIcon width={30} height={30} />
                <span className="text-xl font-semibold uppercase md:text-2xl">
                  warning
                </span>
              </div>
              <p className="text-justify text-sm md:text-base">
                This recording is temporary and will expire in 14 days starting
                from the day of the meeting.
              </p>
            </div>
            <video
              src={data.recordingUrl!}
              className="w-full rounded-xl"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="flex flex-col gap-y-4 rounded-lg border px-4 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <CustomAvatar
                  seed={data.agent.name}
                  variant="botttsNeutral"
                  className="size-6"
                />
                <Link
                  href={`/agents/${data.agentId}`}
                  className="font-medium underline underline-offset-4 transition-all hover:underline-offset-8"
                >
                  {data.agent.name}
                </Link>
                <span className="text-muted-foreground">
                  {data.startedAt ? `on ${format(data.startedAt, "PPP")}` : ""}
                </span>
              </div>
              <Badge
                variant="outline"
                className="text-muted-foreground hidden items-center gap-x-2 text-base capitalize md:flex [&>svg]:size-4"
              >
                <ClockIcon />
                {data.duration ? formatDuration(data.duration) : "No Duration"}
              </Badge>
            </div>
            <Markdown
              components={{
                h1: (props) => (
                  <h1
                    className="text-primary px-2 my-2 border-b-2 p-1 text-2xl font-medium"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2 className="my-2 text-xl font-medium" {...props} />
                ),
                h3: (props) => (
                  <h3 className="my-2 text-lg font-medium" {...props} />
                ),
                h4: (props) => (
                  <h4 className="my-2 text-base font-medium" {...props} />
                ),
                h5: (props) => (
                  <h5 className="my-2 text-sm font-medium" {...props} />
                ),
                h6: (props) => (
                  <h6 className="my-2 text-xs font-medium" {...props} />
                ),
                p: (props) => (
                  <p className="my-2 text-justify leading-relaxed" {...props} />
                ),
                ul: (props) => (
                  <ul className="my-2 list-inside list-disc" {...props} />
                ),
                ol: (props) => (
                  <ol className="my-2 list-inside list-decimal" {...props} />
                ),
                li: (props) => <li className="mb-1" {...props} />,
                strong: (props) => (
                  <strong className="font-semibold" {...props} />
                ),
                code: (props) => (
                  <code className="bg-muted rounded p-1" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote
                    className="my-4 border-l-4 pl-4 italic"
                    {...props}
                  />
                ),
              }}
            >
              {data.summary}
            </Markdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
