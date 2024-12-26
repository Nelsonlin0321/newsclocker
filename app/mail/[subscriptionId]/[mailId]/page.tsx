import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import { MailLayout } from "@/components/mail/mail-layout";

interface Props {
  params: {
    subscriptionId: string;
    mailId: string;
  };
}

export default async function MailPage({
  params: { subscriptionId, mailId },
}: Props) {
  const { userId } = await auth();
  if (!userId) {
    return redirect(`/sign-in?nextUrl=/mail/${subscriptionId}/${mailId}`);
  }

  const newsSubscription = await prisma.newsSubscription.findUnique({
    where: { id: subscriptionId },
    include: {
      Mail: {
        where: { id: mailId },
        take: 1,
      },
    },
  });

  if (!newsSubscription || newsSubscription.userId !== userId) {
    return notFound();
  }

  const initialMail = newsSubscription.Mail[0];
  if (!initialMail) {
    return notFound();
  }

  return (
    <MailLayout
      subscription={newsSubscription}
      initialSelectedMail={initialMail}
    />
  );
}
