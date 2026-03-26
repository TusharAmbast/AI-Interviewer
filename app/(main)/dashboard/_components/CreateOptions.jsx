"use client"

import React from 'react'
import { Link, Video } from 'lucide-react';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CreateOptions() {

    const route = useRouter();
    return (
        <div className='grid grid-cols-2 gap-5'>
            <div onClick={() => route.push('/dashboard/create-interview')} className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow duration-300'>
                <Video className='p-3 text-primary bg-gray-100 rounded-lg h-12 w-12' />
                <h2 className='font-bold text-xl'>Create New Interview</h2>
                <p className='text-gray-500'>Start a new AI-driven interview session</p>
            </div>
            <div className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow duration-300' onClick={() => router.push('/dashboard/phone-screening')}>
                <Phone className='p-3 text-primary bg-gray-100 rounded-lg h-12 w-12' />
                <h2 className='font-bold text-xl'>Phone Screening</h2>
                <p className='text-gray-500'>Conduct a preliminary phone interview</p>

            </div>
        </div>

    )
}

export default CreateOptions