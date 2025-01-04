"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PaywallModal } from "./paywall-modal";

interface Props {
  userPlan?: string;
  subscriptionCount?: number;
}

export function CreateSubscriptionButton({
  userPlan = "free",
  subscriptionCount = 0,
}: Props) {
  const [showPaywall, setShowPaywall] = useState(false);
  const isProUser = userPlan !== "free";
  const hasReachedLimit = !isProUser && subscriptionCount >= 1;

  const handleClick = (e: React.MouseEvent) => {
    if (hasReachedLimit) {
      e.preventDefault();
      setShowPaywall(true);
    }
  };

  return (
    <>
      <Link href="/workspace/news-subscription/new" onClick={handleClick}>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          <span className="whitespace-normal text-left">Create</span>
        </Button>
      </Link>

      <PaywallModal open={showPaywall} onOpenChange={setShowPaywall} />
    </>
  );
}
