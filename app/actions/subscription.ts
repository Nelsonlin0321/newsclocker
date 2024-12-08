"use server";

import prisma from "@/prisma/client";
import { NewsSubscriptionFormType } from "../types/subscription";
import { auth } from "@clerk/nextjs/server";
import { getNextRunTime } from "@/lib/utils";
import { ServerAction } from "../types";

export async function updateNewsSubscription(
  data: NewsSubscriptionFormType
): Promise<ServerAction> {
  const { userId } = await auth();

  if (!userId) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }

  if (!data.id) {
    return {
      message: "id is required",
      status: "error",
    };
  }

  // update the subscription
  const sub = await prisma.newsSubscription.findUnique({
    where: { id: data.id },
  });

  if (!sub) {
    return {
      message: `Subscription with id: ${data.id} not found`,
      status: "error",
    };
  }

  if (sub.userId !== userId) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }

  await prisma.newsSubscription.update({
    where: { id: data.id },
    data: { ...data, keywords: data.keywords.split(",") },
  });

  return {
    message: `Subscription with id: ${data.id} updated successfully`,
    status: "success",
  };
}

export async function createOrUpdateNewsSubscription(
  data: NewsSubscriptionFormType
): Promise<ServerAction> {
  const { userId } = await auth();

  if (!userId) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }

  const nextRunTime = getNextRunTime(data.timezone, data.timeToSend);
  await prisma.newsSubscription.create({
    data: {
      ...data,
      keywords: data.keywords.split(","),
      userId: userId,
      nextRunTime,
    },
  });

  return {
    message: `NewS subscription created successfully`,
    status: "success",
  };
}
