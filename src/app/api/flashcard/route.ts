import { createBatchNotes } from "@/app/lib/firebase/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const ctx = await request.json();
  const parser = z.object({
    userId: z.string(),
    data: z.object({
      category: z.string(),
      content: z.array(z.object({ answer: z.string(), question: z.string() })), // Use array to match the function's requirement
    }),
  });
  const { error, data } = parser.safeParse(ctx);
  if (error) return NextResponse.json({ data: error, status: 403 });

  // Construct FlashcardRaw object
  const flashcards = {
    category: data.data.category,
    flashcards: data.data.content,
  };

  // Pass correct arguments to createBatchNotes
  const noteId = await createBatchNotes(flashcards, data.userId);
  return NextResponse.json({ id: noteId });
}
