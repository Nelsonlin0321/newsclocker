"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreatePromptDialog } from "./create-prompt-dialog";

export function CreatePromptButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Prompt
      </Button>
      <CreatePromptDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
