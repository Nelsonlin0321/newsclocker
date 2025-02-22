"use server";

import { NewsSearchResultResponse } from "@/app/types/search";
import { auth } from "@clerk/nextjs/server";
import deliverToMailServices from "@/app/services/deliver-to-mail-services";
import prisma from "@/prisma/client";
import sendEmail from "./send-email";

export async function deliverMail(
  subscriptionId: string,
  aiInsight: string,
  pdfUrl: string,
  searchResult: NewsSearchResultResponse
): Promise<{
  status: "success" | "error";
  message: string;
  mailId?: string;
}> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: "error", message: "Unauthorized" };
    }

    const subscription = await prisma.newsSubscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return {
        status: "error",
        message: `Subscription with id: ${subscriptionId} not found`,
      };
    }

    if (subscription.userId !== userId) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const data = {
      subscriptionId,
      aiInsight,
      pdfUrl,
      searchResult,
    };

    // return {
    //   status: "success",
    //   message: "success",
    //   mailId: "cm57udfr50000okkpafsmhd1u",
    // };

    const response = await deliverToMailServices.post(data);

    if (!response.mailId) {
      console.error(`Error delivering mail:${response.detail}`);
      return { status: "error", message: "Failed to deliver mail" };
    }
    const emailResponse = await sendEmail({ mailId: response.mailId });

    if (emailResponse.status != "success") {
      console.error(`Error sending email:${emailResponse.message}`);
      return { status: "error", message: "Failed to send email" };
    }
    return {
      status: "success",
      message: response.detail,
      mailId: response.mailId,
    };
  } catch (error) {
    console.error("Error delivering mail:", error);
    return { status: "error", message: "Failed to deliver mail" };
  }
}
