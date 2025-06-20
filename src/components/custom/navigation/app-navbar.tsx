"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";

import SearchBox from "@/components/custom/navigation/search-box";
import UserButton from "@/components/custom/navigation/user-button";
import { Button } from "@/components/ui/button";
import { SearchIcon, SignOutIcon } from "@/components/icons";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { headerItems, footerItems } from "@/lib/constants";
import Link from "next/link";
import SignOutButton, {
  SignOutDialog,
} from "@/modules/auth/ui/components/sign-out-button";

export default function AppNavbar() {
  const isMobile = useIsMobile();

  const pathname = usePathname();
  const title = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  const navItems = headerItems.concat(footerItems);

  const [commandOpen, setCommandOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  function MobileNav() {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="border">
            {title}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className="m-2 grid grid-cols-3 gap-4">
            {navItems.map((item) => (
              <Link
                className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4"
                href={item.link}
                key={item.link}
              >
                <item.icon />
                <span>{item.title}</span>
              </Link>
            ))}
            <button
              className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4"
              onClick={() => setOpen((open) => !open)}
            >
              <SignOutIcon />
              <span>Sign Out</span>
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <SignOutDialog open={open} setOpen={setOpen} />
      <SearchBox open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex h-[66px] items-center justify-between px-4 md:px-0 md:pr-4">
        <div className="flex items-center gap-2">
          {isMobile ? (
            <MobileNav />
          ) : (
            <Button variant="ghost" className="pointer-events-none border">
              {title}
            </Button>
          )}
          <Button
            className="w-[190px] justify-between border"
            variant="ghost"
            onClick={() => setCommandOpen((open) => !open)}
          >
            <div className="text-muted-foreground flex items-center gap-1">
              <SearchIcon />
              Search
            </div>
            <kbd className="text-muted-foreground flex items-center space-x-[1.5px] font-mono">
              <span>&#8984;</span>
              <span>K</span>
            </kbd>
          </Button>
        </div>
        <UserButton />
      </nav>
    </>
  );
}
