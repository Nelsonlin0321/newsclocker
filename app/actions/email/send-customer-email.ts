"use server";

import { SES } from "@aws-sdk/client-ses";

interface CustomerEmailData {
  email: string;
  message: string;
}

export async function sendCustomerEmail({ email, message }: CustomerEmailData) {
  const ses = new SES({ region: "us-east-1" });

  try {
    await ses.sendEmail({
      Source: "NewsClocker Support <support@newsclocker.com>",
      Destination: {
        ToAddresses: ["nelsonlin0321@gmail.com"],
        BccAddresses: [email], // Send a copy to the customer
      },
      Message: {
        Subject: {
          Data: "New Contact Form Submission - NewsClocker",
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
          },
        },
      },
      ReplyToAddresses: [email],
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
