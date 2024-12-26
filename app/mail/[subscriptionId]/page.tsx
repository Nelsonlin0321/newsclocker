import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";

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

  // Redirect to first mail if exists
  const firstMail = newsSubscription.Mail[0];
  if (firstMail) {
    redirect(`/mail/${subscriptionId}/${firstMail.id}`);
  }

  // If no mails, show empty state
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <p className="text-muted-foreground">No messages found</p>
    </div>
  );
}
