"use client"

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import { useUser } from '@/app/provider';
import CandidateList from './_components/CandidateList';

// Make sure to import useUser! (Assuming you are using Clerk here, adjust if using another auth provider)
 

function InterviewDetails() {
    const { interview_id } = useParams();
    const { user } = useUser(); 
    const [interviewDetails, setInterviewDetails] = React.useState();

    useEffect(() => {
        if (user) {
            getInterviewDetails();
        }
    }, [user]);

    const getInterviewDetails = async() => {
        const { data, error } = await supabase
            .from('Interview')
            .select(`jobTitle, jobDescription, interviewDuration, questionList, type, interview_id, created_at, 
                interview-feedback(userEmail,userName,feedback,created_at)`)
            .eq('userEmail', user?.Email) 
            .eq('interview_id', interview_id)
            .order('id', { ascending: false });

        console.log('Fetched interviews:', data);
        setInterviewDetails(data[0]);
    };

    
    return (
        <div className='mt-5'>
            <h1 className='text-2xl font-bold'>Interview Details</h1>
            <InterviewDetailContainer interviewDetails={interviewDetails} />
            <CandidateList detail={interviewDetails?.['interview-feedback']} />
        </div>
    );
} 

export default InterviewDetails