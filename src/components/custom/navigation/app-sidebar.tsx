import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AgentsIcon,
  BillingIcon,
  DashboardIcon,
  MeetingIcon,
  SettingsIcon,
  SignOutIcon,
} from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const headerItems = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Agents",
    link: "/agents",
    icon: AgentsIcon,
  },
  {
    title: "Meetings",
    link: "/meetings",
    icon: MeetingIcon,
  },
  {
    title: "Billing",
    link: "/billing",
    icon: BillingIcon,
  },
];

const footerItems = [
  {
    title: "Settings",
    link: "/settings",
    icon: SettingsIcon,
  },
  {
    title: "Sign Out",
    link: "#",
    icon: SignOutIcon,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="items-center">
        <Image src="/assets/mimir-logo.png" alt="logo" width={45} height={45} />
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col items-center gap-10">
              {headerItems.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  className="hover:bg-muted/80 rounded-xl p-2"
                >
                  <item.icon />
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col items-center gap-10">
              {footerItems.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  className="hover:bg-muted/80 rounded-xl p-2"
                >
                  <item.icon />
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
