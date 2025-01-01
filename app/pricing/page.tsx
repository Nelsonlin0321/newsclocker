import { PricingCard } from "./components/price-card";

export default function PricingPage() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
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
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
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
    description: "For active professionals",
    price: "$4.90",
    originalPrice: "9.90",
    popular: true,
    features: [
      "20 News Subscriptions",
      "50 Daily News Searches",
      "50 Daily AI Insights",
      "Priority PDF Generation",
      "Create & Share Prompts",
      "Priority Support",
      "API Access",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams",
    price: "Custom",
    features: [
      "Unlimited Subscriptions",
      "Unlimited Searches & Insights",
      "Custom AI Models",
      "Dedicated Support",
      "Custom Prompt Library",
      "Team Management",
      "Custom Integration",
      "SLA Guarantee",
    ],
  },
];
