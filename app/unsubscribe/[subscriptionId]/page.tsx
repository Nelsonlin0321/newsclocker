// import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { UnsubscribeForm } from "@/components/news-subscription/unsubscribe-form";

interface Props {
  params: {
    subscriptionId: string;
  };
}

export default async function UnsubscribePage({
  params: { subscriptionId },
}: Props) {
  //   const { userId } = await auth();

  // Fetch subscription details
  const subscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
  });

  if (!subscription) {
    return notFound();
  }

  //   // Only allow the subscription owner to unsubscribe
  //   if (subscription.userId !== userId) {
  //     return notFound();
  //   }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <UnsubscribeForm subscription={subscription} />
    </div>
  );
}
