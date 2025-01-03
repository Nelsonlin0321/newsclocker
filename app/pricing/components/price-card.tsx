"use client";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "./price-display";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getSubscriptionUrl } from "@/app/actions/stripe/get-subscription-url";
import toast from "react-hot-toast";
import { SubscribedPeriod } from "@prisma/client";
import { periodOptions } from "@/lib/payment";
import { useAuth } from "@clerk/nextjs";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular?: boolean;
  period: string;
}

export function PricingCard({
  name,
  description,
  price,
  originalPrice,
  features,
  popular,
  period,
}: PricingCardProps) {
  const currentPath = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const handelSubscription = async () => {
    if (!userId) {
      router.push("/sign-in?NextUrl=" + currentPath);
    } else {
      if (periodOptions.includes(period)) {
        setLoading(true);
        const result = await getSubscriptionUrl(period as SubscribedPeriod, currentPath);
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

  return (
    <div
      className={`relative rounded-2xl bg-white shadow-lg p-8 ${
        popular ? "border-2 border-primary ring-2 ring-primary/20" : ""
      }`}
    >
      {popular && (
        <>
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
          <span className="absolute -right-4 top-8 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium transform rotate-12">
            50% OFF
          </span>
        </>
      )}

      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        <PriceDisplay
          price={price}
          originalPrice={originalPrice}
          period={"/month"}
        />
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Button className="w-full" variant={popular ? "default" : "outline"} onClick={handelSubscription}>
        {loading ? <Loader2 className="animate-spin" /> : "Get Started"}
      </Button>
    </div>
  );
}
