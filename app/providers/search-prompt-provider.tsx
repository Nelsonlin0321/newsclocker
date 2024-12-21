import { useState } from "react";
import { SearchPromptParams } from "../types/prompt-search";
import SearchPromptContext from "../contexts/SearchPromptContext";
export default function SearchPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchPromptParams, setSearchPromptParams] =
    useState<SearchPromptParams>({
      q: "",
      category: "All",
      page: 1,
    });

  return (
    <SearchPromptContext.Provider
      value={{ searchPromptParams, setSearchPromptParams }}
    >
      {children}
    </SearchPromptContext.Provider>
  );
}
