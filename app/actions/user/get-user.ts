"use server";

import { clerkClient } from "@clerk/nextjs/server";
export const getUser = async ({
  userId,
}: {
  userId: string | undefined | null;
}) => {
  if (!userId) {
    return undefined;
  }
  const client = await clerkClient();
  const response = await client.users.getUser(userId);
  // console.log(response);
  return response;
};
