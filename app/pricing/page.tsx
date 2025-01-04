import { PricingCard } from "./components/price-card";

export default function PricingPage() {
  return (
    <div className="py-5 bg-gray-50">
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

        {/* Pricing Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          * Credits are used to search news articles, generate AI insight.
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
    plan: "free",
    features: [
      "1 News Subscription",
      "100 Credits /  Month",
      "PDF Generation",
      "Create & Share Prompts",
    ],
  },
  {
    name: "Pro",
    description: "Monthly subscription",
    price: "$4.90",
    plan: "month",
    originalPrice: "9.90",
    popular: true,
    features: [
      "20 News Subscriptions",
      "1K Credits /  Month",
      "PDF Generation",
      "Create & Share Prompts",
      "Email Support",
    ],
  },
  {
    name: "Pro Plus",
    description: "Yearly subscription (Save 70%)",
    price: "$3.25",
    plan: "year",
    originalPrice: "9.90",
    features: [
      "50 News Subscriptions",
      "2K Credits /  Month",
      "PDF Generation",
      "Create & Share Prompts",
      "Email Support",
    ],
  },
];
