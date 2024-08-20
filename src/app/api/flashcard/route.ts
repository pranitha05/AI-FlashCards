import { createNote } from "@/app/lib/firebase/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const ctx = await request.json();
  const parser = z.object({
    userId: z.string(),
    data: z.object({
      category: z.string(),
      content: z.object({ answer: z.string(), question: z.string() }),
    }),
  });
  const { error, data } = parser.safeParse(ctx);
  if (error) return NextResponse.json({ data: error, status: 403 });
  const notes = await createNote(data.userId, data.data.category, data.data.content)
  return notes;
}
