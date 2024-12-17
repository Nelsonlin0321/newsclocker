"use server";
import { ActionResponse } from "@/app/types";
import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs/server";

export async function bookmark(
  promptId: string,
  favorite: boolean,
  userId: string | null
): Promise<ActionResponse> {
  try {
    // const { userId } = await auth();

    if (!userId) {
      return { status: "error", message: "Login is required" };
    }

    const favoritePrompt = await prisma.favoritePrompt.findFirst({
      where: { userId, promptId },
    });

    if (favorite) {
      // to create
      if (favoritePrompt) {
        return {
          status: "success",
          message: "The prompt has been bookmarked.",
        };
      } else {
        await prisma.favoritePrompt.create({
          data: { userId, promptId },
        });
        return {
          status: "success",
          message: "The prompt is bookmarked.",
        };
      }
    }

    // to delete
    if (favoritePrompt) {
      await prisma.favoritePrompt.delete({
        where: { id: favoritePrompt.id },
      });
      return {
        status: "success",
        message: "The prompt is deleted.",
      };
    } else {
      return {
        status: "success",
        message: "The prompt has been deleted.",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
