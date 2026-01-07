'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎸</span>
            </div>
            <span className="text-xl font-bold text-[#1E3A8A]">Guitar Mastery Hub</span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-700 hover:text-[#1E3A8A] transition-colors font-medium">Features</a>
            <a href="#curriculum" className="text-gray-700 hover:text-[#1E3A8A] transition-colors font-medium">Curriculum</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#1E3A8A] transition-colors font-medium">Pricing</a>
            <Link 
              href="/auth" 
              className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#b8941f] transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image - Full Width on Top */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src="/hero-beach-musicians.png" 
                alt="Group of people playing acoustic guitars together on the beach at sunset - the community and joy of making music"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Text Content - Centered Below Image */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1E3A8A]">
              From Complete Beginner<br />
              to <span className="text-[#D4AF37]">Complete Musician</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Master guitar technique and music theory through a systematic, 
              user-controlled curriculum designed specifically for adult learners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                href="/auth"
                className="px-8 py-4 bg-[#D4AF37] text-white rounded-lg font-bold text-lg hover:bg-[#b8941f] transition-all shadow-lg"
              >
                Start Learning Today
              </Link>
              <a 
                href="#curriculum"
                className="px-8 py-4 border-2 border-[#1E3A8A] text-[#1E3A8A] rounded-lg font-semibold text-lg hover:bg-[#1E3A8A] hover:text-white transition-all"
              >
                Explore Curriculum
              </a>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-gray-600">
              First 14 lessons free (forever!) • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#F0F0F0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A8A]">What Makes This Different</h2>
            <p className="text-xl text-gray-700">A comprehensive system built for adult learners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1E3A8A]">User-Controlled Progression</h3>
              <p className="text-gray-700 leading-relaxed">
                No arbitrary timelines. Progress at your own pace with "complete when ready" 
                language that respects your schedule and learning speed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1E3A8A]">University-Level Depth</h3>
              <p className="text-gray-700 leading-relaxed">
                7,000-9,000 words per lesson (4x industry standard). Complete technical 
                mastery plus comprehensive music theory education.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎸</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1E3A8A]">Complete Musician</h3>
              <p className="text-gray-700 leading-relaxed">
                From open chords to advanced harmony. From strumming basics to lead guitar. 
                From reading music to composing songs. Everything, systematically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A8A]">The Complete Journey</h2>
            <p className="text-xl text-gray-700">46 lessons organized in three progressive phases</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phase 1 */}
            <div className="border-2 border-[#1E3A8A] rounded-xl p-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1E3A8A]">Foundation Phase</h3>
                <span className="text-sm px-3 py-1 bg-[#D4AF37] text-white rounded-full font-semibold">Lessons 1-30</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Open chords & strumming patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Music reading & fingerstyle basics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Power chords & barre chords</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Lead guitar & blues expression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Performance preparation</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="border-2 border-[#1E3A8A] rounded-xl p-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1E3A8A]">Theory Module 1</h3>
                <span className="text-sm px-3 py-1 bg-[#D4AF37] text-white rounded-full font-semibold">Lessons 31-38</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Major scales & key signatures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Circle of Fifths mastery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Diatonic harmony & progressions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Voice leading & inversions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Major key integration</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="border-2 border-[#1E3A8A] rounded-xl p-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1E3A8A]">Theory Module 2</h3>
                <span className="text-sm px-3 py-1 bg-[#D4AF37] text-white rounded-full font-semibold">Lessons 39-46</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Minor scales & harmony</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Relative vs. parallel minor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Modal interchange & borrowing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Advanced harmonic concepts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">•</span>
                  <span>Complete theory mastery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-[#F0F0F0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A8A]">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-700">Start learning immediately with 14 free lessons</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Access */}
            <div className="border-2 border-gray-300 rounded-xl p-8 bg-white">
              <h3 className="text-2xl font-bold mb-2 text-[#1E3A8A]">Start Free</h3>
              <p className="text-gray-700 mb-6">Begin your guitar journey</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#1E3A8A]">$0</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Lessons 1-14 free forever</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Open chords, strumming, basics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Music reading fundamentals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>No credit card required</span>
                </li>
              </ul>
              <Link 
                href="/auth"
                className="block w-full py-3 border-2 border-[#1E3A8A] text-[#1E3A8A] text-center rounded-lg font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all"
              >
                Start Learning Free
              </Link>
            </div>

            {/* Premium Access */}
            <div className="border-2 border-[#D4AF37] rounded-xl p-8 relative bg-white shadow-lg">
              <div className="absolute -top-3 right-8 px-3 py-1 bg-[#D4AF37] text-white text-sm font-bold rounded-full">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#1E3A8A]">Complete Access</h3>
              <p className="text-gray-700 mb-6">Full curriculum + future updates</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#1E3A8A]">$29.99</span>
                <span className="text-gray-700 ml-2">one-time</span>
                <p className="text-sm text-gray-600 mt-2">or $9.99/month</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span><strong>All 46 lessons</strong> (Foundation + Theory)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>~446,000 words of instruction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Complete beginner → advanced musician</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Lifetime access (one-time payment)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2 font-bold">✓</span>
                  <span>Future content updates included</span>
                </li>
              </ul>
              <Link 
                href="/auth"
                className="block w-full py-3 bg-[#D4AF37] text-white text-center rounded-lg font-bold hover:bg-[#b8941f] transition-all shadow-md"
              >
                Get Complete Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A8A]">Built for Adult Learners</h2>
            <p className="text-xl text-gray-700">A different approach to guitar education</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border-l-4 border-[#D4AF37]">
              <h3 className="text-xl font-bold mb-3 text-[#1E3A8A]">User-Controlled Learning</h3>
              <p className="text-gray-700 leading-relaxed">
                No "Day 1, Day 2" pressure. Learn at your own pace with realistic completion 
                times. Adult learners have varying schedules - we respect that.
              </p>
            </div>

            <div className="p-6 border-l-4 border-[#D4AF37]">
              <h3 className="text-xl font-bold mb-3 text-[#1E3A8A]">Comprehensive Depth</h3>
              <p className="text-gray-700 leading-relaxed">
                Each lesson contains 7,000-9,000 words of instruction - 4x the industry standard. 
                No corners cut. Complete understanding, not surface-level tips.
              </p>
            </div>

            <div className="p-6 border-l-4 border-[#D4AF37]">
              <h3 className="text-xl font-bold mb-3 text-[#1E3A8A]">Engagement First</h3>
              <p className="text-gray-700 leading-relaxed">
                Every lesson starts with "Why This Matters" - compelling hooks that establish 
                relevance before diving into instruction. Proven to increase completion rates.
              </p>
            </div>

            <div className="p-6 border-l-4 border-[#D4AF37]">
              <h3 className="text-xl font-bold mb-3 text-[#1E3A8A]">Complete Musician</h3>
              <p className="text-gray-700 leading-relaxed">
                Not just technique, not just theory - both, integrated. From strumming basics 
                to advanced harmony. The complete musical education you deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F0F0F0] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1E3A8A]">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Start with 14 free lessons. No credit card required.
          </p>
          <Link 
            href="/auth"
            className="inline-block px-12 py-4 bg-[#D4AF37] text-white rounded-lg font-bold text-lg hover:bg-[#b8941f] transition-all shadow-lg"
          >
            Start Learning Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-[#1E3A8A]">Guitar Mastery Hub</h4>
              <p className="text-sm text-gray-600">
                Complete guitar education for adult learners.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#1E3A8A]">Curriculum</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#curriculum" className="hover:text-[#4A90E2]">Foundation Phase</a></li>
                <li><a href="#curriculum" className="hover:text-[#4A90E2]">Theory Module 1</a></li>
                <li><a href="#curriculum" className="hover:text-[#4A90E2]">Theory Module 2</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#1E3A8A]">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/lessons" className="hover:text-[#4A90E2]">All Lessons</Link></li>
                <li><Link href="/learning-guide" className="hover:text-[#4A90E2]">Learning Guide</Link></li>
                <li><a href="#pricing" className="hover:text-[#4A90E2]">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#1E3A8A]">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy" className="hover:text-[#4A90E2]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#4A90E2]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Guitar Mastery Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
