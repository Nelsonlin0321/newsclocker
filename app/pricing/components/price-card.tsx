import { auth } from "@clerk/nextjs/server";
import { Check } from "lucide-react";
import PriceButton from "./price-button";
import { PriceDisplay } from "./price-display";
import UnloginPriceButton from "./unlogin-price-button";
import { getUserPlanInfo } from "@/app/actions/user/get-user-plan-info";
import FreePlanButton from "./free-plan-button";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular?: boolean;
  plan: string;
}

export async function PricingCard({
  name,
  description,
  price,
  originalPrice,
  features,
  popular,
  plan,
}: PricingCardProps) {
  const { userId } = await auth();

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
      {!userId ? (
        <UnloginPriceButton popular={popular} />
      ) : plan === "free" ? (
        <FreePlanButton />
      ) : (
        <PriceButton
          userInfo={await getUserPlanInfo({ userId })}
          plan={plan}
          popular={popular}
        />
      )}
    </div>
  );
}
