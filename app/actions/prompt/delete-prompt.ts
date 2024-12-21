"use server";
import { ActionResponse } from "@/app/types";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function deletePrompt(promptId: string): Promise<ActionResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Login is required" };
    }

    const prompt = await prisma.prompt.findUnique({ where: { id: promptId } });
    if (!prompt) {
      return {
        status: "error",
        message: "The prompt doesn't exist",
      };
    }

    if (prompt.userId !== userId) {
      return { status: "error", message: "Authentication Error" };
    }
    await prisma.prompt.delete({ where: { id: promptId } });

    return { status: "success", message: "The prompt is deleted successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
