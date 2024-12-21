"use server";
import prisma from "@/prisma/client";

export const getIsShared = async (promptId: string) => {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });

    if (prompt) {
      return prompt.share;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
