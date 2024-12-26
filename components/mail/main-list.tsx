import { Mail } from "@prisma/client";
// import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  mails: Mail[];
  selectedMail: Mail | null;
  onSelectMail: (mail: Mail) => void;
}

export function MailList({ mails, selectedMail, onSelectMail }: Props) {
  return (
    <div className="w-[400px] border-r">
      <ScrollArea className="h-full">
        <div className="flex flex-col">
          {mails.map((mail) => (
            <button
              key={mail.id}
              onClick={() => onSelectMail(mail)}
              className={cn(
                "flex flex-col gap-2 p-4 text-left hover:bg-muted/50 border-b",
                selectedMail?.id === mail.id && "bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI News Insights</h3>
                {/* <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(mail.createdAt), {
                    addSuffix: true,
                  })}
                </time> */}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {mail.content}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
