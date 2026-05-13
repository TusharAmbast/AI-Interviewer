"use client"

import React, { use, useContext, useEffect } from 'react';
import Image from 'next/image'; 
import { Clock, Loader2Icon, Router } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { InterviewDataContext } from '../../../Context/InterviewDataContext';

function Interview() {

  const {interview_id} = useParams();
  console.log(interview_id);

  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter();

    const getInterviewDetails = async() => {
    try{
    setLoading(true);
    let { data: Interview, error } = await supabase
    .from('Interview')
    .select("jobTitle,jobDescription,interviewDuration,type")
    .eq('interview_id', interview_id)

    setInterviewData(Interview[0]);
    setLoading(false);
    if(Interview?.length == 0) {
      toast('No interview found for ID:', interview_id);
    }
  } catch (error) {
    console.error('Error fetching interview details:', error);
    setLoading(false);
  }
  }

  useEffect(() => {
    interview_id && getInterviewDetails();
  }, [interview_id]);


  const onJoinInterview = async () => {
    setLoading(true);
  let { data: Interview, error } = await supabase
    .from('Interview')
    .select('*')
    .eq('interview_id', interview_id);

  if (error) { console.error(error); return; }
  if (!Interview || Interview.length === 0) { console.warn('No data found'); return; }

  console.log(Interview[0]); 
  setInterviewInfo({
    userName: userName,
    userEmail: userEmail,
    interviewData : Interview[0]
  });
  router.push(`/Interview/${interview_id}/start`);
  setLoading(false);
}
  return (
    <div className='p-10'>
      <div className='flex flex-col items-center justify-center border rounded-xl bg-white p-10'>
        <Image src={'/logo.png'} alt="Logo" width={100} height={100} className='w-[160px]'/>
        <h1 className='text-2xl font-bold mt-4'>Welcome to the AI Interviewer</h1>
        <p className='text-gray-600'>Your personal AI-powered interview assistant</p>
        <Image src={'/interview.webp'} alt="Interview" width={400} height={300} className='w-[400px] h-auto mt-10'/>
        <h2 className='text-xl font-semibold mt-10'>{interviewData?.jobTitle} Interview</h2>
        <h4 className='text-lg text-gray-600 mt-2 flex gap-2'><Clock className='flex'/> {interviewData?.interviewDuration}</h4>
        <div className='w-full px-10'>
          <h2>Enter your Name:</h2>
          <Input placeholder="eg. John Doe" onChange={(e) => setUserName(e.target.value)}/>
          <h2>Enter your Email:</h2>
          <Input placeholder="eg. John@gmail.com" onChange={(e) => setUserEmail(e.target.value)}/>
        </div>
        <div className='p-10 mt-10 bg-blue-50 rounded-lg'>
          <h2>Before you begin:</h2>
          <ul>
            <li>Make sure you are in a quiet environment</li>
            <li>Have your resume and any relevant documents ready</li>
            <li>Ensure your camera and microphone are working properly</li>
          </ul>
        </div>
        <Button className='mt-10'
        disabled={!userName || !userEmail}
          onClick={onJoinInterview} 
        >
          <Video/>{loading&&<Loader2Icon/>} Join Interview
        </Button>     
      </div>
    </div>
  )
}

export default Interview