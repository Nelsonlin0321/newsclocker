"use server";

import { ActionResponse } from "@/app/types";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function updateMailStatus(
  mailId: string,
  data: {
    isRead?: boolean;
    isStarred?: boolean;
    isTrashed?: boolean;
  }
): Promise<ActionResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Unauthorized" };
    }

    const mail = await prisma.mail.findUnique({
      where: { id: mailId },
      include: { newsSubscription: true },
    });

    if (!mail || mail.newsSubscription.userId !== userId) {
      return { status: "error", message: "Mail not found" };
    }

    await prisma.mail.update({
      where: { id: mailId },
      data,
    });

    return { status: "success", message: "Mail updated successfully" };
  } catch (error) {
    console.error("Error updating mail status:", error);
    return { status: "error", message: "Failed to update mail" };
  }
}
