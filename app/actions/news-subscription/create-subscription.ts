"use server";

import prisma from "@/prisma/client";
import { CreateNewsSubscriptionForm } from "../../types/subscription";
import { auth } from "@clerk/nextjs/server";
import { getUTCNextRunTime } from "@/lib/utils";
import { ActionResponse } from "@/app/types";
import { getUserPlanInfo } from "../user/get-user-plan-info";

export async function createNewsSubscription(
  data: CreateNewsSubscriptionForm
): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId || userId !== data.userId) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }

  // Check user's plan and subscription count
  const userPlanInfo = await getUserPlanInfo({ userId });
  const subscriptionCount = await prisma.newsSubscription.count({
    where: { userId },
  });

  // Free users are limited to 1 subscription
  if (userPlanInfo.plan === "free" && subscriptionCount >= 1) {
    return {
      message:
        "Free users are limited to one subscription. Please upgrade to create more.",
      status: "error",
    };
  }

  const nextRunTime = getUTCNextRunTime(data.timezone, data.timeToSend);

  await prisma.newsSubscription.create({
    data: {
      ...data,
      keywords: data.keywords.split(","),
      nextRunTime,
    },
  });

  return {
    message: "News subscription created successfully",
    status: "success",
  };
}
