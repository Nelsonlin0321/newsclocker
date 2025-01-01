import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="py-24 bg-gray-50">
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
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white shadow-lg p-8 ${
                plan.popular ? "border-2 border-primary ring-2 ring-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 mb-1">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/signup" className="block">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Basic",
    description: "Perfect for getting started",
    price: 9,
    features: [
      "3 News Subscriptions",
      "Basic AI Insights",
      "Daily Delivery",
      "PDF Export",
      "Email Support",
      "Community Prompts Access",
    ],
  },
  {
    name: "Pro",
    description: "Best for professionals",
    price: 29,
    popular: true,
    features: [
      "10 News Subscriptions",
      "Advanced AI Analysis",
      "Custom Delivery Schedule",
      "Priority PDF Generation",
      "Priority Support",
      "Create & Share Prompts",
      "API Access",
    ],
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    price: 99,
    features: [
      "Unlimited Subscriptions",
      "Custom AI Models",
      "Real-time Delivery",
      "Bulk PDF Export",
      "24/7 Phone Support",
      "Custom Prompt Library",
      "Team Management",
      "Custom Integration",
    ],
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required.",
  },
  {
    question: "What happens after my trial ends?",
    answer: "After your trial ends, you'll be prompted to choose a plan to continue using NewsClocker. Your data will be preserved.",
  },
];