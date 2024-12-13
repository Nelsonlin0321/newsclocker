import { SubscriptionForm } from "@/components/news-subscription/subscription-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SubscriptionEditPage() {
  const items = [
    { label: "Workspace", href: "/workspace" },
    { label: "Create Subscription", href: `/workspace/subscription/new` },
  ];

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?nextUrl=/workspace/subscription/new");
  }

  return (
    <div className="container mx-auto px-4 py-2">
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

      <div className="max-w-3xl mx-auto mt-2">
        <h1 className="text-3xl font-bold mb-4">Create News Subscription</h1>
        <SubscriptionForm userId={userId} />
      </div>
    </div>
  );
}
