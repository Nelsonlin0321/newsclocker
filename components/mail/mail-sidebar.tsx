import { NewsSubscription } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Archive, Inbox, Star, Trash2, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  subscription: NewsSubscription;
}

export function MailSidebar({ subscription }: Props) {
  return (
    <div className="w-[240px] border-r bg-background p-4 flex flex-col gap-2">
      <Link href="/workspace">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Workspace
        </Button>
      </Link>

      <h2 className="font-semibold text-lg px-2 py-4">{subscription.name}</h2>

      <Button variant="ghost" className="w-full justify-start gap-2">
        <Inbox className="h-4 w-4" />
        Inbox
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Star className="h-4 w-4" />
        Starred
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Archive className="h-4 w-4" />
        Archived
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Trash2 className="h-4 w-4" />
        Trash
      </Button>
    </div>
  );
}
