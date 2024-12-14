import SearchContext from "@/app/contexts/SearchContext";
import { useContext } from "react";

export default function useSearchParams() {
  const context = useContext(SearchContext);
  if (undefined === context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
