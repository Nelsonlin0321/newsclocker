"use server";

import { ActionResponse } from "@/app/types";
import { NewsSearchResultResponse } from "@/app/types/search";
import { auth } from "@clerk/nextjs/server";
import deliverToMailServices from "@/app/services/deliver-to-mail-services";
import prisma from "@/prisma/client";

export async function deliverMail(
  subscriptionId: string,
  aiInsight: string,
  pdfUrl: string,
  searchResult: NewsSearchResultResponse
): Promise<ActionResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Unauthorized" };
    }

    const subscription = await prisma.newsSubscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return {
        status: "error",
        message: `Subscription with id: ${subscriptionId} not found`,
      };
    }

    if (subscription.userId !== userId) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const data = {
      subscriptionId,
      aiInsight,
      pdfUrl,
      searchResult,
    };

    const response = await deliverToMailServices.post(data);
    return { status: "success", message: response.detail };
  } catch (error) {
    console.error("Error delivering mail:", error);
    return { status: "error", message: "Failed to deliver mail" };
  }
}
