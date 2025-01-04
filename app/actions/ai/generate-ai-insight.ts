"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { deepSeek } from "@/lib/ai-models";
import { NewsSearchResultResponse } from "@/app/types/search";
// import apiClient from "@/app/services/scrape-url-services";
import { scrapeUrls } from "@/app/actions/scrape/scrape-urls";

const getPrompt = async ({
  userPrompt,
  newsResults,
}: {
  userPrompt: string;
  newsResults: NewsSearchResultResponse;
}) => {
  const urls = newsResults.news.map((news) => news.link);

  const contents = await scrapeUrls(urls);

  type Article = {
    title: string;
    snippet: string;
    date: Date;
    content: string;
    link: string;
    position: number;
  };

  const relevantArticles: Article[] = [];

  newsResults.news.forEach((news, index) => {
    const { imageUrl, ...rest } = news;
    relevantArticles.push({ ...rest, content: contents[index] });
  });

  const newArticles = JSON.stringify(relevantArticles);

  // const newsReference = JSON.stringify(
  //   newsResults.news.map((news) => {
  //     return { link: news.link };
  //   })
  // );
  // Cite the reference links from ${newsReference} only with link without their titles at the end of your response.
  const prompt = `
## User Request:
"${userPrompt}"
**Instructions:**

Craft a comprehensive and insightful report, including a concise title, that addresses the user's request by synthesizing information from the provided news articles.
Ensure to incorporate all key aspects and important information presented in the articles.

**Specifically, your response should:**

* **Relevance:** Directly address all key aspects of the user prompt.
* **Completeness:** Do not omit any key aspects or important information found within the provided articles.
* **Highlight**: Highlight key aspects and important information using techniques like bolding, italics, or bullet points.
* **Synthesis:**  Prioritize extracting and combining information from the articles over direct quotations. Reserve quotes for emphasis or essential context.
* **Objectivity**: Present a neutral and objective perspective, acknowledging different viewpoints presented in the articles. Avoid making subjective statements or drawing unsupported conclusions.
* **Clarity**: Maintain a clear and concise writing style, suitable for a general audience.
* **Reference**: Cite Sources When Necessary: If directly quoting from an article or presenting a specific fact, provide appropriate attribution to the source.


## Relevant News Articles in JSON format:
${newArticles}
`.trim();
  return prompt;
};

export const generateAIInsight = async ({
  userPrompt,
  newsResults,
}: {
  userPrompt: string;
  newsResults: NewsSearchResultResponse;
}) => {
  const userContent = await getPrompt({ userPrompt, newsResults });

  const stream = createStreamableValue();
  (async () => {
    const { textStream } = await streamText({
      //   model: azureOpenAI("gpt-4o-mini"),
      model: deepSeek("deepseek-chat"),
      // model: vertex("gemini-1.5-pro-002"),
      messages: [{ content: userContent, role: "user" }],
      system: systemPrompt,
      maxTokens: 8192,
    });

    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
  })();

  return stream.value;
};

const systemPrompt = `You are a helpful and informative AI assistant designed to provide insightful summaries and analyses of news articles. You receive user requests for information and a set of relevant news articles as context. Your goal is to process this information and generate a comprehensive and objective response that satisfies the user's request.

Here's how you should operate:

- Understand the User Request: Carefully analyze the user's prompt to identify the key information they are seeking. Pay attention to keywords, context, and any specific instructions regarding format or length.
- Process the News Articles: Thoroughly read and analyze the provided news articles. Extract key facts, events, perspectives, and any other relevant information that can help address the user's request.
- Synthesize and Summarize: Combine the information from different articles to create a cohesive and comprehensive response. Avoid simply summarizing each article individually. Instead, synthesize the information to provide a holistic view of the topic.
- Maintain Objectivity: Present information neutrally and objectively, acknowledging different viewpoints presented in the articles without expressing personal opinions or biases.
- Focus on Clarity and Conciseness: Use clear and concise language to make your response easily understandable for a general audience. Avoid jargon or technical terms unless necessary and clearly defined.
- Follow Instructions: Adhere to any specific instructions provided in the prompt, such as desired format (summary, comparison, timeline) or length limitations.
- Cite Sources When Necessary: If directly quoting from an article or presenting a specific fact, provide appropriate attribution to the source.
Remember: Your primary goal is to provide users with accurate, informative, and objective insights based on the provided news articles. Avoid making subjective statements, drawing unsupported conclusions, or presenting information not found within the provided context.

`;
