'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { loadStripe } from '@stripe/stripe-js';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Get current user on mount
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const handleCheckout = async (priceType: 'free' | 'coffee' | 'oneTime' | 'subscription') => {
    setLoading(priceType);

    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Please sign in to continue');
        router.push('/auth');
        return;
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceType,
          accessToken: session.access_token
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert('Error: ' + error);
        setLoading(null);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">
              Choose Your Path
            </h1>
            <p className="text-lg text-white/70">
              Start free, support our mission, or unlock everything. You decide.
            </p>
          </div>

          {/* Pricing Grid - 2x2 - Compact */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* FREE TRIAL */}
            <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-slate-300">
              <div className="text-center">
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  START HERE
                </div>
                <h2 className="text-2xl font-bold text-navy mb-1">
                  Free Trial
                </h2>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-navy">$0</span>
                </div>
                <p className="text-sm text-navy/70 mb-4">
                  No credit card required
                </p>
              </div>

              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Lessons 1-10</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">First chord shapes</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Progress tracking</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout('free')}
                disabled={loading === 'free'}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'free' ? 'Processing...' : 'Start Free'}
              </button>
            </div>

            {/* BUY ME A COFFEE */}
            <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-slate-300">
              <div className="text-center">
                <div className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  SHOW SUPPORT
                </div>
                <h2 className="text-2xl font-bold text-navy mb-1">
                  Buy Me a Coffee
                </h2>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-navy">$5</span>
                </div>
                <p className="text-sm text-navy/70 mb-4">
                  Love the free lessons? ☕
                </p>
              </div>

              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Same as free (1-10)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Support free content</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">It's really appreciated!</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout('coffee')}
                disabled={loading === 'coffee'}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'coffee' ? 'Processing...' : 'Send Coffee ☕'}
              </button>
            </div>

            {/* FOUNDATION PHASE (One-Time) */}
            <div className="bg-white rounded-xl p-6 shadow-xl border-4 border-gold">
              <div className="text-center">
                <div className="inline-block bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold mb-3">
                  BEST VALUE
                </div>
                <h2 className="text-2xl font-bold text-navy mb-1">
                  Foundation Phase
                </h2>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-navy">$29</span>
                  <span className="text-lg text-navy/60">.99</span>
                </div>
                <p className="text-sm text-navy/70 mb-4">
                  One-time. Lifetime access.
                </p>
              </div>

              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Foundation Lessons 1 through 30.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Lifetime access</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">No recurring fees</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout('oneTime')}
                disabled={loading === 'oneTime'}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3 px-6 rounded-lg text-base transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'oneTime' ? 'Loading...' : 'Buy Now - $29.99'}
              </button>
            </div>

            {/* MONTHLY SUBSCRIPTION */}
            <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-navy/20">
              <div className="text-center">
                <div className="inline-block bg-navy text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  ALL ACCESS
                </div>
                <h2 className="text-2xl font-bold text-navy mb-1">
                  Monthly Subscription
                </h2>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-navy">$9</span>
                  <span className="text-lg text-navy/60">.99</span>
                  <span className="text-sm text-navy/60">/mo</span>
                </div>
                <p className="text-sm text-navy/70 mb-4">
                  Less than two Lattes per month
                </p>
              </div>

              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">All Lessons, currently 1-32.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Future updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-navy/80">Cancel anytime</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout('subscription')}
                disabled={loading === 'subscription'}
                className="w-full bg-navy hover:bg-navy-light text-white font-bold py-3 px-6 rounded-lg text-base transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'subscription' ? 'Loading...' : 'Subscribe - $9.99/mo'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
