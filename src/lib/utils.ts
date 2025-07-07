import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import humanizeDuration from "humanize-duration";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPageTitle = (pathname: string): string => {
  // Remove leading/trailing slashes and split into segments
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  if (segments.length === 0 || segments[0] === "") {
    return "Home"; // Default title for root path
  }
  const baseSegment = segments[0].toLowerCase();

  // Return mapped title or generate from path
  return baseSegment.charAt(0).toUpperCase() + baseSegment.slice(1);
};

export function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}