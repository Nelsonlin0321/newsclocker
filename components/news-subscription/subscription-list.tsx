import { SubscriptionCard } from "./subscription-card";
import prisma from "@/prisma/client";
// import delay from "delay";
interface Props {
  userId: string;
}

export async function SubscriptionList({ userId }: Props) {
  const subscriptions = await prisma.newsSubscription.findMany({
    where: { userId: userId },
  });

  // await delay(1000);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {subscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}

export default SubscriptionList;
