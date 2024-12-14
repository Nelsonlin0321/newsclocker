"use server";

import prisma from "@/prisma/client";
import {
  CreateNewsSubscriptionForm,
  UpdateNewsSubscriptionForm,
} from "../../types/subscription";
import { auth } from "@clerk/nextjs/server";
import { getUTCNextRunTime } from "@/lib/utils";
import { ActionResponse } from "@/app/types";

export async function updateNewsSubscription(
  data: UpdateNewsSubscriptionForm
): Promise<ActionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        message: "Unauthorized",
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

    const { id, ...updateData } = data;
    const nextRunTime = getUTCNextRunTime(data.timezone, data.timeToSend);

    await prisma.newsSubscription.update({
      where: { id: id },
      data: { ...updateData, nextRunTime, keywords: data.keywords.split(",") },
    });

    return {
      message: `Subscription with id: ${data.id} updated successfully`,
      status: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Unexpected error",
      status: "error",
    };
  }
}

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
