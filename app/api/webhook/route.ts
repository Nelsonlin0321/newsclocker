import WelcomeEmail from "@/emails/welcome-subscription";
import { PayedPlan, payedPlans, stripe } from "@/lib/payment";
import prisma from "@/prisma/client";
import { SES } from "@aws-sdk/client-ses";
import { Prisma } from "@prisma/client";
import { render } from "@react-email/components";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const ses = new SES({ region: "us-east-1" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const existedStripeEvent = await prisma.stripeEvent.findUnique({
      where: { eventId: event.id },
    });

    if (existedStripeEvent) {
      const eventJson = JSON.stringify(existedStripeEvent.eventObject);
      console.log(`INFO: Event ${eventJson} has been proceeded before`);

      return new NextResponse("OK", { status: 200 });
    }

    const eventType = event.type;
    const data = event.data;
    switch (eventType) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const priceInCents = session.amount_total;
        const customerId = session.customer?.toString();
        const { userId, plan } = session.metadata!;
        console.log("INFO: session meta data: ", session.metadata);

        if (!customerId) {
          console.error(`${eventType}: No customerId`);
          return new NextResponse("No customerId", { status: 400 });
        }

        const customer = await stripe.customers.retrieve(customerId);

        const email = (customer as Stripe.Customer).email;

        if (!userId) {
          console.error(`ERROR: ${eventType}: No userId`);
          return new NextResponse("No userId", { status: 400 });
        }

        if (!plan) {
          console.error(`ERROR: ${eventType}: No plan`);
          return new NextResponse("No plan", { status: 400 });
        }

        if (!payedPlans.includes(plan)) {
          console.error(`ERROR: ${eventType}: Invalid plan`);
          return new NextResponse("Invalid period", { status: 400 });
        }

        const subscribedPlan = plan as PayedPlan;

        if (!email) {
          console.error(`ERROR:${eventType}: Customer email is required`);
          return new NextResponse("Customer email is required", {
            status: 400,
          });
        }

        const subscriptionStartAt = new Date();

        await prisma.userSubscription.upsert({
          where: { userId },
          create: {
            userId,
            email,
            priceInCents: priceInCents as number,
            customerId,
            subscriptionStartAt,
            plan: subscribedPlan,
            active: true,
          },
          update: {
            email,
            priceInCents: priceInCents as number,
            customerId,
            subscriptionStartAt,
            plan: subscribedPlan,
            active: true,
          },
        });

        const stripeEvent = event as unknown as Prisma.JsonObject;
        await prisma.stripeEvent.create({
          data: { eventId: event.id, eventObject: stripeEvent },
        });

        await ses.sendEmail({
          Source: "NewsClocker <noreply@newsclocker.com>",
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Subject: {
              Data: "Thank you for subscribing",
            },
            Body: {
              Html: {
                Data: await render(WelcomeEmail({ userFirstName: "there" })),
              },
            },
          },
        });

        console.log(`INFO: Proceed with the ${event.type} event successfully `);
        return new NextResponse("OK", { status: 200 });
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer.toString();

        const userSubscription = await prisma.userSubscription.findFirst({
          where: { customerId },
        });

        if (userSubscription) {
          await prisma.userSubscription.update({
            where: { id: userSubscription.id },
            data: {
              active: false,
              plan: "free",
            },
          });
          console.log(
            `INFO: Proceed with the ${event.type} event successfully `
          );
          return new NextResponse("OK", { status: 200 });
        } else {
          console.error(`No subscription found for customer ${customerId}`);
          return new NextResponse("No subscription found", { status: 400 });
        }
      }
      default: {
        console.warn(`WARNING: The ${eventType} event not captured`);
        return new NextResponse("OK", { status: 200 });
      }
    }
  } catch (error) {
    await ses.sendEmail({
      Source: "NewsClocker <noreply@newsclocker.com>",
      Destination: {
        ToAddresses: ["contact@newsclocker.com"],
      },
      Message: {
        Subject: {
          Data: `Unexpected Error Occurred in handling stripe event ${JSON.stringify(event)}`,
        },
        Body: {
          Html: {
            Data: String(error),
          },
        },
      },
    });
    console.error(error);
    return new NextResponse("Unexpected Error", { status: 500 });
  }
}
