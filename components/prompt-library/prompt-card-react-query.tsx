"use client";

import ReactQueryProvider from "@/app/providers/react-query-provider";
import { Prompt } from "@prisma/client";
import { PromptCard } from "./prompt-card";

interface Props {
  prompt: Prompt;
  isMyPage?: boolean;
  userId: string | null;
}

export function PromptCardReactQuery({ prompt, isMyPage, userId }: Props) {
  return (
    <ReactQueryProvider>
      <PromptCard prompt={prompt} isMyPage={isMyPage} userId={userId} />
    </ReactQueryProvider>
  );
}
