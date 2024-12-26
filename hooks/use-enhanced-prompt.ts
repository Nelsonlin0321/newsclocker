import { optimizePrompt } from "@/app/actions/ai/optimize-prompt";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";

export function useEnhancePrompt(form: any) {
  const [isLoading, setIsLoading] = useState(false);

  const onEnhancePrompt = async () => {
    setIsLoading(true);
    const content = await optimizePrompt({
      description: form.getValues("newsPrompt"),
      keywords: form.getValues("keywords"),
    });

    let textContent = "";

    for await (const delta of readStreamableValue(content)) {
      textContent = `${textContent}${delta}`;
      form.setValue("newsPrompt", textContent);
    }
    setIsLoading(false);
  };

  return { onEnhancePrompt, isLoading };
}
