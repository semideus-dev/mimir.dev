import React from "react";

import CustomDialog from "@/components/custom/custom-dialog";
import AgentForm from "@/modules/agents/ui/components/agents-form";
import type { AgentGetOne } from "@/modules/agents/utils/types";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export function NewAgentDialog({ open, onOpenChange }: NewAgentDialogProps) {
  return (
    <CustomDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </CustomDialog>
  );
}

export function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) {
  return (
    <CustomDialog
      title="Update Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </CustomDialog>
  );
}
