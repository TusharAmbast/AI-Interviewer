import React from 'react'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Mail, MessageCircle, SquareMousePointer } from 'lucide-react';
import { Clock } from 'lucide-react';
import { List } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function InterviewLink({interview_id, formData}) {

    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`;
    const getInterviewUrl = () => {
      return url;
    };
    const onCopyLink = async() => {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Interview link copied to clipboard!') // Show success message
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
        });
    };

    return (
    <div>
      <div className='flex items-center justify-center flex-col gap-10 mt-8'>
        <Image src="/check.webp" alt="Description" width={100} height={100} />
      </div><div className='text-center'>
          <h2 className='text-2xl font-bold items-center justify-center mt-4'>Interview Created Successfully!</h2>
          <p className='text-center text-gray-700 mt-4'>Share the link below with your candidates:</p>
      </div>
      <div className='bg-gray-100 p-4 rounded-md mt-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl'>Interview Link:</h2>
          <h2 className='text-blue-500 font-semibold underline p-1 px-2'>Valid For 30 Days</h2> 
        </div>
        <div className='flex items-center gap-2 mt-2'>
            <Input defaultValue={getInterviewUrl()} disabled={true} />
            <Button onClick={() => onCopyLink()}>
                <Copy />Copy Link
            </Button>
        </div>  
        <div className='flex gap-10 mt-4'>
            <h4 className='text-gray-700'><Clock />{formData.duration}</h4>  
            <h4 className='flex gap-2 text-gray-700'><List />10 Questions</h4>  
        </div>     
      </div> 
      <div className='bg-gray-100 p-4 rounded-md mt-8 w-full'>
        <h3 className='text-bold'>Share Via:</h3>
        <div className='mt-3 gap-5 flex'>
          <Button variant="outline"> <Mail />Gmail</Button>
          <Button variant="outline"> <SquareMousePointer />LinkedIn</Button>
          <Button variant="outline" > <MessageCircle />WhatsApp</Button>
        </div>
      </div> 
      <div className="flex w-full mt-4 justify-between items-center bg-gray-50 p-4">
      
      {/* Outline Button */}
      <Link href="/dashboard">
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 font-medium text-sm transition-colors">
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </Link>

      {/* Primary Solid Button */}
      <Link href="/create-interview">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 font-medium text-sm transition-colors">
          <Plus size={18} />
          Create New Interview
        </button>
      </Link>
      
    </div>
    </div>
  )
}

export default InterviewLink