import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function CreateSubscriptionButton() {
  return (
    <Link href="/workspace/news-subscription/new">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        <span className="whitespace-normal text-left">Create</span>
      </Button>
    </Link>
  );
}
