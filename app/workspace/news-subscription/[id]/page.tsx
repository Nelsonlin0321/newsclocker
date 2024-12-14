import BreadcrumbItems from "@/components/breadcrumb-items";
import { SubscriptionForm } from "@/components/news-subscription/subscription-form";
import { NewsSearchResults } from "@/components/news-subscription/news-search-results";
import { SubscriptionLayout } from "@/components/news-subscription/subscription-layout";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { mockNewsSearchResults } from "@/lib/mock-data";

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
    <div className="container mx-auto px-4 py-4">
      <BreadcrumbItems items={items} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">
          Edit Subscription and Search
        </h1>
        <SubscriptionLayout
          userId={userId}
          newsSubscription={newsSubscription}
        />
      </div>
    </div>
  );
}
