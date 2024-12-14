"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { ActionResponse } from "@/app/types";

export async function deleteSubscription(id: string): Promise<ActionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    // Verify subscription exists and belongs to user
    const subscription = await prisma.newsSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return {
        status: "error",
        message: `Subscription with id: ${id} not found`,
      };
    }

    if (subscription.userId !== userId) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    // Delete subscription
    await prisma.newsSubscription.delete({
      where: { id },
    });

    return {
      status: "success",
      message: "Subscription deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}
