import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaywallModal({ open, onOpenChange }: PaywallModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade to Create More Subscriptions
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <p className="text-center text-muted-foreground mb-8">
            Free users are limited to one news subscription. Upgrade to Pro for
            unlimited subscriptions and premium features.
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-6 text-white mb-8">
            <h3 className="text-xl font-semibold mb-4">Pro Plan Benefits</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/pricing" className="w-full">
              <Button className="w-full" size="lg">
                Upgrade Now
              </Button>
            </Link>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const benefits = [
  "Unlimited News Subscriptions",
  "Priority PDF Generation",
  "Create & Share Custom Prompts",
  "Priority Support",
  "API Access",
  "Custom News Sources",
];
