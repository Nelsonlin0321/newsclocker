"use server";

import { PeriodToDisplayFrequency, PeriodToPriceInCents, stripe } from "@/lib/payment";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SubscribedPeriod } from "@prisma/client";

export async function getSubscriptionUrl(
    period: SubscribedPeriod,
    nextUrl: string
  ) {
    try {
      const { userId } = await auth();
      const user = await currentUser();
      if (!userId) {
        return {
          error: "Login is required",
        };
      }
  
      if (!user?.emailAddresses) {
        return {
          error: "Email address is required",
        };
      }
      
      const userEmail = user.emailAddresses[0].emailAddress;
      const return_url = process.env.NEXT_PUBLIC_BASE_URL + nextUrl;
      
      const displayPeriod = PeriodToDisplayFrequency[period];

      const priceInCent = PeriodToPriceInCents[period];

      const stripeSession = await stripe.checkout.sessions.create({
        client_reference_id: userId,
        success_url: return_url + "?subscription=success",
        cancel_url: return_url,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: userEmail,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: `NewsClocker Pro ${displayPeriod} Plan`,
                description: `You can cancel anytime. No risk. No hidden fees.`,
                images: ["https://d2gewc5xha837s.cloudfront.net/newsclocker/logo/logo-horizontal.png"],
              },
              unit_amount: priceInCent,
              recurring: { interval:period},
            },
            quantity: 1,
          },
        ],
        metadata: { userId, period }
      });

      return { url: stripeSession.url };
    } catch (error) {
      console.error(error);
      return {
        error: "Unexpected error",
      };
    }
  }