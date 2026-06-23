"use client"

import {useUser} from '@/app/provider';
import React from 'react'
import Image from 'next/image';

function WelcomeContainer() {
    const {user} = useUser();
    console.log("Image URL is:", user?.Picture);
  return (
    <div className='bg-card rounded-lg p-6 shadow-md flex justify-between items-center border border-border'>
        <div>
            <h1 className='text-xl font-bold text-foreground'>Welcome Back, {user?.user_metadata?.full_name || user?.user_metadata?.Name || 'User'}</h1>
            <h1 className='text-muted-foreground'>AI Driven Interviews, Hassle-Free Hirings</h1>
        </div>
        {user && 
            <Image 
                src={user?.Picture} 
                alt="User Avatar" 
                width={40} 
                height={40} 
                className="rounded-full ring-2 ring-primary/20" 
              />
        }
    </div>
  )
}

export default WelcomeContainer