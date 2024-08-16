import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../utils/functions";
import z from "zod";

export async function POST(request: NextRequest, response: NextResponse) {
  const { error, data } = z
    .object({ userId: z.string() })
    .safeParse(await request.json());
  if (error) return NextResponse.json({ data: error, status: 403 });
  const user = await getUser(data.userId);
  if(!user) return NextResponse.json({ data: "No user found", status: 404 })
  return NextResponse.json({ data: user, status: 200 });
}
