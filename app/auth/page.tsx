'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        setMessage('Check your email for the verification link!');
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Redirect to lessons on successful sign in
        router.push('/lessons');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
            <span className="text-3xl">🎸</span>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-2 font-accent">
            Guitar Mastery Hub
          </h1>
          <p className="text-navy/70">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>
        </div>

        {/* Toggle Sign Up / Sign In */}
        <div className="flex gap-2 mb-6 bg-navy/10 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
              isSignUp
                ? 'bg-gold text-navy'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
              !isSignUp
                ? 'bg-gold text-navy'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 border-2 border-green-400 rounded-lg">
            <p className="text-green-700 text-sm font-semibold">{message}</p>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-navy mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-navy mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              placeholder="••••••••"
            />
            <p className="text-xs text-navy/60 mt-1">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 disabled:bg-gray-400 text-navy font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>
        </form>

        {/* Email Verification Notice */}
        {isSignUp && (
          <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <p className="text-blue-700 text-sm font-semibold">
              📧 After signing up, check your email for a verification link.
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="text-sm text-navy/70 hover:text-gold transition-colors font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Benefits */}
        <div className="mt-6 pt-6 border-t-2 border-navy/10">
          <p className="text-xs text-navy/60 text-center mb-3 font-semibold">What You Get:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-[10px]">✓</span>
              <span className="text-navy/70">32 Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-[10px]">✓</span>
              <span className="text-navy/70">Progress Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-[10px]">✓</span>
              <span className="text-navy/70">Practice Log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-[10px]">✓</span>
              <span className="text-navy/70">Your Own Pace</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
