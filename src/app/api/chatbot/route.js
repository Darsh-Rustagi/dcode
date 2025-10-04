// src/app/api/chatbot/route.js
import { NextResponse } from 'next/server';

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const HF_TOKEN = process.env.HUGGING_FACE_API_KEY;

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Send the user's message to the Hugging Face Inference API
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: message,
      }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Hugging Face API Error:", errorText);
        // Sometimes the model needs to load, which can take time.
        if (response.status === 503) {
            return NextResponse.json({ error: 'Model is currently loading, please try again in a moment.' }, { status: 503 });
        }
        return NextResponse.json({ error: `Hugging Face API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    // The response is an array, we get the generated text from the first element
    const botResponse = data[0]?.generated_text || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply: botResponse });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}