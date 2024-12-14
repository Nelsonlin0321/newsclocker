import BreadcrumbItems from "@/components/breadcrumb-items";
import { SubscriptionForm } from "@/components/news-subscription/subscription-form";
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
    <div className="container mx-auto px-2 py-4">
      <BreadcrumbItems items={items} />

      <div className="max-w-3xl mx-auto mt-2">
        <h1 className="text-3xl font-bold mb-4">Create News Subscription</h1>
        <SubscriptionForm userId={userId} />
      </div>
    </div>
  );
}
