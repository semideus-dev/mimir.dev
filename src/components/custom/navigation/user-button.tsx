"use client";

import React from "react";

import { authClient } from "@/lib/auth-client";

import CustomAvatar from "@/components/custom/custom-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserButtonLoadingView } from "@/components/custom/loading-views";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UserButton() {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return <UserButtonLoadingView />;
  }
  return (
    <Button variant="ghost" size="icon">
      {data.user.image ? (
        <Image
          src={data.user.image}
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
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
