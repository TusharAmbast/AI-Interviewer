"use client"

import {useUser} from '@/app/provider';
import React from 'react'
import Image from 'next/image';

function WelcomeContainer() {
    const {user} = useUser();
    console.log("Image URL is:", user?.Picture);
  return (
    <div className='bg-white rounded-lg p-6 shadow-md flex justify-between items-center'>
        <div>
            <h1 className='text-xl font-bold'>Welcome Back, {user?.user_metadata?.full_name || user?.user_metadata?.Name || 'User'}</h1>
            <h1 className='text-gray-500'>AI Driven Interviews, Hassle-Free Hirings</h1>
        </div>
        {user && 
            <Image 
                src={user?.Picture} 
                alt="User Avatar" 
                width={40} 
                height={40} 
                className="rounded-full" 
              />
        }
    </div>
  )
}

export default WelcomeContainer