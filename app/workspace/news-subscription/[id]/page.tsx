import BreadcrumbItems from "@/components/breadcrumb-items";
import { SubscriptionLayout } from "@/components/news-subscription/subscription-layout";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function SubscriptionEditPage({ params: { id } }: Props) {
  const newsSubscription = await prisma.newsSubscription.findUnique({
    where: { id: id },
  });

  if (!newsSubscription) {
    return notFound();
  }

  const { userId } = await auth();

  if (newsSubscription.userId !== userId) {
    return notFound();
  }

  const items = [
    { label: "Workspace", href: "/workspace" },
    { label: "Edit Subscription", href: `/workspace/news-subscription/${id}` },
  ];

  return (
    <div className="container mx-auto md:px-4 py-4">
      <BreadcrumbItems items={items} />

      <div className="mt-8">
        <div className="px-2 md:px-4">
          <h1 className="text-xl font-bold mb-2 md:text-3xl">
            {"Tailor Your AI Supercharged News Subscription"}
          </h1>
          <p className="md:text-lg text-muted-foreground mb-4">
            Customize your search and subscription settings, fetch news results,
            and design prompts for tailored AI insight report generation.
          </p>
        </div>
        <SubscriptionLayout
          userId={userId}
          newsSubscription={newsSubscription}
        />
      </div>
    </div>
  );
}

export const maxDuration = 60;
