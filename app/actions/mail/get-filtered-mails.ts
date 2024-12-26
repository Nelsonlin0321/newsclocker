"use server";

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export type MailFilter = "inbox" | "starred" | "trash";

const ITEMS_PER_PAGE = 10;

export async function getFilteredMails(
  subscriptionId: string,
  filter: MailFilter,
  page: number = 1
) {
  const { userId } = await auth();
  if (!userId) return [];

  const subscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
  });

  if (!subscription || subscription.userId !== userId) return [];

  const baseWhere = { newsSubscriptionId: subscriptionId };

  const filterConditions = {
    inbox: { isTrashed: false },
    starred: { isStarred: true, isTrashed: false },
    trash: { isTrashed: true },
  };

  return prisma.mail.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    where: {
      ...baseWhere,
      ...filterConditions[filter],
    },
    orderBy: { createdAt: "desc" },
  });
}
