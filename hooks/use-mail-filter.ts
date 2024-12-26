import { MailFilterContext } from "@/app/contexts/mail-filter-context";
import { useContext } from "react";

export function useMailFilter() {
  const context = useContext(MailFilterContext);
  if (!context) {
    throw new Error("useMailFilter must be used within MailFilterProvider");
  }
  return context;
}
