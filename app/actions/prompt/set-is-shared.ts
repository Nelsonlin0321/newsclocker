"use server";
import { ActionResponse } from "@/app/types";
import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs/server";

export async function setIsShared(
  promptId: string,
  IsShared: boolean,
  userId: string | null | undefined
): Promise<ActionResponse> {
  try {
    // const { userId } = await auth();

    if (!userId) {
      return { status: "error", message: "Login is required" };
    }

    await prisma.prompt.update({
      where: { id: promptId },
      data: { share: IsShared },
    });

    const publicOrPrivate = IsShared ? "public" : "private";

    return {
      status: "success",
      message: `The prompt is ${publicOrPrivate} now.`,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Unexpected Error" };
  }
}
