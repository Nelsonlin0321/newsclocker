"use server";

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export type MailFilter = "inbox" | "starred" | "trash";

export async function getFilteredMails(
  subscriptionId: string,
  filter: MailFilter
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
    where: {
      ...baseWhere,
      ...filterConditions[filter],
    },
    orderBy: { createdAt: "desc" },
  });
}
