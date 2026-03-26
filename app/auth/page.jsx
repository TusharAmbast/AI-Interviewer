"use client"
import { supabase } from '@/services/supabaseClient'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'


function login() {

  const signinwithgoogle = async() => {
    const{error} = await supabase.auth.signInWithOAuth({
      provider:'google'
    })

    if(error){
      console.error('Error',error.message)  
    }

  }


  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center bg-gray-100 rounded-2xl shadow-lg p-10'cl>
          <Image src="/Logo.png" alt="logo" 
          width={400} 
          height={200}
          className="w-[160px]" />
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 mt-5">
            <Image src="/login.png" alt="login" 
            width={400} 
            height={200}
            className="w-[400px] h-[250px]" />

            <h2 className="text-2xl font-bold text-center mt-5">Welcome to AICruiter App</h2>
            <p className="text-gray-600 text-center mt-3">Please Sign up to continue.</p>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={signinwithgoogle}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login