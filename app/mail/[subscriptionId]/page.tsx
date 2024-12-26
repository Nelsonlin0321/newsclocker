import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import { MailLayout } from "@/components/mail/mail-layout";

interface Props {
  params: {
    subscriptionId: string;
  };
}

export default async function MailPage({ params: { subscriptionId } }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return redirect(`/sign-in?nextUrl=/mail/${subscriptionId}`);
  }

  const newsSubscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
    include: {
      Mail: {
        where: { isTrashed: false },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!newsSubscription || newsSubscription.userId !== userId) {
    return notFound();
  }
  return <MailLayout subscription={newsSubscription} />;
}
