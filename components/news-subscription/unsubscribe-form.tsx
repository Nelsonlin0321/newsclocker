"use client";

import { NewsSubscription } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleSubscriptionActive } from "@/app/actions/news-subscription";
import { toast } from "react-hot-toast";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Props {
  subscription: NewsSubscription;
}

export function UnsubscribeForm({ subscription }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const router = useRouter();

  const handleSubscriptionToggle = async (active: boolean) => {
    setIsLoading(true);
    try {
      const response = await toggleSubscriptionActive(subscription.id, active);
      if (response.status === "success") {
        if (active) {
          toast.success("Successfully reactivated subscription");
          router.push(`/mail/${subscription.id}`);
        } else {
          setIsUnsubscribed(true);
          toast.success("Successfully unsubscribed from newsletter");
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(
        active
          ? "Failed to reactivate. Please try again later."
          : "Failed to unsubscribe. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isUnsubscribed) {
    return (
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 className="h-6 w-6" />
            <CardTitle>Unsubscribed Successfully</CardTitle>
          </div>
          <CardDescription>
            You have been unsubscribed from {subscription.name} newsletter.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSubscriptionToggle(true)}
            disabled={isLoading}
          >
            {isLoading ? "Reactivating..." : "Reactivate Subscription"}
          </Button>
          <Link href="/" className="w-full">
            <Button className="w-full">Return to Homepage</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive mb-2">
          <AlertCircle className="h-6 w-6" />
          <CardTitle>Confirm Unsubscribe</CardTitle>
        </div>
        <CardDescription>
          Are you sure you want to unsubscribe from {subscription.name}{" "}
          newsletter? You will no longer receive news updates for keywords:{" "}
          {subscription.keywords.join(", ")}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You can reactivate your subscription at any time from your workspace.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="destructive"
          onClick={() => handleSubscriptionToggle(false)}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Unsubscribing..." : "Confirm Unsubscribe"}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/mail/${subscription.id}`)}
          disabled={isLoading}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Mailbox
        </Button>
      </CardFooter>
    </Card>
  );
}
