import React from "react";
import type { Metadata } from "next";
import { SignInView } from "@/modules/auth/ui";

export const metadata: Metadata = {
  title: "Mimir - Sign In",
  description: "Sign into you account to use mimir",
};

export default function SignInPage() {
  return <SignInView />;
}
