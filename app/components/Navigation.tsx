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
    { number: 5, title: "Strumming Fundamentals" },
    { number: 6, title: "E Major & E Shape Introduction" },
    { number: 7, title: "Foundation Review & Assessment" },
    { number: 8, title: "Advanced Strumming Techniques" },
    { number: 9, title: "Music Reading Fundamentals" },
    { number: 10, title: "Fingerstyle Basics" },
    { number: 11, title: "Percussive & Palm Muting Techniques" },
    { number: 12, title: "Travis Picking Mastery" },
    { number: 13, title: "Walking Bass Lines" },
    { number: 14, title: "First Complete Song - Stand By Me" },
    { number: 15, title: "Power Chord Preparation" },
    { number: 16, title: "Understanding the Fretboard" },
    { number: 17, title: "Power Chord Fundamentals" },
    { number: 18, title: "5th String Roots" },
    { number: 19, title: "Power Chord Riffs" },
    { number: 20, title: "Advanced Power Chords Integration" },
    { number: 21, title: "Major Barre Chords - E Shape" },
    { number: 22, title: "A-Shape & Minor Barre Chords" },
    { number: 23, title: "Barre Chord Progressions" },
    { number: 24, title: "Complete Integration" },
    { number: 25, title: "Single-Note Melodies" },
    { number: 26, title: "String Bending, Vibrato & Blues" },
    { number: 27, title: "Advanced Lead & Solo Construction" },
    { number: 28, title: "Rhythm-Lead Integration" },
    { number: 29, title: "Complete Performance Preparation" },
    { number: 30, title: "Celebration & Future" },
    { number: 31, title: "Music Theory Fundamentals" },
    { number: 32, title: "Chord Construction & Harmonic Function" },
    { number: 33, title: "Major Scale Formula" },
    { number: 34, title: "Key Signatures & Circle of Fifths" },
    { number: 35, title: "Understanding Flats & Enharmonics" },
    { number: 36, title: "Diatonic Harmony in Major Keys" },
    { number: 37, title: "Chord Inversions & Voice Leading" },
    { number: 38, title: "Major Key Integration Practice" },
    { number: 39, title: "The Minor Scale" },
    { number: 40, title: "Minor Key Signatures" },
    { number: 41, title: "Relative vs Parallel Minor" },
    { number: 42, title: "Minor Key Diatonic Chords" },
    { number: 43, title: "Minor Key Progressions" },
    { number: 44, title: "Modal Interchange & Borrowing" },
    { number: 45, title: "Advanced Harmonic Concepts" },
    { number: 46, title: "Complete Theory Integration" },
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
                    <div className="text-xs font-semibold text-slate-400 mb-2">FREE TRIAL (1-14)</div>
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
                    
                    <div className="text-xs font-semibold text-slate-400 mb-2 mt-4">FOUNDATION PHASE (15-30)</div>
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
                    
                    <div className="text-xs font-semibold text-slate-400 mb-2 mt-4">THEORY MODULE (31-46)</div>
                    {lessons.slice(30, 46).map(lesson => (
                      <Link
                        key={lesson.number}
                        href={`/lessons/${lesson.number}`}
                        onClick={() => setIsLessonsOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition"
                      >
                        Lesson {lesson.number}: {lesson.title}
                      </Link>
                    ))}
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

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gold text-navy font-bold hover:bg-gold/80 transition"
              >
                U
              </button>
              
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
                  <div className="p-2">
                    <Link
                      href="/account"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition"
                    >
                      Account Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition disabled:opacity-50"
                    >
                      {isSigningOut ? 'Signing out...' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white transition"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition"
            >
              Dashboard
            </Link>
            <Link
              href="/lessons"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition"
            >
              All Lessons
            </Link>
            <Link
              href="/progress"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition"
            >
              Progress
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition"
            >
              Resources
            </Link>
            <Link
              href="/account"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition"
            >
              Account
            </Link>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 rounded transition disabled:opacity-50"
            >
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
