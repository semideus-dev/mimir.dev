import React from "react";
import { cookies } from "next/headers";

import AppSidebar from "@/components/custom/navigation/app-sidebar";
import Navbar from "@/components/custom/navigation/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex h-screen w-screen flex-col">
        <Navbar />
        <section className="border rounded-tl-2xl p-5 h-full">

        {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
