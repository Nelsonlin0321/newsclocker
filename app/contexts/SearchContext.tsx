// Create a new context file: contexts/SearchContext.tsx
import React, { createContext } from "react";
import { SearchParams } from "@/app/types/search";

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
