import {
  AgentsIcon,
  BillingIcon,
  DashboardIcon,
  MeetingIcon,
  SettingsIcon,
  SignOutIcon,
} from "@/components/icons";

export const headerItems = [
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

export const footerItems = [
  {
    title: "Settings",
    link: "/settings",
    icon: SettingsIcon,
  },
];
