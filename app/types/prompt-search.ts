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
  userId?: string;
};

export type SearchAllPromptParams = {
  q?: string;
  userId?: string;
  category: string;
  page: number;
  tab: "public" | "my" | "favorite";
};
