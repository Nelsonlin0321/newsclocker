import { SubscribedPlan } from "@prisma/client";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const planToPriceInCents: Record<SubscribedPlan, number> = {
  free: 0,
  month: 490,
  year: 3900,
};

export const planToDays: Record<SubscribedPlan, number> = {
  free: 0,
  month: 31,
  year: 365,
};

export type PayedPlan = "month" | "year";

export const payedPlans: string[] = ["month", "year"];
export const planToPeriod: Record<PayedPlan, PayedPlan> = {
  month: "month",
  year: "year",
};

export const planToDisplayedFrequency: Record<SubscribedPlan, string> = {
  free: "Free",
  month: "Monthly",
  year: "Yearly",
};

export const planTOPriceId: Record<PayedPlan, string> = {
  month: process.env.STRIPE_MONTHLY_PRICE_ID!,
  year: process.env.STRIPE_YEARLY_PRICE_ID!,
};

const STRIPE_MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID!;

const STRIPE_YEARLY_PRICE_ID = process.env.STRIPE_YEARLY_PRICE_ID!;

const priceIdToPlanList: {
  priceId: string;
  plan: PayedPlan;
}[] = [
  { priceId: STRIPE_MONTHLY_PRICE_ID, plan: "month" },
  { priceId: STRIPE_YEARLY_PRICE_ID, plan: "year" },
];
export function getPlanByPriceId(priceId: string): PayedPlan {
  const plan = priceIdToPlanList.find((item) => item.priceId === priceId)?.plan;
  if (!plan) {
    throw new Error(`Plan not found for priceId: ${priceId}`);
  }
  return plan;
}
