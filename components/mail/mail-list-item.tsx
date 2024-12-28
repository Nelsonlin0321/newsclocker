import { Mail } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateMailStatus } from "@/app/actions/mail/update-mail-status";
import { toast } from "react-hot-toast";

interface Props {
  mail: Mail;
  isSelected: boolean;
  onSelect: (mail: Mail) => void;
  onRefresh: () => Promise<void>;
}

export function MailListItem({ mail, isSelected, onSelect, onRefresh }: Props) {
  const toggleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateMailStatus(mail.id, { isStarred: !mail.isStarred });
      await onRefresh();
    } catch (error) {
      toast.error("Failed to update mail status");
    }
  };

  return (
    <button
      onClick={async () => {
        if (!mail.isRead) {
          await updateMailStatus(mail.id, { isRead: true });
          await onRefresh();
        }
        onSelect(mail);
      }}
      className={cn(
        "flex flex-col gap-2 p-4 text-left hover:bg-muted/50 border-b min-h-[5rem] relative group",
        isSelected && "bg-muted",
        !mail.isRead && "font-semibold"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm md:text-base">{mail.title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 opacity-0 group-hover:opacity-100",
              mail.isStarred && "opacity-100"
            )}
            onClick={toggleStar}
          >
            <Star
              className={cn(
                "h-4 w-4",
                mail.isStarred && "fill-yellow-400 text-yellow-400"
              )}
            />
          </Button>
          <time className="text-xs md:text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(mail.createdAt), { addSuffix: true })}
          </time>
        </div>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
        {mail.content
          .split(" ")
          .slice(0, 12)
          .join(" ")
          .replace(/[^a-zA-Z0-9\s]/g, "") + "..."}
      </p>
    </button>
  );
}
