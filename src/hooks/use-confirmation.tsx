import React from "react";

import CustomDialog from "@/components/custom/custom-dialog";
import { Button } from "@/components/ui/button";

export default function useConfirmation(
  title: string,
  description: string,
): [() => React.JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = React.useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  function confirm() {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(false);
    handleClose();
  }

  function ConfirmationDialog() {
    return (
      <CustomDialog
        title={title}
        description={description}
        open={promise !== null}
        onOpenChange={handleClose}
      >
        <div className="flex items-center justify-end gap-2 pt-4">
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="rounded-xl border font-semibold tracking-wide uppercase"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="rounded-xl border font-semibold tracking-wide uppercase"
            size="sm"
          >
            Confirm
          </Button>
        </div>
      </CustomDialog>
    );
  }

  return [ConfirmationDialog, confirm];
}
