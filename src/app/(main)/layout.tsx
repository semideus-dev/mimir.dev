import React from "react";
import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/navigation/app-sidebar";
import AppNavbar from "@/components/custom/navigation/app-navbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex h-full w-full flex-col">
        <AppNavbar />
        <section className="h-screen border p-5 md:rounded-tl-2xl">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
