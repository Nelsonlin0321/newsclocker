import { CreateSubscriptionButton } from "@/components/news-subscription/create-subscription-button";
import { SubscriptionList } from "@/components/news-subscription/subscription-list";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function WorkspacePage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in?nextUrl=/workspace");
  }

  const subscriptions = await prisma.newsSubscription.findMany({
    where: { userId: userId },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          Manage Your AI-Driven News Subscriptions
        </h1>

        <CreateSubscriptionButton />
      </div>
      <p className="md:text-lg text-muted-foreground mb-4">
        {
          "Create and manage personalized news subscriptions tailored to your interests and schedule, with dedicated mailboxes to receive AI-generated insights."
        }
      </p>
      <SubscriptionList newsSubscriptions={subscriptions} />
    </div>
  );
}
