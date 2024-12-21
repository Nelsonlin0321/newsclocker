"use server";
import { PromptSearchResult } from "@/app/types/prompt-search";
import { adminUserIds } from "@/lib/constant";
import prisma from "@/prisma/client";

const limit = 12;

type Props = {
  q?: string;
  userId?: string;
  category: string;
  page: number;
};

export const searchPrompts = async ({ q, userId, category, page }: Props) => {
  if (q) {
    const results = await searchPromptsWithQuery({
      q,
      category,
      page,
      userId,
    });
    return results;
  } else {
    return await searchPromptsWithoutQuery({ category, page, userId });
  }
};

const searchPromptsWithQuery = async ({
  q,
  category,
  page,
  userId,
}: {
  q: string;
  category: string;
  page: number;
  userId?: string;
}) => {
  let filters: any;
  if (!userId) {
    filters = [
      {
        equals: {
          value: true,
          path: "share",
        },
      },
    ];
  }

  if (userId) {
    // if (adminUserIds.includes(userId)) {
    //   filters = [
    //     {
    //       $OR: [
    //         {
    //           equals: {
    //             value: userId,
    //             path: "userId",
    //           },
    //         },
    //         {
    //           equals: {
    //             value: true,
    //             path: "share",
    //           },
    //         },
    //       ],
    //     },
    //   ];
    // } else {
    //   filters = [
    //     {
    //       equals: {
    //         value: userId,
    //         path: "userId",
    //       },
    //     },
    //   ];
    // }
    filters = [
      {
        equals: {
          value: userId,
          path: "userId",
        },
      },
    ];
  }

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

const searchPromptsWithoutQuery = async ({
  category,
  page,
  userId,
}: {
  category: string;
  page: number;
  userId?: string;
}) => {
  let where: any;
  if (userId) {
    if (adminUserIds.includes(userId)) {
      where = {
        OR: [{ userId }, { userId: "public" }],
        category: category === "All" ? undefined : category,
      };
    } else {
      where = {
        userId: userId,
        category: category === "All" ? undefined : category,
      };
    }
    // where = {
    //   userId: userId,
    //   category: category === "All" ? undefined : category,
    // };
  } else {
    where = {
      share: true,
      category: category === "All" ? undefined : category,
    };
  }
  const prompts = await prisma.prompt.findMany({
    where: where,
    skip: (page - 1) * limit,
    take: limit,
  });

  return prompts;
};
