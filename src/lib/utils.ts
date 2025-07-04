import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
