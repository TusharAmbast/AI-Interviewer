
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'   
import { InterviewTypes } from '@/services/Constants'
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils';


function FormContainer({onHandleInputChange, GoToNext}) {

    const [interviewType, setInterviewType] = React.useState([]);

    useEffect(() => {
        if (interviewType)
        onHandleInputChange('interviewType', interviewType);
    }, [interviewType])


    const addInterviewType = (type) => {
        const data = interviewType.includes(type);
        if (data) {
            setInterviewType(prev => prev.filter(item => item !== type));
        } else {
            setInterviewType(prev => [...prev, type]);
        }
    }
 
    return (
        <div className='bg-card p-5 rounded-lg shadow-md mt-3 border border-border'>
            <div>
                <h2 className='text-lg font-medium text-card-foreground'>Job Title</h2>
                <Input type="text" className='w-full border-border bg-background text-foreground rounded-md p-2' placeholder='Enter the job title' onChange={(event) => onHandleInputChange('jobTitle', event.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium text-card-foreground'>Job Description</h2>
                <Textarea className='w-full border-border bg-background text-foreground rounded-md p-2 h-[200px]' placeholder='Enter the job description' onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}></Textarea>
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium text-card-foreground'>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-[180px] bg-background border-border text-foreground">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                        <SelectGroup>
                        <SelectItem value="15 min">15 minutes</SelectItem>
                        <SelectItem value="30 min">30 minutes</SelectItem>
                        <SelectItem value="45 min">45 minutes</SelectItem>
                        <SelectItem value="60 min">60 minutes</SelectItem>
                        <SelectItem value="90 min">90 minutes</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium text-card-foreground'>Interview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2'>
                    {InterviewTypes.map((type,index) => (
                        <div key={index} className={cn(
                        'flex items-center gap-2 p-1 px-2 rounded-2xl border border-border cursor-pointer hover:bg-muted transition-colors',
                        interviewType.includes(type.name) ? 'bg-primary/20 text-primary border-primary/50' : 'text-foreground'
                        )}
                        onClick={() => addInterviewType(type.name)}>
                            {type.icon && <type.icon className={cn('w-4 h-4', interviewType.includes(type.name) ? 'text-primary' : 'text-muted-foreground')} />}
                            <span className='text-[16px]'>{type.name}</span>
                        </div>
                    ))}

                </div>
            </div>
            <div className='mt-5 flex justify-end' onClick={GoToNext}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generate Questions<ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer