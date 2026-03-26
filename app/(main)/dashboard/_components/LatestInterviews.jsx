"use client"

import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React from 'react'

function LatestInterviews() {
    const [interviewList, setInterviewList] = React.useState([]);
  return (
    <div className='my-5 flex flex-col gap-5 items-center justify-center rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Previously Created Interviews</h2>

      <Video className='p-3 text-primary bg-gray-100 rounded-lg h-12 w-12' />
      <p className='text-gray-500'>No interviews created yet. Start by creating a new interview session.</p>
      <Button> + Create New Interview</Button>
    </div>
  )
}

export default LatestInterviews