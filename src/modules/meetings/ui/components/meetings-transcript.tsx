"use client";

import React from "react";
import Highlighter from "react-highlight-words";
import { format } from "date-fns";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

interface MeetingsTranscriptProps {
  meetingId: string;
}

export default function MeetingsTranscript({
  meetingId,
}: MeetingsTranscriptProps) {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId }),
  );

  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="flex flex-col gap-y-4 rounded-lg border px-4 py-5">
      <p className="text-xl">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="h-9 w-[180px] pl-7 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
      </div>
      <ScrollArea className="h-[500px]">
        <div className="flex flex-col gap-y-4">
          {filteredData.map((data) => {
            return (
              <div
                key={data.start_ts}
                className="flex flex-col gap-y-2 rounded-lg border p-2"
              >
                <div className="flex items-center gap-x-2">
                  <Avatar className="size-6">
                    <AvatarImage
                      alt="user"
                      src={
                        data.user.image ??
                        generateAvatarUri({
                          seed: data.user.name,
                          variant: "initials",
                        })
                      }
                    />
                  </Avatar>
                  <div className="text-muted-foreground flex items-center gap-x-1 text-sm tracking-tight">
                    <span>{data.user.name}</span>
                    <span>at</span>
                    <span>
                      (
                      {format(
                        new Date(0, 0, 0, 0, 0, 0, data.start_ts),
                        "mm:ss",
                      )}
                      )
                    </span>
                    <span>seconds</span>
                  </div>
                </div>
                  <Highlighter
                    highlightClassName="text-background bg-primary px-1 rounded"
                    searchWords={[searchQuery]}
                    autoEscape
                    textToHighlight={data.text}
                  />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
