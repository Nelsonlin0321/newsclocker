import { useState } from "react";
import SearchContext from "@/app/contexts/SearchContext";
import { SearchParams } from "../types/search";

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keywords: "",
    country: "us",
    language: "en",
    dateRange: "past_24_hours",
    enabled: false,
  });

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
}
