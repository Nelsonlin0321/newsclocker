import { Prompt } from "@prisma/client";

export type PromptSearchResult = {
  cursor: {
    firstBatch: Prompt[];
  };
};

export type SearchPromptParams = {
  q?: string;
  category: string;
  page: number;
};
