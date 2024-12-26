import { optimizeKeywords } from "@/app/actions/ai/optimize-keywords";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";

export function useEnhanceKeywords(form: any, field: string) {
  const [isLoading, setIsLoading] = useState(false);

  const onEnhanceKeywords = async () => {
    setIsLoading(true);
    const content = await optimizeKeywords({
      keywords: form.getValues(field),
    });

    let textContent = "";

    for await (const delta of readStreamableValue(content)) {
      textContent = `${textContent}${delta}`;
      form.setValue(field, textContent);
    }
    setIsLoading(false);
  };

  return { onEnhanceKeywords, isLoading };
}
