import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  if (process.env.DISABLE_ANTHROPIC) {
    return NextResponse.json({
      result: "Example response",
    });
  }
  try {
    const { image, systemPrompt, textPrompt } = await request.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    // Ensure the image data is valid base64
    if (!/^[A-Za-z0-9+/=]+$/.test(image)) {
      return NextResponse.json(
        { error: "Invalid base64 image data" },
        { status: 400 }
      );
    }

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: image,
              },
            },
            { type: "text", text: textPrompt },
          ],
        },
      ],
    });

    return NextResponse.json({
      result: (msg.content[0] as { text: string }).text,
    });
  } catch (error) {
    console.error("Error calling Claude API:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
