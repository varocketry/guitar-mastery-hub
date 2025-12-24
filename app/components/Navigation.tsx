'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLessonsOpen, setIsLessonsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    setIsProfileOpen(false)
    
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
      setIsSigningOut(false)
    }
  }

  const lessons = [
    { number: 1, title: "Your First Two Chords - E Minor & A Minor" },
    { number: 2, title: "Your Third Chord - D Major" },
    { number: 3, title: "Fourth & Fifth Chords (G & C)" },
    { number: 4, title: "Understanding Guitar Shapes" },
    { number: 5, title: "Chord Transitions & Smooth Changes" },
    { number: 6, title: "First Complete Song" },
    { number: 7, title: "Strumming Patterns & Dynamics" },
    { number: 8, title: "Advanced Strumming Rhythms" },
    { number: 9, title: "Introduction to Music Reading" },
    { number: 10, title: "Fingerstyle Basics" },
    { number: 11, title: "Complex Chord Progressions" },
    { number: 12, title: "Performance Preparation" },
    { number: 13, title: "Consolidation & Review" },
    { number: 14, title: "Foundation Complete & Premium Preview" },
    { number: 15, title: "Power Chord Preparation" },
    { number: 16, title: "Understanding the Fretboard" },
    { number: 17, title: "Power Chord Fundamentals & Root Movement" },
    { number: 18, title: "5th String Roots & Advanced Transitions" },
    { number: 19, title: "Power Chord Riffs & Three-Note Voicings" },
    { number: 20, title: "Advanced Power Chords & Week Integration" },
    { number: 21, title: "Major Barre Chords - E Shape Foundation" },
    { number: 22, title: "A-Shape Barre Chords & Minor Shapes" },
    { number: 23, title: "Barre Chord Progressions & Fluency" },
    { number: 24, title: "Complete Integration & Performance" },
    { number: 25, title: "Single-Note Melodies & Scale Introduction" },
    { number: 26, title: "Pentatonic Scale & Blues Fundamentals" },
    { number: 27, title: "Advanced Lead Techniques" },
    { number: 28, title: "Rhythm-Lead Integration" },
    { number: 29, title: "Complete Performance Preparation" },
    { number: 30, title: "Celebration & Future Roadmap" },
  ]

  return (
   <nav className="bg-navy border-b border-gold/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl">🎸</span>
            <span className="text-white font-bold text-xl">Guitar Mastery Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Lessons Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLessonsOpen(!isLessonsOpen)}
                className={`text-slate-300 hover:text-white transition px-3 py-2 rounded-lg ${
                  isActive('/lessons') ? 'text-gold border-b-2 border-gold' : ''
                }`}
              >
                Lessons
              </button>
              
              {isLessonsOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-h-96 overflow-y-auto z-50">
                  <div className="p-4">
                    <div className="text-xs font-semibold text-slate-400 mb-2">FREE TRIAL (1-10)</div>
                    {lessons.slice(0, 14).map(lesson => (
                      <Link
                        key={lesson.number}
                        href={`/lessons/${lesson.number}`}
                        onClick={() => setIsLessonsOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition"
                      >
                        Lesson {lesson.number}: {lesson.title}
                      </Link>
                    ))}
                    
                    <div className="text-xs font-semibold text-slate-400 mb-2 mt-4">ADVANCED FOUNDATION (15-30)</div>
                    {lessons.slice(14, 30).map(lesson => (
                      <Link
                        key={lesson.number}
                        href={`/lessons/${lesson.number}`}
                        onClick={() => setIsLessonsOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition"
                      >
                        Lesson {lesson.number}: {lesson.title}
                      </Link>
                    ))}
                    
                    <div className="text-xs font-semibold text-slate-400 mb-2 mt-4">PHASE 2 (Coming Soon)</div>
                    <div className="text-sm text-slate-500 px-3 py-2">More lessons coming soon!</div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/dashboard"
              className={`text-slate-300 hover:text-white transition px-3 py-2 ${
                isActive('/dashboard') ? 'text-gold border-b-2 border-gold' : ''
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/progress"
              className={`text-slate-300 hover:text-white transition px-3 py-2 ${
                isActive('/progress') ? 'text-gold border-b-2 border-gold' : ''
              }`}
            >
              Progress
            </Link>

            <Link
              href="/resources"
              className={`text-slate-300 hover:text-white transition px-3 py-2 ${
                isActive('/resources') ? 'text-gold border-b-2 border-gold' : ''
              }`}
            >
              Resources
            </Link>

            <Link
              href="/practice"
              className={`text-slate-300 hover:text-white transition px-3 py-2 ${
                isActive('/practice') ? 'text-gold border-b-2 border-gold' : ''
              }`}
            >
              Practice Log
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition"
              >
      			 <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-semibold">
                  {isSigningOut ? (
                    <span className="text-xs">...</span>
                  ) : (
                    'U'
                  )}
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
                  <Link
                    href="/account"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:bg-slate-700 transition"
                  >
                    Account
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:bg-slate-700 transition"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 transition border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-2">
            <Link href="/dashboard" className="block text-slate-300 hover:text-white py-2">
              Dashboard
            </Link>
            <Link href="/lessons" className="block text-slate-300 hover:text-white py-2">
              Lessons
            </Link>
            <Link href="/progress" className="block text-slate-300 hover:text-white py-2">
              Progress
            </Link>
            <Link href="/resources" className="block text-slate-300 hover:text-white py-2">
              Resources
            </Link>
            <Link href="/practice" className="block text-slate-300 hover:text-white py-2">
              Practice Log
            </Link>
            <Link href="/account" className="block text-slate-300 hover:text-white py-2">
              Account
            </Link>
            <Link href="/settings" className="block text-slate-300 hover:text-white py-2">
              Settings
            </Link>
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="block text-slate-300 hover:text-white py-2 w-full text-left disabled:opacity-50"
            >
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
