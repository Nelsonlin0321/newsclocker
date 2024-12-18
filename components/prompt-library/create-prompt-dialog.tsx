"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PromptForm } from "./prompt-form";
import { Prompt } from "@prisma/client";
// import { CreatePromptForm } from "./create-prompt-form-not-used";
// import { CreatePromptForm } from "./create-prompt-form";

interface CreatePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt?: Prompt;
}

export function CreatePromptDialog({
  open,
  onOpenChange,
  prompt,
}: CreatePromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {prompt ? "Make it your own" : "Create New Prompt"}
          </DialogTitle>
        </DialogHeader>
        <PromptForm
          onSuccess={() => onOpenChange(false)}
          createOrEdit={"create"}
          prompt={prompt}
        />
      </DialogContent>
    </Dialog>
  );
}
