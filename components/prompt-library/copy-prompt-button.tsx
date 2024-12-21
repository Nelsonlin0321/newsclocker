"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreatePromptDialog } from "./create-prompt-dialog";
import { Prompt } from "@prisma/client";

type Props = {
  prompt: Prompt;
};

export function CopyPromptButton({ prompt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        // className=""
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity gap-2"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <CreatePromptDialog open={open} onOpenChange={setOpen} prompt={prompt} />
    </>
  );
}
