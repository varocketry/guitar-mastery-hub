'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Payment Successful! 🎉
        </h1>

        <p className="text-lg text-slate-600 mb-6">
          Welcome to Guitar Mastery Hub! Your payment has been processed successfully.
        </p>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-700 mb-2">
            <strong>What's Next?</strong>
          </p>
          <ul className="text-sm text-slate-600 space-y-2 text-left">
            <li>✅ You now have access to all 46 lessons</li>
            <li>✅ Start with Lesson 1: First Two Chords</li>
            <li>✅ Learn at your own pace</li>
            <li>✅ Track your progress as you go</li>
          </ul>
        </div>

        {sessionId && (
          <p className="text-xs text-slate-400 mb-6">
            Session ID: {sessionId}
          </p>
        )}

        <Link
          href="/lessons"
          className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Start Learning Now →
        </Link>

        <p className="text-sm text-slate-500 mt-6">
          Check your email for a receipt and welcome message.
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
