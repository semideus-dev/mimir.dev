"use client";
import React from "react";

import CustomDialog from "@/components/custom/custom-dialog";
import MeetingForm from "@/modules/meetings/ui/components/meetings-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewMeetingDialog({
  open,
  onOpenChange,
}: NewMeetingDialogProps) {
  const router = useRouter();
  return (
    <CustomDialog
      title="New Meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </CustomDialog>
  );
}
