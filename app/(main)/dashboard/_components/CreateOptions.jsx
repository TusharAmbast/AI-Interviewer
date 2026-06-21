"use client"

import React from 'react'
import { GalleryThumbnails, Link, Video } from 'lucide-react';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CreateOptions() {

    const route = useRouter();
    return (
        <div className='grid grid-cols-2 gap-5'>
            <div onClick={() => route.push('/dashboard/create-interview')} className='bg-card border border-border rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow duration-300'>
                <Video className='p-3 text-primary bg-primary/10 rounded-lg h-12 w-12' />
                <h2 className='font-bold text-xl text-card-foreground mt-2'>Create New Interview</h2>
                <p className='text-muted-foreground'>Start a new AI-driven interview session</p>
            </div>
            <div className='bg-card border border-border rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow duration-300' onClick={() => route.push('/all-interview')}>
                <GalleryThumbnails className='p-3 text-primary bg-primary/10 rounded-lg h-12 w-12' />
                <h2 className='font-bold text-xl text-card-foreground mt-2'>View Interviews</h2>
                <p className='text-muted-foreground'>Review and manage your scheduled interviews</p>

            </div>
        </div>

    )
}

export default CreateOptions