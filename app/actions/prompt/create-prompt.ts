"use server";
import { ActionResponse } from "@/app/types";
import { PromptFormValues } from "@/app/types/prompt";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function createPrompt(
  data: PromptFormValues
): Promise<ActionResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Login is required" };
    }

    const { id, ...rest } = data;
    await prisma.prompt.create({ data: { ...rest, userId } });
    return { status: "success", message: "You prompt is created successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
