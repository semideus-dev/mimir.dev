import {
  AgentsIcon,
  BillingIcon,
  DashboardIcon,
  MeetingIcon,
  SettingsIcon,
} from "@/components/icons";

export const tokenData = {
  expirationTime: Math.floor(Date.now() / 1000) + 3600,
  issuedAt: Math.floor(Date.now() / 1000) - 60,
};

export const generateTokenData = () => {
  const now = Math.floor(Date.now() / 1000);
  return {
    expirationTime: now + 3600,
    issuedAt: now - 60,
  };
};

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
