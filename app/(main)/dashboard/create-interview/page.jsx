"use client"

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './FormContainer';
import QuestionsList from './_components/QuestionsList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import interview_id from '@/app/(main)';

function CreateInterview() {
    const route = useRouter();
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState();
    const onHandleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        console.log("formData:", formData);
    };

    const OnGoToNext = () => {
        if (formData?.jobTitle == "" || formData?.jobDescription == "" || formData?.interviewDuration == "" || formData?.interviewType?.length == 0) {
          toast("Please fill all the fields")
          return;
        }
        else {          
          setStep(step+1);
        }
    };

    return (
    <div className='mt-10 px-10 md:px-24 lg:px-36 xl:px-48'>
        <div className='flex flex-gap-10 items-center'>
            <ArrowLeft onClick={route.back} className='cursor-pointer'/>
            <h2 className='my-3 font-bold text-2xl ml-3'>Create Interview</h2>
        </div>
        <Progress value={step * 33.3} className='w-full ' />
        {step ==1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={() => OnGoToNext()} />
        : step == 2 ? <QuestionsList formData={formData}/> 
        : step == 3 ? 
        <InterviewLink interview_id={interview_id}
            formData={formData} /> : null}
    </div>
  )
}

export default CreateInterview