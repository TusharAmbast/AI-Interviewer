import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req){
    
    const { jobTitle, jobDescription, interviewType, interviewDuration } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT
    .replace(/{{jobTitle}}/g, jobTitle)
    .replace(/{{jobDescription}}/g, jobDescription)
    .replace(/{{type}}/g, interviewType.join(", "))
    .replace(/{{interviewDuration}}/g, interviewDuration);
    
    console.log("FINAL PROMPT", FINAL_PROMPT);
    
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
  
  return NextResponse.json({ questions: completion.choices[0].message })
}
catch(error){
    return NextResponse.json({ error: "Failed to generate interview questions" }, { status: 500 });
}
}