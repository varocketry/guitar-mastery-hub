'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in - if so, redirect to dashboard
  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    }
    checkUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Simple Navigation */}
      <nav className="fixed top-0 w-full bg-navy/95 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-2xl">🎸</span>
              </div>
              <span className="text-xl font-bold text-white">Guitar Mastery Hub</span>
            </div>
            <div className="flex gap-4">
              <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/auth" className="bg-gold hover:bg-gold/90 text-navy font-bold px-6 py-2 rounded-lg transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6">
            <span className="text-gold font-semibold text-sm">🎯 Adult Learning, Designed Right</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Learn Guitar at Your Own Pace
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto">
            Supported by adult learning science
          </p>
          
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            No rigid timelines. No pressure. Just comprehensive lessons that respect your schedule and learning style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/pricing" className="bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-lg w-full sm:w-auto">
              Start Learning Free
            </Link>
            <Link href="/pricing" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all border border-white/20 w-full sm:w-auto">
              View Pricing
            </Link>
          </div>
          
          <p className="text-white/50 text-sm mt-6">
            ✓ First 10 lessons free &nbsp;&nbsp;•&nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp;•&nbsp;&nbsp; ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 bg-navy/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Problem */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Most Guitar Courses Get It Wrong
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">"Day 1, Day 2, Day 3..."</h3>
                    <p className="text-white/70">Rigid timelines that ignore your schedule and learning speed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Superficial Content</h3>
                    <p className="text-white/70">1,000-word lessons that skip crucial details adults need</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">One-Size-Fits-All</h3>
                    <p className="text-white/70">Designed for kids, not working adults with limited practice time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                We Built Something Better
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="text-gold font-semibold mb-1">User-Controlled Progression</h3>
                    <p className="text-white/70">"Complete when ready" - move at YOUR pace, not ours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="text-gold font-semibold mb-1">4x More Detailed</h3>
                    <p className="text-white/70">7,000-9,000 word lessons with comprehensive explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="text-gold font-semibold mb-1">Adult Learning Science</h3>
                    <p className="text-white/70">Built on proven principles of how adults actually learn skills</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Master Guitar
            </h2>
            <p className="text-xl text-white/70">
              From complete beginner to confident player
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">32 Comprehensive Lessons</h3>
              <p className="text-white/70">
                Foundation Phase complete. Theory modules in development. Each lesson 7,000-9,000 words.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
              <p className="text-white/70">
                Practice session logs, completion tracking, and clear success criteria for every lesson.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Your Schedule</h3>
              <p className="text-white/70">
                Practice 15 minutes or 2 hours. Complete lessons in 2 days or 2 weeks. You decide.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎸</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real Songs</h3>
              <p className="text-white/70">
                Apply skills to actual music. No boring exercises - you'll play songs from day one.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-navy/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/70">
              Three simple steps to guitar mastery
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Start Free</h3>
                <p className="text-white/70 text-lg">
                  Try lessons 1-10 completely free. No credit card required. Learn your first chord shapes and strumming patterns.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Learn at Your Pace</h3>
                <p className="text-white/70 text-lg">
                  Work through lessons when it fits your schedule. Mark complete when you're ready, not when we tell you.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Build Real Skills</h3>
                <p className="text-white/70 text-lg">
                  Master chords, strumming, fingerstyle, lead playing, and music theory. Play the songs you love.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Start free or unlock everything. You decide.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            
            {/* Free */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Free Trial</h3>
              <div className="text-4xl font-bold text-gold mb-4">$0</div>
              <p className="text-white/70 mb-4">Lessons 1-10</p>
              <div className="text-sm text-white/60">Perfect to start</div>
            </div>

            {/* Coffee */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Coffee</h3>
              <div className="text-4xl font-bold text-gold mb-4">$5</div>
              <p className="text-white/70 mb-4">Support us</p>
              <div className="text-sm text-white/60">Totally optional</div>
            </div>

            {/* One-time */}
            <div className="bg-gold/10 rounded-xl p-6 border-2 border-gold">
              <div className="text-xs font-bold text-gold mb-2">BEST VALUE</div>
              <h3 className="text-xl font-bold text-white mb-2">Foundation</h3>
              <div className="text-4xl font-bold text-gold mb-4">$30</div>
              <p className="text-white/70 mb-4">All 30 lessons</p>
              <div className="text-sm text-white/60">Lifetime access</div>
            </div>

            {/* Monthly */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
              <div className="text-4xl font-bold text-gold mb-4">$10</div>
              <p className="text-white/70 mb-4">Per month</p>
              <div className="text-sm text-white/60">Cancel anytime</div>
            </div>

          </div>

          <Link href="/pricing" className="inline-block bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-lg">
            View Full Pricing
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-navy/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Hundreds of Adult Learners
            </h2>
            <p className="text-xl text-white/70">
              Real results from real students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-gold mb-4">★★★★★</div>
              <p className="text-white/80 mb-4 italic">
                "Finally, a course that doesn't rush me. I work full-time and can only practice 20 minutes a day. This is perfect."
              </p>
              <div className="text-white/60 text-sm">— Sarah M., Working Professional</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-gold mb-4">★★★★★</div>
              <p className="text-white/80 mb-4 italic">
                "The detail in each lesson is incredible. I've tried JustinGuitar and others - this is in a different league."
              </p>
              <div className="text-white/60 text-sm">— Mike R., Beginner Guitarist</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-gold mb-4">★★★★★</div>
              <p className="text-white/80 mb-4 italic">
                "No pressure, no timelines. Just solid instruction that respects my learning style. Exactly what I needed."
              </p>
              <div className="text-white/60 text-sm">— David K., Adult Learner</div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            
            {/* FAQ 1 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Do I really need to know nothing about guitar to start?
              </h3>
              <p className="text-white/70">
                Absolutely! We start from zero. Lesson 1 teaches you how to hold the guitar and your first two chords. No prior experience needed.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                How long does it take to complete the course?
              </h3>
              <p className="text-white/70">
                That's entirely up to you! We recommend 2-5 days per lesson, but you can move faster or slower. Most students complete the Foundation Phase (30 lessons) in 2-4 months.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                What if I can only practice 15 minutes a day?
              </h3>
              <p className="text-white/70">
                Perfect! Our lessons are designed for busy adults. 15-30 minutes of focused practice is better than 2 hours of unfocused noodling. You'll make steady progress.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-white/70">
                Yes! The monthly subscription has no commitment. Cancel anytime from your account settings. Or choose the one-time purchase for lifetime access with no recurring fees.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                What guitar do I need?
              </h3>
              <p className="text-white/70">
                Any acoustic or electric guitar works. We recommend starting with a comfortable acoustic guitar with light strings. Check Lesson 1 for specific guidance on choosing your first guitar.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-navy/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                How is this different from YouTube tutorials?
              </h3>
              <p className="text-white/70">
                YouTube is great for specific techniques, but lacks structure. We provide a complete, progressive curriculum designed by education professionals. Each lesson builds on the last with clear learning outcomes and practice strategies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-navy/30 to-navy/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Guitar Journey?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Join hundreds of adults learning guitar at their own pace
          </p>
          
          <Link href="/pricing" className="inline-block bg-gold hover:bg-gold/90 text-navy font-bold px-10 py-5 rounded-lg text-xl transition-all shadow-2xl">
            Start Learning Free Today
          </Link>
          
          <p className="text-white/50 text-sm mt-6">
            No credit card required • First 10 lessons free • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎸</span>
                </div>
                <span className="text-xl font-bold text-white">Guitar Mastery Hub</span>
              </div>
              <p className="text-white/60 text-sm">
                Adult guitar education designed with learning science, not timelines.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/pricing" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
                <Link href="/auth" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <p className="text-white/60 text-sm">
                Questions? Email us at<br />
                <a href="mailto:jimsutton@duck.com" className="text-gold hover:text-gold/80">
                  jimsutton@duck.com
                </a>
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © 2025 Guitar Mastery Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
