import {
  AgentsIcon,
  BillingIcon,
  DashboardIcon,
  MeetingIcon,
  SettingsIcon,
} from "@/components/icons";

export const pagination = {
  defaultPage: 1,
  defaultPageSize: 10,
  minPageSize: 1,
  maxPageSize: 100,
};

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
