import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SignUpView } from "@/modules/auth/ui";

export const metadata: Metadata = {
  title: "Mimir - Sign Up",
  description: "Create an account to use mimir",
};

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/dashboard");
  }
  return <SignUpView />;
}
