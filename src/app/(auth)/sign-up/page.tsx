import React from "react";
import type { Metadata } from "next";
import { SignUpView } from "@/modules/auth/ui";

export const metadata: Metadata = {
  title: "Mimir - Sign Up",
  description: "Create an account to use mimir",
};

export default function SignUpPage() {
  return <SignUpView />;
}
