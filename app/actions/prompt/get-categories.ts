"use server";
import prisma from "@/prisma/client";

export async function getCategories(): Promise<string[]> {
  const items = await prisma.promptCategory.findMany({});
  const categories = items.map((i) => i.category);
  return categories;
}
