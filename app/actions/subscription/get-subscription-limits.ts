"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { getUserPlanInfo } from "@/app/actions/user/get-user-plan-info";

export type SubscriptionLimits = {
  userPlan: string;
  subscriptionCount: number;
};

export async function getSubscriptionLimits(): Promise<SubscriptionLimits> {
  const { userId } = await auth();

  if (!userId) {
    return {
      userPlan: "free",
      subscriptionCount: 0,
    };
  }

  // Get user's plan
  const userPlanInfo = await getUserPlanInfo({ userId });

  // Get subscription count
  const subscriptionCount = await prisma.newsSubscription.count({
    where: { userId },
  });

  return {
    userPlan: userPlanInfo.plan,
    subscriptionCount,
  };
}
