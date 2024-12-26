import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { MailLayout } from "@/components/mail/mail-layout";

interface Props {
  params: {
    subscriptionId: string;
  };
}

export default async function MailPage({ params: { subscriptionId } }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }

  // Verify subscription exists and belongs to user
  const newsSubscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
    include: {
      Mail: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!newsSubscription || newsSubscription.userId !== userId) {
    return notFound();
  }

  return <MailLayout subscription={newsSubscription} />;
}
