"use client"
import { InterviewDataContext } from '@/Context/InterviewDataContext'
import React, { useContext, useEffect, useState} from 'react'
import { Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import { Mic } from 'lucide-react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext)
  const interviewInfoRef = useRef(null);
  interviewInfoRef.current = interviewInfo;
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();
  const conversationRef = useRef([]);
  const generateFeedbackRef = useRef(null);  
  const isFeedbackGenerating = useRef(false);
  const callStartedRef = useRef(false);

  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  }

generateFeedbackRef.current = async () => {
  if (isFeedbackGenerating.current) return;
  isFeedbackGenerating.current = true;

  try {
    console.log('1. Conversation:', conversationRef.current);

    const result = await axios.post('/API/ai_feedback', {
      conversation: conversationRef.current
    });

    console.log('2. API result:', result?.data);
    const Content = result?.data?.feedback?.content;
    console.log('3. Raw content:', Content);

    if (!Content) {
      console.error('3. Content is empty, aborting');
      return;
    }

    // Extract JSON
    let FINAL_CONTENT = Content;
    if (Content.includes('```json')) {
      FINAL_CONTENT = Content.split('```json')[1].split('```')[0].trim();
    } else if (Content.includes('```')) {
      FINAL_CONTENT = Content.split('```')[1].split('```')[0].trim();
    }

    // Find JSON object using regex as fallback
    if (!FINAL_CONTENT.startsWith('{')) {
      const match = Content.match(/\{[\s\S]*\}/);
      if (match) {
        FINAL_CONTENT = match[0];
        console.log('3.1 Extracted via regex:', FINAL_CONTENT);
      }
    }

    console.log('3.2 Cleaned content:', FINAL_CONTENT);

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(FINAL_CONTENT);
      console.log('4. Parse SUCCESS:', parsedFeedback);
    } catch (parseError) {
      console.error('4. Parse FAILED:', parseError.message);
      console.error('4. At position:', FINAL_CONTENT?.substring(
        Math.max(0, parseInt(parseError.message.match(/\d+/)?.[0] ?? 0) - 20),
        parseInt(parseError.message.match(/\d+/)?.[0] ?? 0) + 20
      ));
      return;
    }

    console.log('4.1 interviewInfoRef:', interviewInfoRef.current);
    console.log('4.6 About to insert...');

    const { data: supabaseData, error: supabaseError } = await supabase
      .from('interview-feedback')
      .insert([{
        userName: interviewInfoRef.current?.userName,
        userEmail: interviewInfoRef.current?.userEmail,
        interview_id: interview_id,
        feedback: parsedFeedback,
        recommended: false
      }])
      .select();

    console.log('5. Supabase data:', supabaseData);
    console.log('5. Supabase error:', supabaseError);

    if (supabaseError) { console.error('Supabase error:', supabaseError); return; }
    console.log('6. Navigating...');
    router.replace(`/Interview/${interview_id}/completed`);

  } catch (err) {
    console.error('GenerateFeedback error:', err);
  } finally {
    isFeedbackGenerating.current = false;
  }
};
  // ✅ Event listeners registered ONCE
  useEffect(() => {
    const vapi = vapiRef.current;

    vapi.on('call-start', () => toast.success('Interview started'));
    vapi.on('speech-start', () => setActiveUser(false));
    vapi.on('speech-end', () => setActiveUser(true));
    vapi.on('message', (message) => {
      if (message?.conversation) {
        conversationRef.current = message.conversation;
      }
    });
    vapi.on('call-end', () => {
      toast.success('Interview ended');
      generateFeedbackRef.current(); // ✅ always calls latest version
    });

    return () => vapi.removeAllListeners();
  }, []); // ✅ runs once only

  // ✅ Start call when interviewInfo is available
  useEffect(() => {
    
    if (interviewInfo && !callStartedRef.current) {
      callStartedRef.current = true; // Immediately lock it so the second render ignores it
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map(item => item?.question)
      .join(', ');

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobTitle}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "11labs",
        voiceId: "paula",
      },
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Ask one question at a time and wait for the candidate's response before proceeding.
Questions: ${questionList}
Provide brief, encouraging feedback after each answer.
After all questions, wrap up and summarize their performance.
Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on ${interviewInfo?.interviewData?.jobTitle} role
          `.trim(),
        }],
      },
    };
    vapiRef.current.start(assistantOptions);
  };

  const stopInterview = () => {
    vapiRef.current.stop();
  };

  return (
    <div className='p-20 px-48'>
      <div className='flex gap-4 w-full items-center justify-between border-b'>
        <h2 className='font-bold text-xl'>AI Interview Session</h2>
        <span className='flex items-center gap-2 text-sm text-gray-500'>
          <Timer />
          00.00.00
        </span>
      </div>
      <div className='grid grid-cols-2 gap-7 mt-5 w-full'>
        <div className='bg-white rounded-lg border flex flex-col gap-3 h-[350px] items-center justify-center'>
          <div className='relative'>
            {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
            <Image src="/AI.webp" alt="AI" width={100} height={100}
              className='w-[60px] h-[60px] rounded-full object-cover'
            />
          </div>
          <h2>AI Interviewer</h2>
        </div>
        <div className='bg-white rounded-lg border flex flex-col gap-3 h-[350px] items-center justify-center'>
          <div className='relative'>
            {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
            <h1 className='bg-primary text-2xl p-3 px-5 text-white rounded-full'>{interviewInfo?.userName?.[0]}</h1>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className='w-full flex items-center justify-center gap-10 mt-10'>
        <Mic className='w-14 h-14 p-4 bg-blue-100 text-black rounded-full cursor-pointer' />
        <AlertConfirmation StopInterview={stopInterview}>
          <Phone className='w-14 h-14 p-4 bg-red-500 text-black rounded-full cursor-pointer' />
        </AlertConfirmation>
      </div>
    </div>
  );
}

export default StartInterview;