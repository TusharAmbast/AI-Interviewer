"use client"

import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'        
import Image from 'next/image';


function InterviewLayout({children}) {
  return (
    <div className='bg-secondary'>
        <InterviewHeader />
        {children}
    </div>
  ) 
}

export default InterviewLayout