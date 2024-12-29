import sendEmail from "@/app/actions/mail/send-email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { mailId: string } }
) {
  try {
    const mailId = params.mailId;
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 401 });
    }

    const response = await sendEmail({ mailId });

    if (response.status == "success") {
      return NextResponse.json({ message: response.message }, { status: 200 });
    } else {
      return NextResponse.json({ message: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unexpected Error" }, { status: 500 });
  }
}
