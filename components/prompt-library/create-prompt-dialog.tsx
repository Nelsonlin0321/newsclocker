"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatePromptForm } from "./create-prompt-form";
// import { CreatePromptForm } from "./create-prompt-form";

interface CreatePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePromptDialog({
  open,
  onOpenChange,
}: CreatePromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
        </DialogHeader>
        <CreatePromptForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
