import { NewsSubscription } from "@prisma/client";
import { SubscriptionCard } from "./subscription-card";

interface Props {
  newsSubscriptions: NewsSubscription[];
}

export function SubscriptionList({ newsSubscriptions }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {newsSubscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}
