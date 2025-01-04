"use client";
import { getSubscriptionUrl } from "@/app/actions/stripe/get-subscription-url";
import { Button } from "@/components/ui/button";
import { PayedPlan, payedPlans } from "@/lib/payment";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const customerPortal = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!;

type Props = {
  userInfo: {
    userId: string;
    plan: string;
    active: boolean;
    email: string | undefined;
  };
  plan: string;
  popular: boolean | undefined;
};

const PriceButton = ({ userInfo, plan, popular }: Props) => {
  const currentPath = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handelSubscription = async () => {
    if (userInfo.active) {
      if (userInfo.email) {
        const href = customerPortal + `?prefilled_email=${userInfo.email}`;
        window.location.href = href;
      } else {
        window.location.href = customerPortal;
      }
    } else {
      if (payedPlans.includes(plan)) {
        setLoading(true);
        const result = await getSubscriptionUrl(
          plan as PayedPlan,
          currentPath,
          "/workspace"
        );
        if (result.error) {
          toast.error(result.error);
        }
        if (result.url) {
          window.location.href = result.url;
        }
        setLoading(false);
      } else {
        router.push("/workspace");
      }
    }
  };

  let buttonStr = "Get Started";

  if (userInfo.active) {
    if (userInfo.plan === plan) {
      buttonStr = "Manage Plan";
    }
    if (userInfo.plan !== plan) {
      buttonStr = "Change Plan";
    }
  }

  return (
    <Button
      className="w-full"
      variant={popular ? "default" : "outline"}
      onClick={handelSubscription}
    >
      {loading ? <Loader2 className="animate-spin" /> : buttonStr}
    </Button>
  );
};

export default PriceButton;
