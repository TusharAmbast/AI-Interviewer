import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"

function CandidateFeedbackDialog({item}) {
    const feedback = item?.feedback 
  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button className='text-primary border-primary hover:bg-primary/10' variant='outline'>View Report</Button>
        </DialogTrigger>
        <DialogContent className="bg-card text-card-foreground border-border max-w-2xl">
            <DialogHeader>
            <DialogTitle className='text-xl font-bold text-foreground'>Candidate Feedback</DialogTitle>
            <DialogDescription asChild>
                <div className="mt-4">
                    <div className='flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border'>
                        <h2 className='text-lg font-semibold rounded-full bg-primary/10 text-primary p-3 w-14 h-14 flex items-center justify-center uppercase'>
                            {item?.userName?.[0]}
                        </h2>
                    <div>
                        <h2 className='text-lg font-bold text-foreground'>{item?.userName}</h2>
                       <h2 className='text-muted-foreground'> {item?.userEmail}</h2>    
                   </div>
                </div>
                <div className='mt-6'>
                    <h2 className='text-lg font-bold text-foreground mb-4'>Skill Assessment</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6'>
                        <div>
                        <h3 className='text-sm font-semibold flex justify-between text-foreground mb-2'>Technical Skills <span className="text-muted-foreground">({feedback?.feedback?.rating?.technicalSkills}/10)</span></h3>
                        <Progress value={feedback?.feedback?.rating?.technicalSkills * 10} className='h-2'/>
                        </div>
                        <div>
                        <h3 className='text-sm font-semibold flex justify-between text-foreground mb-2'>Communication <span className="text-muted-foreground">({feedback?.feedback?.rating?.communication}/10)</span></h3>
                        <Progress value={feedback?.feedback?.rating?.communication * 10} className='h-2'/>
                        </div>
                        <div>
                        <h3 className='text-sm font-semibold flex justify-between text-foreground mb-2'>Problem Solving <span className="text-muted-foreground">({feedback?.feedback?.rating?.problemSolving}/10)</span></h3>
                        <Progress value={feedback?.feedback?.rating?.problemSolving * 10} className='h-2'/>
                        </div>
                        <div>
                        <h3 className='text-sm font-semibold flex justify-between text-foreground mb-2'>Experience <span className="text-muted-foreground">({feedback?.feedback?.rating?.experince}/10)</span></h3>
                        <Progress value={feedback?.feedback?.rating?.experince * 10} className='h-2'/>
                        </div>
                    </div>
                    </div>
                    <div className="mt-8 border-t border-border pt-6">
                        <h2 className='text-lg font-bold text-foreground mb-2'>Summary</h2>
                        <p className='text-muted-foreground leading-relaxed'>{feedback?.summary}</p>
                    </div>
                    <div className={`p-5 rounded-lg mt-6 border ${feedback?.Recommendation == 'No' ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                        <h2 className={`font-semibold mb-2 ${feedback?.Recommendation == 'No' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>Recommendation Message:</h2>
                        <p className={` ${feedback?.Recommendation == 'No' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{feedback?.RecommendationMsg}</p>
                    </div>
                </div> 
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default CandidateFeedbackDialog