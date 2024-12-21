// Create a new context file: contexts/SearchContext.tsx
import React, { createContext } from "react";
import { SearchPromptParams } from "@/app/types/prompt-search";

interface SearchPromptContextType {
  searchPromptParams: SearchPromptParams;
  setSearchPromptParams: React.Dispatch<
    React.SetStateAction<SearchPromptParams>
  >;
}

const SearchPromptContext = createContext<SearchPromptContextType | undefined>(
  undefined
);

export default SearchPromptContext;
