// ... existing imports ...
import { deletePrompt } from "@/app/actions/prompt/delete-prompt";
import { Button } from "@/components/ui/button"; // Importing Button component for UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Prompt } from "@prisma/client";
import { useRouter } from "next/navigation";
import Spinner from "../spinner";
import { useState } from "react";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt;
}

export function DeletePromptDialog({ open, onOpenChange, prompt }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deletePrompt(prompt.id); // Call the deletePrompt action
    router.refresh();
    setLoading(false);
    onOpenChange(false); // Close the dialog after deletion
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Prompt</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this prompt?
        </DialogDescription>

        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={loading}
            // className=" bg-red-500 hover:bg-red-700"
          >
            {loading ? <Spinner /> : "Yes, Delete"}
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ... existing code ...