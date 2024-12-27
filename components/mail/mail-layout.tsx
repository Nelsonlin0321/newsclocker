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
import { useRouter } from "next/navigation";
import "@/components/news-subscription/ai-insights.css";
interface Props {
  subscription: NewsSubscription & {
    Mail: Mail[];
  };
  initialSelectedMail?: Mail | null;
}

export function MailLayout({ subscription, initialSelectedMail }: Props) {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(
    initialSelectedMail || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const handleSelectMail = (mail: Mail) => {
    setSelectedMail(mail);
    setSidebarOpen(false);
    // Update URL with mailId
    // router.push(`/mail/${subscription.id}/${mail.id}`);
  };

  const handleCloseMail = () => {
    setSelectedMail(null);
    // Remove mailId from URL
    router.push(`/mail/${subscription.id}`);
  };

  return (
    <ReactQueryProvider>
      <MailFilterProvider>
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
          <div
            className={cn(
              "fixed border-r w-[250px] inset-y-0 left-0 z-50 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <MailSidebar
              subscription={subscription}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div
              className={cn(
                "w-full md:w-[300px] border-r",
                isMobile && selectedMail && "hidden"
              )}
            >
              <MailList
                subscriptionId={subscription.id}
                selectedMail={selectedMail}
                onSelectMail={handleSelectMail}
                onMenuClick={() => setSidebarOpen(true)}
              />
            </div>

            {selectedMail && (
              <div
                className={cn(
                  "flex-1",
                  isMobile && "fixed inset-0 z-50 bg-background"
                )}
              >
                <MailViewer
                  mail={selectedMail}
                  onClose={handleCloseMail}
                  isMobile={isMobile}
                />
              </div>
            )}
          </div>

          {sidebarOpen && (
            <button
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          )}
        </div>
      </MailFilterProvider>
    </ReactQueryProvider>
  );
}
