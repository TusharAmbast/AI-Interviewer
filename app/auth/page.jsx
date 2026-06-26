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
    <div className='flex flex-col items-center bg-background min-h-screen text-foreground'>
      <div className='flex flex-col items-center justify-center h-screen w-full px-4'>
        <div className='flex flex-col items-center justify-center bg-card border border-border rounded-2xl shadow-xl p-10 max-w-md w-full'>
          <Image src="/logo.png" alt="logo" 
          width={400} 
          height={200}
          className="w-[160px]" />
          <div className="flex flex-col items-center justify-center bg-muted/30 rounded-xl border border-border p-8 mt-8 w-full">
            <Image src="/login.png" alt="login" 
            width={400} 
            height={200}
            className="w-full max-w-[250px] object-contain drop-shadow-md" />

            <h2 className="text-2xl font-bold text-center mt-8 text-foreground">Welcome to AICruiter</h2>
            <p className="text-muted-foreground text-center mt-3 mb-6">Please Sign up to continue.</p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 px-4 rounded-xl shadow-lg transition-all"
            onClick={signinwithgoogle}>
              Sign In with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login