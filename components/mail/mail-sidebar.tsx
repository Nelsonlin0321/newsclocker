"use client";
import { NewsSubscription } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Inbox, Star, Trash2, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { MailFilter } from "@/app/actions/mail/get-filtered-mails";
import { useMailList } from "./use-mail-list";
import { cn } from "@/lib/utils";

interface Props {
  subscription: NewsSubscription;
  onClose: () => void;
}

export function MailSidebar({ subscription, onClose }: Props) {
  const { currentFilter, setCurrentFilter } = useMailList(subscription.id);

  const filterButtons: {
    label: string;
    filter: MailFilter;
    icon: React.ReactNode;
  }[] = [
    { label: "Inbox", filter: "inbox", icon: <Inbox className="h-4 w-4" /> },
    { label: "Starred", filter: "starred", icon: <Star className="h-4 w-4" /> },
    { label: "Trash", filter: "trash", icon: <Trash2 className="h-4 w-4" /> },
  ];

  return (
    <div className="w-[240px] border-r bg-background p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <Link href="/workspace">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="font-semibold text-lg px-2 py-4">{subscription.name}</h2>

      {filterButtons.map(({ label, filter, icon }) => (
        <Button
          key={filter}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            currentFilter === filter && "bg-muted"
          )}
          onClick={() => setCurrentFilter(filter)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
}
