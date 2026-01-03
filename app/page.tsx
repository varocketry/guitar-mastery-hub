'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import { signIn } from '@/lib/supabase';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    async function checkUser() {
      const { user } = await getCurrentUser();
      if (user) {
        router.push('/dashboard');
      } else {
        setIsCheckingAuth(false);
      }
    }
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await signIn(email);
    setLoading(false);
    
    if (error) {
      setMessage('Error sending magic link. Please try again.');
    } else {
      setMessage('Check your email for the magic link!');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                Guitar Mastery Hub
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-gray-300 hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </a>
              <button
                onClick={() => {
                  const loginSection = document.getElementById('login');
                  loginSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Master Guitar at
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                Your Own Pace
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              46 comprehensive lessons designed for adult learners. From complete beginner to confident player in weeks, not years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#login"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
              >
                Start Free Trial (14 Lessons)
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-lg font-semibold rounded-lg border border-slate-600 transition"
              >
                Learn More
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              No credit card required • 14 lessons free forever
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden">
              {/* Image placeholder - replace with actual image */}
              <div className="text-center">
                <svg className="w-24 h-24 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-gray-500">Hero Image: Person playing guitar</p>
                <p className="text-gray-600 text-sm mt-2">(Add professional photo from Unsplash)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Why Guitar Mastery Hub?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Designed specifically for adult learners who want real progress, not false promises
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">46 Comprehensive Lessons</h3>
              <p className="text-gray-400">
                Each lesson averages 7,000-9,000 words - 4x more detailed than competitors. No shortcuts, just complete mastery.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Learn at Your Pace</h3>
              <p className="text-gray-400">
                No rigid schedules. Progress when YOU'RE ready. User-controlled advancement based on actual mastery, not arbitrary timelines.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Practice Tools</h3>
              <p className="text-gray-400">
                Success criteria checkboxes, troubleshooting guides, and practice tracking. Know exactly when you're ready to advance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Science-Based Methods</h3>
              <p className="text-gray-400">
                "Slow is smooth, smooth is fast." Shape-based learning that makes advanced techniques accessible from day one.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Complete Music Theory</h3>
              <p className="text-gray-400">
                Foundation (30 lessons) + Major Keys (8 lessons) + Minor Keys (8 lessons). Understand music, don't just memorize.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Built for Adults</h3>
              <p className="text-gray-400">
                No cartoons, no kids' songs. Serious instruction for serious students who want real musical ability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join Hundreds of Students Mastering Guitar
          </h2>
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <p className="text-lg text-gray-300 italic mb-4">
              "I tried JustinGuitar and Fender Play but always felt rushed. Guitar Mastery Hub lets me master each technique before moving on. In 3 months, I've learned more than 2 years of scattered YouTube lessons."
            </p>
            <p className="text-gray-400">— Adult Learner</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Simple, Honest Pricing
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Start with 14 free lessons. Unlock everything when you're ready.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>First 14 lessons</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete foundation basics</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interactive features</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No credit card needed</span>
                </li>
              </ul>
              <a
                href="#login"
                className="block w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-center transition"
              >
                Start Free
              </a>
            </div>

            {/* One-Time Purchase */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Lifetime Access</h3>
              <p className="text-blue-200 mb-6">Pay once, learn forever</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29.99</span>
                <span className="text-blue-200">/one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-white">
                  <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All 46 lessons</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete theory modules</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Future updates included</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Download & keep forever</span>
                </li>
              </ul>
              <a
                href="#login"
                className="block w-full py-3 bg-white hover:bg-gray-100 text-blue-900 font-semibold rounded-lg text-center transition"
              >
                Get Lifetime Access
              </a>
            </div>

            {/* Monthly Subscription */}
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-2">Monthly</h3>
              <p className="text-gray-400 mb-6">Flexible subscription</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All 46 lessons</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cancel anytime</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access while subscribed</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Switch to lifetime anytime</span>
                </li>
              </ul>
              <a
                href="#login"
                className="block w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-center transition"
              >
                Start Monthly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Start Your Journey
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Enter your email to get started
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 disabled:to-blue-900 text-white font-semibold rounded-lg transition"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            {message && (
              <div className={`mt-4 p-3 rounded-lg ${
                message.includes('Check') 
                  ? 'bg-green-900/30 border border-green-700 text-green-300' 
                  : 'bg-red-900/30 border border-red-700 text-red-300'
              }`}>
                {message}
              </div>
            )}

            <p className="mt-6 text-sm text-gray-400 text-center">
              We'll send you a secure login link. No password needed!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Guitar Mastery Hub</h3>
              <p className="text-gray-400 text-sm">
                Professional guitar instruction designed for adult learners who want real mastery.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white text-sm">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</a></li>
                <li><a href="#login" className="text-gray-400 hover:text-white text-sm">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Guitar Mastery Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
