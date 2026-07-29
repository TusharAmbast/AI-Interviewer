import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react' 
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({detail}) {
  return (
    <div>
        <h2 className='text-2xl font-bold mt-8 text-foreground'>Candidates ({detail?.length})</h2>
        <div className="grid gap-4 mt-5">
        {detail?.map((item, index) => (
            <div key={index} className='p-4 bg-card rounded-lg border border-border shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:shadow-md transition-shadow'>
                <div className='flex items-center gap-4 '>
                <h2 className='text-lg font-semibold rounded-full bg-primary/10 text-primary p-3 w-12 h-12 flex items-center justify-center uppercase'>
                    {item?.userName[0]}
                </h2>
                <div>
                    <h2 className='text-lg font-semibold text-foreground'>{item?.userName}</h2>
                    <h2 className='text-sm text-muted-foreground'>Completed On: {moment(item?.created_at).format('MMM DD YYYY')}</h2>
                </div>
                </div>
                <CandidateFeedbackDialog item={item} />
            </div>          
        ))}
        </div>
    </div>
  )
}

export default CandidateList