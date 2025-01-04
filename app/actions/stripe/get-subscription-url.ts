"use server";

import { planTOPriceId, stripe } from "@/lib/payment";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { SubscribedPlan } from "@prisma/client";

export async function getSubscriptionUrl(
  plan: SubscribedPlan,
  return_url: string,
  success_url: string
) {
  try {
    if (plan == "free") {
      return { url: process.env.NEXT_PUBLIC_BASE_URL + "/workspace" };
    }

    const user = await currentUser();
    if (!user) {
      return {
        error: "Login is required",
      };
    }
    const userId = user.id;

    const userEmail = user.emailAddresses[0].emailAddress;
    const stripe_return_url = process.env.NEXT_PUBLIC_BASE_URL + return_url;
    const stripe_success_url = process.env.NEXT_PUBLIC_BASE_URL + success_url;
    const existedCustomer = await prisma.userSubscription.findFirst({
      where: { userId: user.id },
    });

    let customer: string | undefined = undefined;
    if (existedCustomer) {
      customer = existedCustomer.customerId;
    }

    const priceId = planTOPriceId[plan];
    const stripeSession = await stripe.checkout.sessions.create({
      customer: customer,
      client_reference_id: userId,
      success_url: stripe_success_url,
      cancel_url: stripe_return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: customer ? undefined : userEmail,
      line_items: [
        {
          price: priceId, // Replace with your product ID
          quantity: 1,
        },
      ],
      metadata: { userId, plan },
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.error(error);
    return {
      error: "Unexpected error",
    };
  }
}
