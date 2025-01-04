import { CreateSubscriptionButton } from "@/components/news-subscription/create-subscription-button";
import { getSubscriptionLimits } from "@/app/actions/subscription/get-subscription-limits";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import SubscriptionCardGridSkeleton from "@/components/news-subscription/subscription-card-grid-skeleton";

const SubscriptionList = dynamic(
  () => import("@/components/news-subscription/subscription-list"),
  {
    ssr: true,
    loading: () => <SubscriptionCardGridSkeleton />,
  }
);

export default async function WorkspacePage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in?nextUrl=/workspace");
  }

  const { userPlan, subscriptionCount } = await getSubscriptionLimits();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          Manage Your AI-Driven News Subscriptions
        </h1>

        <CreateSubscriptionButton
          userPlan={userPlan}
          subscriptionCount={subscriptionCount}
        />
      </div>
      <p className="md:text-lg text-muted-foreground mb-4">
        {
          "Create and manage personalized news subscriptions tailored to your interests and schedule, with dedicated mailboxes to receive AI-generated insights."
        }
      </p>
      <SubscriptionList userId={userId} />
    </div>
  );
}
