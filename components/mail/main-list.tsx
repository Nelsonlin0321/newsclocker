import { Mail } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface Props {
  mails: Mail[];
  selectedMail: Mail | null;
  onSelectMail: (mail: Mail) => void;
  onMenuClick: () => void;
}

export function MailList({
  mails,
  selectedMail,
  onSelectMail,
  onMenuClick,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Mobile header */}
      <div className="flex items-center p-4 border-b md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-4 font-semibold">Inbox</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {mails.map((mail) => (
            <button
              key={mail.id}
              onClick={() => onSelectMail(mail)}
              className={cn(
                "flex flex-col gap-2 p-4 text-left hover:bg-muted/50 border-b min-h-[5rem]",
                selectedMail?.id === mail.id && "bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm md:text-base">
                  AI News Insights
                </h3>
                <time className="text-xs md:text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(mail.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {mail.content}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
