import { NewsSubscription } from "@/app/types/subscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { formatDistanceToNow } from "date-fns";
import { Clock, Edit2 } from "lucide-react";
import Link from "next/link";

interface SubscriptionCardProps {
  subscription: NewsSubscription;
}

export function SubscriptionCard({
  subscription,
}: Readonly<SubscriptionCardProps>) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">
          {subscription.keywords.join(", ")}
        </CardTitle>
        <Switch
          checked={subscription.active}
          aria-label="Toggle subscription"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Next run:{" "}
            {formatDistanceToNow(subscription.nextRunTime, { addSuffix: true })}
          </div>
          <div className="text-sm">
            <span className="font-medium">Frequency:</span>{" "}
            {subscription.frequency.replace("_", " ")}
          </div>
          <div className="text-sm">
            <span className="font-medium">Time:</span> {subscription.timeToSend}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/workspace/subscription/${subscription.id}`}
          className="w-full"
        >
          <Button className="w-full" variant="outline">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Subscription
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
