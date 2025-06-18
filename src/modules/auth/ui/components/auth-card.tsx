import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <Card className="h-fit w-[90%] md:w-[480px] bg-background">
      <CardHeader>
        <Image src="/assets/mimir-logo.png" alt="logo" width={60} height={60} />
        <CardTitle className="text-3xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
