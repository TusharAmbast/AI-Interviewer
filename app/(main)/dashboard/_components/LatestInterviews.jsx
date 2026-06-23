"use client"

import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React, { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from './InterviewCard';

function LatestInterviews() {
    const [interviewList, setInterviewList] = React.useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getInterviewList();
    }, [user]);

    const getInterviewList = async () => {
        let { data: Interview, error } = await supabase
            .from('Interview')
            .select('*')
            .eq('userEmail', user?.Email) 
            .order('id', { ascending: false })
            .limit(6);
        
        console.log('Fetched interviews:', Interview);
        
        if (Interview) {
            setInterviewList(Interview);
        }
    }

    return (
        <div className='my-5 flex flex-col gap-5 items-center justify-center rounded-lg p-5'>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90"> + Create New Interview</Button>
            
            <h1 className='font-bold text-2xl mt-4 text-foreground'>Previously Created Interviews</h1>
            {/* Conditional Rendering: Check if array has items */}
            {interviewList && interviewList.length > 0 ? (
                // If TRUE: Show the grid of interview cards
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-2'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} />
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
    )
}

export default LatestInterviews;