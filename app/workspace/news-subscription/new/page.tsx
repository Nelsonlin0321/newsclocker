import BreadcrumbItems from "@/components/breadcrumb-items";
import { NewsSearchResults } from "@/components/news-subscription/news-search-results";
import { SubscriptionForm } from "@/components/news-subscription/subscription-form";
import { SubscriptionLayout } from "@/components/news-subscription/subscription-layout";
import { mockNewsSearchResults } from "@/lib/mock-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function SubscriptionEditPage() {
  const items = [
    { label: "Workspace", href: "/workspace" },
    { label: "Create Subscription", href: `/workspace/news-subscription/new` },
  ];

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?nextUrl=/workspace/news-subscription/new");
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <BreadcrumbItems items={items} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">
          Create Subscription and Search
        </h1>
        <SubscriptionLayout
          form={<SubscriptionForm userId={userId} />}
          results={<NewsSearchResults results={mockNewsSearchResults} />}
        />
      </div>
    </div>
  );
}
