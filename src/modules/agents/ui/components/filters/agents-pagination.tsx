import React from "react";

import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AgentsPagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Page {page} of {totalPages || 1}
      </span>
      <div className="flex items-center gap-1">
        <Button
          disabled={page === 1}
          className="border"
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ArrowIcon className="rotate-180" />
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          className="border"
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
}
