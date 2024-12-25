"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
// import { azureOpenAI } from "@/lib/ai-models";
import { deepSeek } from "@/lib/ai-models";

const getInstruction = ({
  keywords,
  userPrompt,
}: {
  keywords?: string;
  userPrompt: string;
}) => {
  const template = `

You are professional AI prompt engineer tasked with optimizing user prompts for a news analysis platform. 
The platform uses a large language model to generate insights from news articles based on user prompts.
Your goal is to make the user's prompt to be clear, longer, comprehensive and focused on actionable insights.

The user original prompt will be provided. The provided keywords for search the news by the users could be undefined.

Directly return optimized prompt only without any introducing.

Considering the user's intent and the platform's capabilities, provide an improved version of the prompt. Ensure the optimized prompt:
* **Is clear and easy to understand.**
* **Focuses on specific aspects of analysis.**
* **Guides the model towards actionable insights.**
* **Maintains the user's original intent.** 
* **Step by Step instructions**  

**Here's the user's original prompt:**

${userPrompt}

**Here's the user's keywords for searching the news:**
${keywords}

`;

  return template;
};

export const optimizePrompt = async ({
  description,
  keywords,
}: {
  keywords?: string;
  description: string;
}) => {
  const userContent = getInstruction({ userPrompt: description, keywords });
  const stream = createStreamableValue();
  (async () => {
    const { textStream } = await streamText({
      //   model: azureOpenAI("gpt-4o-mini"),
      model: deepSeek("deepseek-chat"),
      // model: vertex("gemini-1.5-pro-002"),
      messages: [{ content: userContent, role: "user" }],
      system:
        "You are professional AI prompt engineer tasked with optimizing user prompts for a news analysis platform.",
    });

    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
  })();

  return stream.value;
};
