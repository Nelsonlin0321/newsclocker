import { SubscriptionForm } from "@/components/news-subscription/subscription-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    { label: "Edit Subscription", href: `/workspace/subscription/${id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <div key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8">Edit Subscription</h1>
        <SubscriptionForm newsSubscription={newsSubscription} userId={userId} />
      </div>
    </div>
  );
}
