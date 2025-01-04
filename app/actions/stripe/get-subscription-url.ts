"use server";

import { planToDisplayedFrequency, planToPeriod, planToPriceInCents, stripe } from "@/lib/payment";
import prisma from "@/prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SubscribedPlan } from "@prisma/client";

export async function getSubscriptionUrl(
    plan: SubscribedPlan,
    nextUrl: string
  ) {
    try {
      if (plan=='free') {
        return { url: process.env.NEXT_PUBLIC_BASE_URL + "/workspace" };
      }

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
      
      const displayedPeriod = planToDisplayedFrequency[plan];
      const planPeriod = planToPeriod[plan]
      const priceInCent = planToPriceInCents[plan];


      const existedCustomer = await prisma.userSubscription.findFirst({where:{userId}});

      let customer:string|undefined = undefined;
      if (existedCustomer){
        customer = existedCustomer.customerId;
      }

      const stripeSession = await stripe.checkout.sessions.create({
        customer:customer,
        client_reference_id: userId,
        success_url: return_url + "?subscription=success",
        cancel_url: return_url,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: customer ? undefined: userEmail,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: `NewsClocker Pro ${displayedPeriod} Plan`,
                description: `You can cancel anytime. No risk. No hidden fees.`,
                images: ["https://d2gewc5xha837s.cloudfront.net/newsclocker/logo/logo-horizontal.png"],
              },
              unit_amount: priceInCent,
              recurring: { interval:planPeriod},
            },
            quantity: 1,
          },
        ],
        metadata: { userId, plan }
      });

      return { url: stripeSession.url };
    } catch (error) {
      console.error(error);
      return {
        error: "Unexpected error",
      };
    }
  }