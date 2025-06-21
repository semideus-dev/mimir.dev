import React from "react";

interface PageHeaderProps {
  header: string;
  description?: string;
}

export default function PageHeader({ header, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xl font-semibold md:text-3xl">{header}</span>
      <p className="hidden md:flex text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
