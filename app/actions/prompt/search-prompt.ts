"use server";
import { PromptSearchResult } from "@/app/types/prompt-search";
import { adminUserIds } from "@/lib/constant";
import prisma from "@/prisma/client";
import { addFields, lg0Match, project, should } from "./utils";

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
  let filters: any[] = [];

  if (category !== "All") {
    filters.push({
      queryString: {
        query: category,
        defaultPath: "category",
      },
    });
  }

  let pipeline: any[] = [];
  if (userId) {
    if (adminUserIds.includes(userId)) {
      pipeline = [
        {
          $search: {
            index: "Prompt",
            compound: {
              filter: filters,
              should: should(q),
            },
          },
        },
        {
          $addFields: addFields,
        },
        {
          $match: lg0Match,
        },
        {
          $match: lg0Match,
        },
        {
          $match: {
            $or: [{ userId: userId }, { userId: "public" }],
          },
        },
        {
          $project: project,
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ];
    } else {
      pipeline = [
        {
          $search: {
            index: "Prompt",
            compound: {
              filter: filters,
              should: should(q),
            },
          },
        },
        {
          $addFields: addFields,
        },
        {
          $match: lg0Match,
        },
        {
          $match: lg0Match,
        },
        {
          $match: { userId: userId },
        },
        {
          $project: project,
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ];
    }
  } else {
    pipeline = [
      {
        $search: {
          index: "Prompt",
          compound: {
            filter: filters,
            should: should(q),
          },
        },
      },
      {
        $addFields: addFields,
      },
      {
        $match: lg0Match,
      },
      {
        $match: lg0Match,
      },
      {
        $match: { userId: "public" },
      },
      {
        $project: project,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];
  }

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
