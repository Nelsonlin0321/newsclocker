"use server";

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function getUnreadCount(subscriptionId: string) {
  const { userId } = await auth();
  if (!userId) return 0;

  const subscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
  });

  if (!subscription || subscription.userId !== userId) return 0;

  return prisma.mail.count({
    where: {
      newsSubscriptionId: subscriptionId,
      isRead: false,
      isTrashed: false,
    },
  });
}
