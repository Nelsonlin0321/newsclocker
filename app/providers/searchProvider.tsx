import { useState } from "react";
import SearchContext from "@/app/contexts/SearchContext";

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useState<{
    keywords: string;
    country: string;
    language: string;
    dateRange: string;
    newsSources?: string[];
  }>({
    keywords: "",
    country: "us",
    language: "en",
    dateRange: "past_24_hours",
  });

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
}
