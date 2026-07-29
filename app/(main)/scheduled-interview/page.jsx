"use client";
import { useUser } from '@/app/provider';
import React, { useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';
import InterviewCard from '../dashboard/_components/InterviewCard'; 
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ScheduleInterview() {
    // 1. Get the user at the top level of the component
    const { user } = useUser();
    const [interviewList, setInterviewList] = React.useState([]);
    // 2. Put useEffect at the top level. 
    // This runs automatically whenever the 'user' variable changes.
    useEffect(() => {
        if (user) {
            getInterviewList();
        }
    }, [user]);

    // 3. Define your async function outside of the hooks
    const getInterviewList = async () => {
        const { data, error } = await supabase
            .from('Interview')
            .select('jobTitle, jobDescription, interviewDuration, type, interview_id, created_at, interview-feedback(userEmail)')
            .eq('userEmail', user?.Email) 
            .order('id', { ascending: false });

        if (error) {
            console.error("Supabase Error:", error);
            return;
        }

        // Now this will log perfectly!
        console.log('Fetched interviews:', data);
        setInterviewList(data);
    }
 
  return (
    <div>
        <h1 className='text-2xl font-bold text-foreground'>Full Interview Feedback</h1>
        {interviewList && interviewList.length > 0 ? (
                // If TRUE: Show the grid of interview cards
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-2'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} 
                        viewDetails={true} />
                    ))}
                </div>
            ) : (
                // If FALSE: Show the empty state message
                <div className='flex items-center justify-center gap-4 mt-5 p-10 bg-card rounded-lg border border-border w-full'>
                    <Video className='p-3 text-primary bg-primary/10 rounded-lg h-12 w-12' />
                    <p className='text-muted-foreground'>No interviews created yet. Start by creating a new interview session.</p>
                </div>
            )}
    </div>
  );
}

export default ScheduleInterview;