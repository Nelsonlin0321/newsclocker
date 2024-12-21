"use server";
import prisma from "@/prisma/client";

export async function getIcons(): Promise<string[]> {
  const items = await prisma.promptIcon.findMany({});
  const icons = items.map((i) => i.icon);
  return icons;
}
