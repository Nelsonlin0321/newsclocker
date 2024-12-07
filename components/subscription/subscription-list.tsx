import { mockSubscriptions } from '@/lib/mock-data';
import { SubscriptionCard } from './subscription-card';

export function SubscriptionList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSubscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}