import { Prompt } from "@prisma/client";

export type PromptSearchResult = {
  cursor: {
    firstBatch: Prompt[];
  };
};
