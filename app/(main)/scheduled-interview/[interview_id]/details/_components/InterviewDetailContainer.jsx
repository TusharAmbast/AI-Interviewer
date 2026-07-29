import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import moment from 'moment'
import { List } from 'lucide-react' 

function InterviewDetailContainer({ interviewDetails }) {
  return (
    <div className='p-5 bg-card text-card-foreground rounded-lg border border-border mt-5 shadow-sm'>
      <h2 className='text-2xl font-bold'>{interviewDetails?.jobTitle}</h2>

      <div className='flex flex-wrap items-center gap-6 mt-2'>
        <div className='mt-4'>
            <h2 className='text-xs text-muted-foreground'>Duration</h2>
            <p className='flex text-sm font-bold items-center gap-2 text-foreground'> <Clock className='h-4 w-4 text-primary'/>{interviewDetails?.interviewDuration}</p>
        </div>
        <div className='mt-4'>
            <h2 className='text-xs text-muted-foreground'>Created on</h2>
            <p className='flex text-sm font-bold items-center gap-2 text-foreground'> <Calendar className='h-4 w-4 text-primary'/>{moment(interviewDetails?.created_at).format('MMM DD YYYY')}</p>
        </div>
        <div className='mt-4'>
            <h2 className='text-xs text-muted-foreground'>Type</h2>
            <p className='flex text-sm font-bold items-center gap-2 text-foreground'> <List className='h-4 w-4 text-primary'/> {interviewDetails?.type}</p>
        </div>
      </div>
      <div className='mt-5 pt-5 border-t border-border'>
        <h2 className='font-bold text-foreground'>Job Description</h2>
        <p className="text-muted-foreground mt-2">{interviewDetails?.jobDescription}</p>
      </div>
      <div className='mt-5 pt-5 border-t border-border'>
        <h2 className='font-bold text-foreground'>Interview Questions</h2>
        <div className="mt-3 bg-muted/30 p-4 rounded-lg border border-border">
                {interviewDetails?.questionList?.map((item, index) => (
                    <p key={index} className='mt-2 text-foreground'>
                        <span className="font-semibold text-primary mr-2">Q{index + 1}.</span> {item?.question}
                    </p>
                ))
            }
        </div>     
      </div>
    </div>
  )
}

export default InterviewDetailContainer