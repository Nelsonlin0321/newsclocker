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
        <h1 className="text-3xl font-bold">My News Subscriptions</h1>

        <CreateSubscriptionButton />
      </div>
      <p className="text-lg text-muted-foreground mb-4">
        {
          "Discover and create personalized news subscriptions tailored to your interests and schedule, powered by AI."
        }
      </p>
      <SubscriptionList newsSubscriptions={subscriptions} />
    </div>
  );
}
