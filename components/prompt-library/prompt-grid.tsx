// "use client";
import React from "react";
import { Prompt } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { PromptCardReactQuery } from "./prompt-card-react-query";
// import ReactQueryProvider from "@/app/providers/react-query-provider";

type Props = {
  prompts: Prompt[];
  isMyPage?: boolean;
};

const PromptGrid = async ({ prompts, isMyPage }: Props) => {
  const { userId } = await auth();
  return (
    // <ReactQueryProvider>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {prompts.map((prompt) => (
        <PromptCardReactQuery
          key={prompt.id}
          prompt={prompt}
          isMyPage={isMyPage}
          userId={userId}
        />
      ))}
    </div>
    // </ReactQueryProvider>
  );
};

export default PromptGrid;
