import { NextRequest, NextResponse } from "next/server";
const example_schema = {
  category: "",
  flashcards: [
    {
      question: "",
      answer: "",
    },
  ],
};

export async function POST(request: NextRequest) {
  const ctx = await request.json();
  if (!ctx.data)
    return NextResponse.json({ message: "invalid context" });
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Provide output in valid JSON. The data should follow this structure: ${JSON.stringify(
              example_schema
            )}. Return ONLY the JSON structure, with no additional text or formatting.`,
          },
          {
            role: "user",
            content: `You are a professional professor teaching classes to college students. As students input their notes, you are creating flashcards for them to study for exams. The notes provided are ${ctx.data}. Please return the result using the schema ${example_schema}. with no additional text or formatting.`,
          },
        ],
      }),
    }
  );
  if (response.status === 429)
    return NextResponse.json({
      statusCode: 429,
      message: "Ratelimited. Try again later",
    });

  const data = await response.json();
  console.log(data)
  if(!data) return  NextResponse.json({ statusCode: 500, message: null });
  const { finish_reason, message } = data.choices[0];
  if (finish_reason === "stop")
    
    return NextResponse.json({ statusCode: 200, message: message.content });

  return NextResponse.json({ statusCode: 500, message: null });
}
