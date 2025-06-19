"use client";

import React from "react";

import { authClient } from "@/lib/auth-client";

import CustomAvatar from "@/components/custom/custom-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserButtonLoadingView } from "@/components/custom/loading-views";
import { Button } from "@/components/ui/button";

export default function UserButton() {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return <UserButtonLoadingView />;
  }
  return (
    <Button variant="ghost" size="icon">
      {data.user.image ? (
        <Avatar>
          <AvatarImage src={data.user.image} />
        </Avatar>
      ) : (
        <CustomAvatar
          seed={data.user.name}
          variant="initials"
          className="size-10"
        />
      )}
    </Button>
  );
}
