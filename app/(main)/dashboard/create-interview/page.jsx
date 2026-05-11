"use client"

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './FormContainer';
import QuestionsList from './_components/QuestionsList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';

function CreateInterview() {
    const route = useRouter();
    
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [interviewId, setInterviewId] = useState(null);
    const { user } = useUser();

    const onHandleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const OnGoToNext = () => {
        if (user?.Credits <= 0) {
            toast("You don't have enough credits to create an interview. Please purchase more credits to continue.");
            return;
        }

        if (step === 1) {
            if (
                !formData.jobTitle ||
                !formData.jobDescription ||
                !formData.interviewDuration ||
                !formData.interviewType ||
                formData.interviewType.length === 0
            ) {
                toast("Please fill all the fields");
                return;
            }
        }
        // Just advance the step — saving is handled inside QuestionsList
        setStep((prev) => prev + 1);
    };

    return (
        <div className='mt-10 px-10 md:px-24 lg:px-36 xl:px-48'>
            <div className='flex gap-10 items-center'>
                <ArrowLeft onClick={route.back} className='cursor-pointer' />
                <h2 className='my-3 font-bold text-2xl ml-3'>Create Interview</h2>
            </div>

            <Progress value={step * 33.3} className='w-full' />

            <div className="mt-8">
                {step === 1 && (
                    <FormContainer
                        onHandleInputChange={onHandleInputChange}
                        GoToNext={OnGoToNext}
                    />
                )}

                {step === 2 && (
                    <QuestionsList
                        formData={formData}
                        GoToNext={OnGoToNext}
                        // Pass setter so QuestionsList can store the real DB id here
                        onInterviewCreated={(id) => setInterviewId(id)}
                    />
                )}

                {step === 3 && (
                    <InterviewLink
                        interview_id={interviewId}
                        formData={formData}
                    />
                )}
            </div>
        </div>
    );
}

export default CreateInterview;