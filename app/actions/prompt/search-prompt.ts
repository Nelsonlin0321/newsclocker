"use server";
import { PromptSearchResult } from "@/app/types/prompt-search";
import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs/server";

const limit = 16;

export async function searchAllPrompts(
  q: string,
  category: string | undefined,
  page: number = 1
) {
  try {
    const filters = category
      ? [
          {
            equals: {
              value: true,
              path: "share",
            },
          },
          {
            queryString: {
              query: category,
              defaultPath: "category",
            },
          },
        ]
      : [
          {
            equals: {
              value: true,
              path: "share",
            },
          },
        ];

    const response = (await prisma.$runCommandRaw({
      aggregate: "Prompt",
      pipeline: [
        {
          $search: {
            index: "prompt",
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
          $skip: Math.min((page - 1) * limit, 0),
        },
        {
          $limit: limit,
        },
      ],
      cursor: {},
    })) as PromptSearchResult;

    const searchResult = response.cursor.firstBatch;
    return searchResult;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
