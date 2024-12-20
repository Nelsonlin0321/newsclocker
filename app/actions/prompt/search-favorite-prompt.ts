"use server";

import { PromptSearchResult } from "@/app/types/prompt-search";
import prisma from "@/prisma/client";
import { Prompt } from "@prisma/client";

const limit = 12;

export const searchFavoritePrompts = async ({
  userId,
  q,
  category,
  page,
}: {
  userId: string;
  q?: string;
  category: string;
  page: number;
}) => {
  if (q) {
    return await searchFavoritePromptsWithQuery({ userId, q, category, page });
  }
  return await searchFavoritePromptsWithoutQuery({ userId, category, page });
};

const searchFavoritePromptsWithoutQuery = async ({
  userId,
  category,
  page,
}: {
  userId: string;
  category: string;
  page: number;
}) => {
  const favoritePrompts = await prisma.favoritePrompt.findMany({
    where: { userId },
  });

  const promptIds = favoritePrompts.map((p) => p.promptId);

  const prompts = await prisma.prompt.findMany({
    where: {
      id: { in: promptIds },
      category: category === "All" ? undefined : category,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return prompts;
};

const searchFavoritePromptsWithQuery = async ({
  userId,
  q,
  category,
  page,
}: {
  userId: string;
  q: string;
  category: string;
  page: number;
}) => {
  const favoritePrompts = await prisma.favoritePrompt.findMany({
    where: { userId },
  });

  if (!favoritePrompts) {
    return [] as Prompt[];
  }

  const promptIds = favoritePrompts.map((p) => p.promptId);

  // const promptIdFilters =
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
    { $match: { _id: { $in: promptIds } } },
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
  console.log(JSON.stringify(pipeline));
  const response = (await prisma.$runCommandRaw(command)) as PromptSearchResult;
  const searchResult = response.cursor.firstBatch;
  return searchResult;
};
