import { NextRequest, NextResponse } from "next/server";
import { createUser, getUser } from "../../lib/firebase/utils/functions";
import z from "zod";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const schema = z.string();
  const { error, data } = schema.safeParse(userId);

  if (error) return NextResponse.json({ data: error, status: 403 });
  let user = await getUser(data);
  if (!user) user = await createUser(data, {})
  return NextResponse.json({ data: user, status: 200 });
}