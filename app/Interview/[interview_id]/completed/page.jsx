import React from 'react';
import { CheckCircle2, LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function InterviewCompleted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      {/* Success Icon */}
      <div className="bg-green-50 p-6 rounded-full mb-8 animate-in zoom-in duration-500">
        <CheckCircle2 className="w-24 h-24 text-green-500" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        Interview Completed Successfully!
      </h1>

      {/* Subtext */}
      <p className="text-lg text-gray-500 max-w-lg mb-10">
        Great job! Your AI interview has concluded and your feedback has been successfully generated and securely saved to your profile.
      </p>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
        <Link 
          href="/dashboard" 
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-all shadow-sm"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go to Dashboard
        </Link>

        {/* If you have a specific feedback page, you can route them there. 
            Otherwise, a secondary 'Home' button works well. */}
        <Link 
          href="/" 
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm"
        >
          Return Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default InterviewCompleted;