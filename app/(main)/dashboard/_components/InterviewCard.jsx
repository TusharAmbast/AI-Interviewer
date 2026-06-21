import React from 'react'
import moment from 'moment';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';  
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

function InterviewCard( { interview, viewDetails = false } ) {
  
  const copyLink = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id);
    toast.success("Interview link copied to clipboard!");
  };

  const onsend = () => {
    window.location.href = "mailto:?tushara@gmail.com?subject= AI interview link &body=Here is the interview link: " + process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  }

  return (
    <div className='p-5 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300'>
        <div className='flex items-center justify-between'>
            <div className='h-[30px] w-[30px] bg-primary rounded-full'></div>
            <h2 className="text-muted-foreground">{moment(interview?.created_at).format('DD MMM YYYY')}</h2>
        </div>
        <h2 className='font-bold text-lg mt-2 text-card-foreground'>{interview?.jobTitle}</h2>
        <p className='text-muted-foreground mt-2 flex justify-between'>{interview?.interviewDuration}
        <span className='gap-2'>{interview?.['interview-feedback']?.length} Candidates</span></p>
        { !viewDetails?
            <div className='flex items-center gap-5 mt-4 w-full'>
                <Button variant="outline" size="sm" onClick={copyLink} className="border-border text-foreground hover:bg-muted/50">
                    <Copy /> Copy link
                </Button>
                <Button onClick={onsend} className="bg-primary text-primary-foreground hover:bg-primary/90"> <Send /> Send</Button>
            </div>
            :
            <Link href={`/scheduled-interview/${interview?.interview_id}/details`} >
                <Button className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">View Detail <ArrowRight /></Button>
            </Link>
        }
    </div>
  )
}

export default InterviewCard