"use server";
import { ActionResponse } from "@/app/types";
import { PromptFormValues } from "@/app/types/prompt";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function updatePrompt(
  data: PromptFormValues
): Promise<ActionResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Login is required" };
    }

    if (!data.id) {
      return { status: "error", message: "Id is required" };
    }

    const { id, ...rest } = data;
    await prisma.prompt.update({
      where: { id: data.id },
      data: { ...rest },
    });

    return { status: "success", message: "You prompt is updated successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
