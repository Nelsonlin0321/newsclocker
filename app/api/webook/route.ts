import WelcomeEmail from "@/emails/welcome-subscription";
import { periodOptions, periodToDays, stripe } from "@/lib/payment";
import prisma from "@/prisma/client";
import { SES } from "@aws-sdk/client-ses";
import { Prisma, SubscribedPeriod } from "@prisma/client";
import { render } from "@react-email/components";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;

  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  const stripEvent = await prisma.stripeEvent.findUnique({
    where: { eventId: event.id },
  });

  if (stripEvent) {
    const eventJson = JSON.stringify(stripEvent.eventObject);
    console.log(`INFO: Event ${eventJson} has been proceeded before`);

    return new NextResponse("OK", { status: 200 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;
      const priceInCents = session.amount_total;
      const email = session.customer_email;
      const { userId, period } = session.metadata!;
      console.log("INFO: session meta data: ", session.metadata);

      if (!userId) {
        console.error("No userId");
        return new NextResponse("No userId", { status: 400 });
      }

      if (!period) {
        console.error("Not period");
        return new NextResponse("No period", { status: 400 });
      }

      if (!periodOptions.includes(period)) {
        console.error("Invalid period");
        return new NextResponse("Invalid period", { status: 400 });
      }
      const subscribedPeriod = period as SubscribedPeriod;

      if (!email) {
        console.error("Customer email is required");
        return new NextResponse("Customer email is required", {
          status: 400,
        });
      }

      const userSubscription = await prisma.userSubscription.findFirst({
        where: { userId},
      });

      const days = periodToDays[subscribedPeriod];

      const currentDateUTC = new Date();
      let PeriodEnd = new Date(
        currentDateUTC.getTime() + days * 24 * 60 * 60 * 1000
      );

      if (userSubscription) {
        const stripeCurrentPeriodEnd = userSubscription.stripeCurrentPeriodEnd;
        if (stripeCurrentPeriodEnd < currentDateUTC) {
          // already expired
          // replace the period end
          await prisma.userSubscription.update({
            where: { id: userSubscription.id },
            data: {
              priceInCents: priceInCents as number,
              email: email,
              active: true,
              stripeCurrentPeriodEnd: PeriodEnd,
              subscribedPeriod: subscribedPeriod,
            },
          });
        } else {
          // extend the period end
          PeriodEnd = new Date(
            stripeCurrentPeriodEnd.getTime() + days * 24 * 60 * 60 * 1000
          );
          await prisma.userSubscription.update({
            where: { id: userSubscription.id },
            data: {
              priceInCents: priceInCents as number,
              email: email,
              active: true,
              stripeCurrentPeriodEnd: PeriodEnd,
              subscribedPeriod: subscribedPeriod,
            },
          });
        }
      } else {
        await prisma.userSubscription.create({
          data: {
            userId,
            email,
            active: true,
            priceInCents: priceInCents as number,
            subscribedPeriod: subscribedPeriod,
            stripeCurrentPeriodEnd: PeriodEnd,
          },
        });
      }

      // store stripe event
      const stripeEvent = event as unknown as Prisma.JsonObject;
      await prisma.stripeEvent.create({
        data: { eventId: event.id, eventObject: stripeEvent },
      });

      const ses = new SES({ region: 'us-east-1' });

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
              Data:await render(WelcomeEmail({userFirstName: "there"})),
            }
          }
        },
      });

      console.log(`INFO: Proceed with the ${event.type} event successfully `);
      return new NextResponse("OK", { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Unexpected Error", { status: 500 });
    }
  } else {
    console.log(`INFO: The ${event.type} event not captured`);
    return new NextResponse("OK", { status: 200 });
  }
}
