import { NextRequest, NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

// New API route handler
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!params.userId) {
    return NextResponse.json({ imageUrl: undefined }, { status: 200 });
  }

  if (params.userId == "public") {
    return NextResponse.json({ imageUrl: undefined }, { status: 200 });
  }

  const client = await clerkClient();
  const response = await client.users.getUser(params.userId);
  return NextResponse.json({ imageUrl: response.imageUrl }, { status: 200 });
}
