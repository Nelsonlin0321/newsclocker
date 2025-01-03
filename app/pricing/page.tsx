import { PricingCard } from "./components/price-card";


export default function PricingPage() {
  return (
    <div className="py-5 bg-gray-50">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your news intelligence needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Pricing Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          * All prices are in USD. Pro and Pro Plus plans include all features.
        </p>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period:"free",
    features: [
      "1 News Subscription",
      "3 Daily News Searches",
      "3 Daily AI Insights",
      "Basic PDF Export",
      "Community Prompts Access",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    description: "Monthly subscription",
    price: "$4.90",
    period:"month",
    originalPrice: "9.90",
    popular: true,
    features: [
      "Unlimited News Subscriptions",
      "Unlimited News Searches",
      "Unlimited AI Insights",
      "Priority PDF Generation",
      "Create & Share Prompts",
      "Priority Support",
      "API Access",
      "Custom News Sources",
      "Advanced Analytics",
      "Team Collaboration",
    ],
  },
  {
    name: "Pro Plus",
    description: "Yearly subscription (Save 70%)",
    price: "$3.25",
    period:"year",
    originalPrice: "9.90",
    features: [
      "Unlimited News Subscriptions",
      "Unlimited News Searches",
      "Unlimited AI Insights",
      "Priority PDF Generation",
      "Create & Share Prompts",
      "Priority Support",
      "API Access",
      "Custom News Sources",
      "Advanced Analytics",
      "Team Collaboration",
    ],
  },
];