import BreadcrumbItems from "@/components/breadcrumb-items";
import { SubscriptionLayout } from "@/components/news-subscription/subscription-layout";
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
    <div className="container mx-auto px-1 py-4">
      <BreadcrumbItems items={items} />

      <div className="mt-8">
        <div className="">
          <h1 className="text-xl font-bold mb-2 md:text-3xl">
            Optimize Your AI Insight Report: Create Subscription & Set Search
            Preferences
          </h1>
          <p className="md:text-lg text-muted-foreground mb-4">
            Customize your search settings, fetch news results, and design
            prompts for tailored AI insight report generation.
          </p>
        </div>
        <SubscriptionLayout userId={userId} />
      </div>
    </div>
  );
}
