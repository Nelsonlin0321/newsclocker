import { SubscribedPeriod } from "@prisma/client";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PeriodToPriceInCents: Record<SubscribedPeriod, number> = {
  month: 490,
  year: 3900,
};

export const periodToDays: Record<SubscribedPeriod, number> = {
  month: 31,
  year: 365,
};

export const periodOptions = [
  "month",
  "year",
];

export const PeriodToDisplayFrequency: Record<SubscribedPeriod, string> = {
    month: "Monthly",
    year: "Yearly",
  };