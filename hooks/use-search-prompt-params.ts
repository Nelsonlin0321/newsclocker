import SearchPromptContext from "@/app/contexts/SearchPromptContext";
import { useContext } from "react";

export default function useSearchPromptParams() {
  const context = useContext(SearchPromptContext);
  if (undefined === context) {
    throw new Error(
      "useSearchPromptParams must be used within a useSearchPromptParamsProvider"
    );
  }
  return context;
}
