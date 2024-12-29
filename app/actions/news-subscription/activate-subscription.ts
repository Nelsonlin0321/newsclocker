"use server";

// import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { ActionResponse } from "@/app/types";
import { getUTCNextRunTime } from "@/lib/utils";

export async function toggleSubscriptionActive(
  id: string,
  active: boolean
): Promise<ActionResponse> {
  try {
    // const { userId } = await auth();

    // if (!userId) {
    //   return {
    //     status: "error",
    //     message: "Unauthorized",
    //   };
    // }

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

    // if (subscription.userId !== userId) {
    //   return {
    //     status: "error",
    //     message: "Unauthorized",
    //   };
    // }

    // Calculate new nextRunTime if activating subscription
    const nextRunTime = active
      ? getUTCNextRunTime(subscription.timezone, subscription.timeToSend)
      : subscription.nextRunTime;

    // Update subscription
    await prisma.newsSubscription.update({
      where: { id },
      data: {
        active,
        nextRunTime,
      },
    });

    return {
      status: "success",
      message: `Subscription ${
        active ? "activated" : "deactivated"
      } successfully`,
    };
  } catch (error) {
    console.error("Error toggling subscription:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}
