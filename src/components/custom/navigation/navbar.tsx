"use client";

import React from "react";
import UserButton from "@/components/custom/navigation/user-button";
import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const title = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
  return (
    <nav className="flex h-[66px] items-center justify-between pr-4">
      <Button variant="ghost" className="border">
        {title}
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="border">
          <SearchIcon />
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
