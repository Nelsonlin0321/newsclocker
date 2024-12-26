"use client";
import { Mail, NewsSubscription } from "@prisma/client";
import { MailViewer } from "./mail-viewer";
import { useState } from "react";
import { MailSidebar } from "./mail-sidebar";
import { MailList } from "./main-list";

interface Props {
  subscription: NewsSubscription & {
    Mail: Mail[];
  };
}

export function MailLayout({ subscription }: Props) {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <MailSidebar subscription={subscription} />
      <div className="flex flex-1 overflow-hidden">
        <MailList
          mails={subscription.Mail}
          selectedMail={selectedMail}
          onSelectMail={setSelectedMail}
        />
        {selectedMail && (
          <MailViewer
            mail={selectedMail}
            onClose={() => setSelectedMail(null)}
          />
        )}
      </div>
    </div>
  );
}
