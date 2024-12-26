import { Mail } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MailListItem } from "./mail-list-item";
import { useMailList } from "./use-mail-list";
import { Skeleton } from "../ui/skeleton";

interface Props {
  subscriptionId: string;
  selectedMail: Mail | null;
  onSelectMail: (mail: Mail) => void;
  onMenuClick: () => void;
}

export function MailList({
  subscriptionId,
  selectedMail,
  onSelectMail,
  onMenuClick,
}: Props) {
  const { mails, isLoading, refreshMails } = useMailList(subscriptionId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-4 font-semibold">Inbox</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {mails.length === 0 ? (
            <p className="text-center text-muted-foreground p-4">
              No messages found
            </p>
          ) : (
            mails.map((mail) => (
              <MailListItem
                key={mail.id}
                mail={mail}
                isSelected={selectedMail?.id === mail.id}
                onSelect={onSelectMail}
                onRefresh={refreshMails}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
