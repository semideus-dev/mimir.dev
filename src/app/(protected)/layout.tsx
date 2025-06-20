import React from "react";
import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/navigation/app-sidebar";
import AppNavbar from "@/components/custom/navigation/app-navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex h-screen w-screen flex-col">
        <AppNavbar />
        <section className="h-full border p-5 md:rounded-tl-2xl">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
