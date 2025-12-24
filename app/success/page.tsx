'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // TODO: You could verify the session here
    // and update the user's subscription status in Supabase
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-navy mb-4">
              Payment Successful! 🎉
            </h1>
            
            <p className="text-xl text-navy/70 mb-8">
              Welcome to Guitar Mastery Hub! You now have full access to all Foundation Phase lessons.
            </p>

            <div className="space-y-4">
              <a 
                href="/lessons"
                className="block w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg"
              >
                Start Learning →
              </a>
              
              <a 
                href="/dashboard"
                className="block w-full bg-navy hover:bg-navy-light text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg"
              >
                Go to Dashboard
              </a>
            </div>

            {sessionId && (
              <p className="text-sm text-navy/40 mt-8">
                Session ID: {sessionId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
