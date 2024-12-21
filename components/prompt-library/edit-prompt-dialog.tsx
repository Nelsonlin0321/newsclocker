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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt;
}

export function EditPromptDialog({ open, onOpenChange, prompt }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Prompt</DialogTitle>
        </DialogHeader>
        <PromptForm
          onSuccess={() => onOpenChange(false)}
          createOrEdit={"edit"}
          prompt={prompt}
        />
      </DialogContent>
    </Dialog>
  );
}
