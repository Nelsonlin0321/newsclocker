"use server";
import { PromptSearchResult } from "@/app/types/prompt-search";
import prisma from "@/prisma/client";

const limit = 16;

const searchPublicPromptsWithQuery = async ({
  q,
  category,
  page,
}: {
  q: string;
  category: string;
  page: number;
}) => {
  const filters: any = [
    {
      equals: {
        value: true,
        path: "share",
      },
    },
  ];

  if (category !== "All") {
    filters.push({
      queryString: {
        query: category,
        defaultPath: "category",
      },
    });
  }

  const pipeline = [
    {
      $search: {
        index: "Prompt",
        compound: {
          filter: filters,
          should: [
            {
              text: {
                query: q,
                path: {
                  wildcard: "*",
                },
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 3,
                },
              },
            },
          ],
        },
      },
    },
    {
      $addFields: {
        score: {
          $meta: "searchScore",
        },
      },
    },
    {
      $match: {
        score: { $gt: 0 },
      },
    },
    {
      $project: {
        id: "$_id",
        title: 1,
        description: 1,
        category: 1,
        icon: 1,
        userId: 1,
        shared: 1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ];
  const command = {
    aggregate: "Prompt",
    pipeline: pipeline,
    cursor: {},
  };
  // console.log(JSON.stringify(pipeline));
  const response = (await prisma.$runCommandRaw(command)) as PromptSearchResult;
  const searchResult = response.cursor.firstBatch;
  return searchResult;
};

const searchPublicPromptsWithoutQuery = async ({
  category,
  page,
}: {
  category: string;
  page: number;
}) => {
  const prompts = await prisma.prompt.findMany({
    where: { share: true, category: category === "All" ? undefined : category },
    skip: (page - 1) * limit,
    take: limit,
  });

  return prompts;
};

export const searchPublicPrompts = async ({
  q,
  category,
  page,
}: {
  q?: string;
  category: string;
  page: number;
}) => {
  if (q) {
    const results = await searchPublicPromptsWithQuery({ q, category, page });
    return results;
  } else {
    return await searchPublicPromptsWithoutQuery({ category, page });
  }
};
