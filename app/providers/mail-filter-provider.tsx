import { MailFilter } from "@/app/actions/mail/get-filtered-mails";
import { useState } from "react";
import { MailFilterContext } from "@/app/contexts/mail-filter-context";

export function MailFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentFilter, setCurrentFilter] = useState<MailFilter>("inbox");

  return (
    <MailFilterContext.Provider value={{ currentFilter, setCurrentFilter }}>
      {children}
    </MailFilterContext.Provider>
  );
}
