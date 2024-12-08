"use client";

import { SubscriptionForm } from "@/components/subscription/subscription-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function SubscriptionEditPage() {
  const items = [
    { label: "Workspace", href: "/workspace" },
    { label: "Create Subscription", href: `/workspace/subscription/new` },
  ];

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto mt-2">
        <h1 className="text-3xl font-bold mb-4">Create News Subscription</h1>
        <SubscriptionForm userId={""} />
      </div>
    </div>
  );
}
