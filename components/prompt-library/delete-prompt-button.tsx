"use client";

import { Button } from "@/components/ui/button";
import { Prompt } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { DeletePromptDialog } from "./delete-prompt-dialog";

type Props = {
  prompt: Prompt;
};

export function DeletePromptButton({ prompt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setOpen(true)} className="gap-2"> */}
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4 text-red-400" />
      </Button>
      <DeletePromptDialog open={open} onOpenChange={setOpen} prompt={prompt} />
    </>
  );
}
