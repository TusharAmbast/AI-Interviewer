
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
        <div className='bg-gray-100 p-5 rounded-lg shadow-md mt-3 '>
            <div>
                <h2 className='text-lg font-medium'>Job Title</h2>
                <Input type="text" className='w-full border border-gray-300 rounded-md p-2' placeholder='Enter the job title' onChange={(event) => onHandleInputChange('jobTitle', event.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium'>Job Description</h2>
                <Textarea className='w-full border border-gray-300 rounded-md p-2 h-[200px]' placeholder='Enter the job description' onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}></Textarea>
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium'>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
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
                <h2 className='text-lg font-medium'>Interview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2'>
                    {InterviewTypes.map((type,index) => (
                        <div key={index} className={cn(
                        'flex items-center gap-2 p-1 px-2 rounded-2xl border border-gray-300 cursor-pointer hover:bg-gray-200',
                        interviewType.includes(type.name) && 'bg-blue-300 text-blue-600'
                        )}
                        onClick={() => addInterviewType(type.name)}>
                            {type.icon && <type.icon className='w-4 h-4 text-primary' />}
                            <span className='text-[16px]'>{type.name}</span>
                        </div>
                    ))}

                </div>
            </div>
            <div className='mt-5 flex justify-end' onClick={GoToNext}>
                <Button >Generate Questions<ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer