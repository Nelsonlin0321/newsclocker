import prisma from "@/prisma/client";
import { SES } from "@aws-sdk/client-ses";
import { getUser } from "../user/get-user";
import { render } from "@react-email/components";
import Notification from "@/emails/notification";
type Props = {
  mailId: string;
};

const sendEmail = async ({ mailId }: Props) => {
  const mail = await prisma.mail.findUnique({
    where: {
      id: mailId,
    },
    include: { newsSubscription: true },
  });

  if (!mail) {
    return {
      status: "error",
      message: `Mail with id: ${mailId} not found`,
    };
  }
  const subscription = mail.newsSubscription;
  const userId = subscription.userId;
  const user = await getUser({ userId });

  if (!user) {
    return {
      status: "error",
      message: `User with id: ${userId} not found`,
    };
  }

  const email = user.emailAddresses[0].emailAddress;

  const ses = new SES({ region: "us-east-1" });

  ses.sendEmail({
    Source: "NewsClocker Insight <notification@newsclocker.com>",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: `NewsClocker - ${subscription.name}`,
      },
      Body: {
        Html: {
          Data: await render(Notification({ mail, subscription })),
        },
      },
    },
  });

  return {
    status: "success",
    message: `Email sent to User ${userId} successfully.`,
  };
};

export default sendEmail;
