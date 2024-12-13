"use server";

import prisma from "@/prisma/client";
import { CreateNewsSubscriptionForm } from "../../types/subscription";
import { auth } from "@clerk/nextjs/server";
import { getUTCNextRunTime } from "@/lib/utils";
import { ActionResponse } from "@/app/types";

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
