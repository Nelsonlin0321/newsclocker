import { CreateSubscriptionButton } from '@/components/subscription/create-subscription-button';
import { SubscriptionList } from '@/components/subscription/subscription-list';

export default function WorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My News Subscriptions</h1>
        <CreateSubscriptionButton />
      </div>
      <SubscriptionList />
    </div>
  );
}