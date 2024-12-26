"use client";
import { Mail, NewsSubscription } from "@prisma/client";
import { MailSidebar } from "./mail-sidebar";
import { MailViewer } from "./mail-viewer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MailList } from "./main-list";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import { MailFilterProvider } from "@/app/providers/mail-filter-provider";

interface Props {
  subscription: NewsSubscription & {
    Mail: Mail[];
  };
}

export function MailLayout({ subscription }: Props) {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <ReactQueryProvider>
      <MailFilterProvider>
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
          {/* Sidebar - hidden on mobile unless opened */}
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-72 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <MailSidebar
              subscription={subscription}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main content area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Mail list - conditionally shown based on selection on mobile */}
            <div
              className={cn(
                "w-full md:w-[400px] border-r",
                isMobile && selectedMail && "hidden"
              )}
            >
              <MailList
                // mails={subscription.Mail}
                subscriptionId={subscription.id}
                selectedMail={selectedMail}
                onSelectMail={(mail: Mail) => {
                  setSelectedMail(mail);
                  setSidebarOpen(false);
                }}
                onMenuClick={() => setSidebarOpen(true)}
              />
            </div>

            {/* Mail viewer - full screen on mobile when mail is selected */}
            {selectedMail && (
              <div
                className={cn(
                  "flex-1",
                  isMobile && "fixed inset-0 z-50 bg-background"
                )}
              >
                <MailViewer
                  mail={selectedMail}
                  onClose={() => setSelectedMail(null)}
                  isMobile={isMobile}
                />
              </div>
            )}
          </div>

          {sidebarOpen && (
            <button
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar" // Add an aria-label for accessibility
            />
          )}
        </div>
      </MailFilterProvider>
    </ReactQueryProvider>
  );
}
