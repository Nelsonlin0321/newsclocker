"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
// import { azureOpenAI } from "@/lib/ai-models";
import { deepSeek } from "@/lib/ai-models";

const getInstruction = ({ keywords }: { keywords: string }) => {
  const template = `

You are a prompt engineer specializing in news search optimization. Given a user's news search query, your task is to:

- Identify the key entities and concepts.
- Generate a list of optimized keywords that are more likely to retrieve relevant news articles.
- The number of keywords is not more than 5 joined by , .

## This is user keywords to optimize: 
${keywords}

## Directly return optimized keywords only without any introducing.
`;

  return template;
};

export const optimizeKeywords = async ({ keywords }: { keywords: string }) => {
  const userContent = getInstruction({ keywords: keywords });
  const stream = createStreamableValue();
  (async () => {
    const { textStream } = await streamText({
      //   model: azureOpenAI("gpt-4o-mini"),
      model: deepSeek("deepseek-chat"),
      // model: vertex("gemini-1.5-pro-002"),
      messages: [{ content: userContent, role: "user" }],
      system:
        "You are professional AI prompt engineer tasked with optimizing keywords for searching news",
    });

    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
  })();

  return stream.value;
};
