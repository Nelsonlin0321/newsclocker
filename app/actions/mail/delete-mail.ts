"use server";

import { ActionResponse } from "@/app/types";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function deleteMail(mailId: string): Promise<ActionResponse> {
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

    await prisma.mail.delete({
      where: { id: mailId },
    });

    return { status: "success", message: "Mail deleted successfully" };
  } catch (error) {
    console.error("Error deleting mail:", error);
    return { status: "error", message: "Failed to delete mail" };
  }
}
