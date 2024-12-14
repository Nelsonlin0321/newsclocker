// Create a new context file: contexts/SearchContext.tsx
import React, { createContext } from "react";

interface SearchContextType {
  searchParams: {
    keywords: string;
    country: string;
    language: string;
    dateRange: string;
    newsSources?: string[];
  };
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      keywords: string;
      country: string;
      language: string;
      dateRange: string;
      newsSources?: string[];
    }>
  >;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
