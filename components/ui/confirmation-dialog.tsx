import React from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const ConfirmationDialog = ({
  onCancel,
  onConfirm,
  title,
  subtitle,
  setOpen,
  isOpen,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  subtitle?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>{`${title ?? "Are you sure?"}`}</DialogTitle>
          <DialogDescription>
            {`${subtitle ?? "This action cannot be undone."}`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full self-end gap-2">
          <Button onClick={onConfirm} variant="outline">
            Confirm
          </Button>
          <Button onClick={onCancel} variant="default">
            Cancel
          </Button>
        </div>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default ConfirmationDialog;
