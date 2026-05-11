import { FEEDBACK_PROMPT } from "@/services/Constants";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { conversation } = await request.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));

    
    try{
        const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,    
        })
        const completion = await openai.chat.completions.create({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          { role: "user", content: FINAL_PROMPT }
        ],
      })
      console.log('completion:', completion.choices[0].message); 
      return NextResponse.json({ feedback: completion.choices[0].message })
    }
    catch(error){
        console.error('Full error:', error?.message);       // ← log message
        console.error('Error status:', error?.status);      // ← log status  
        console.error('Error response:', error?.response);  // ← log response
        return NextResponse.json({ error: "Failed to generate interview feedback" }, { status: 500 });
    }
}