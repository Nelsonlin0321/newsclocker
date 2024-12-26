"use client";
import { MailFilter } from "@/app/actions/mail/get-filtered-mails";
import { createContext } from "react";

interface MailFilterContextType {
  currentFilter: MailFilter;
  setCurrentFilter: (filter: MailFilter) => void;
}

export const MailFilterContext = createContext<
  MailFilterContextType | undefined
>(undefined);
