"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditPromptDialog } from "./edit-prompt-dialog";
import { Prompt } from "@prisma/client";

type Props = {
  prompt: Prompt;
};

export function EditPromptButton({ prompt }: Props) {
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
        <Edit className="h-4 w-4" />
      </Button>

      {/* </Button> */}
      <EditPromptDialog open={open} onOpenChange={setOpen} prompt={prompt} />
    </>
  );
}
