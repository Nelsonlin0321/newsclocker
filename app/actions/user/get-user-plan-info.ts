"use server";

import prisma from "@/prisma/client";
export const getUserPlanInfo = async ({ userId }: { userId: string }) => {
  const user = await prisma.userSubscription.findUnique({
    where: { userId: userId },
  });

  if (!user) {
    // const clerkUser = await getUser({ userId });
    return {
      userId,
      plan: "free",
      active: false,
      email: undefined,
    };
  }
  return { userId, plan: user.plan, active: user.active, email: user.email };
};
