// app/lessons/page.tsx
// Lessons Index - Shows all available lessons

import Link from 'next/link';

export default function LessonsPage() {
  // All 32 deployed lessons
  const lessons = [
    { id: 1, title: "Your First Two Chord Shapes", phase: "Foundation" },
    { id: 2, title: "Your Third Chord - D Major", phase: "Foundation" },
    { id: 3, title: "Fourth & Fifth Chords (G & C)", phase: "Foundation" },
    { id: 4, title: "Understanding Guitar Shapes", phase: "Foundation" },
    { id: 5, title: "Strumming Patterns & Rhythm", phase: "Foundation" },
    { id: 6, title: "E Major (E Shape)", phase: "Foundation" },
    { id: 7, title: "Foundation Review & Assessment", phase: "Foundation" },
    { id: 8, title: "Advanced Strumming Techniques", phase: "Foundation" },
    { id: 9, title: "Music Reading", phase: "Foundation" },
    { id: 10, title: "Fingerstyle Basics", phase: "Foundation" },
    { id: 11, title: "Percussive & Palm Muting Techniques", phase: "Foundation" },
    { id: 12, title: "Travis Picking Mastery", phase: "Foundation" },
    { id: 13, title: "Walking Bass Lines", phase: "Foundation" },
    { id: 14, title: "First Complete Song - Stand By Me", phase: "Foundation" },
    { id: 15, title: "Power Chord Preparation", phase: "Foundation" },
    { id: 16, title: "Understanding Fretboard", phase: "Foundation" },
    { id: 17, title: "Power Chord Fundamentals", phase: "Foundation" },
    { id: 18, title: "5th String Roots", phase: "Foundation" },
    { id: 19, title: "Power Chord Riffs", phase: "Foundation" },
    { id: 20, title: "Advanced Power Chords Integration", phase: "Foundation" },
    { id: 21, title: "Major Barre Chords - E Shape", phase: "Foundation" },
    { id: 22, title: "A-Shape & Minor Barre Chords", phase: "Foundation" },
    { id: 23, title: "Barre Chord Progressions", phase: "Foundation" },
    { id: 24, title: "Complete Integration", phase: "Foundation" },
    { id: 25, title: "Single-Note Melodies", phase: "Foundation" },
    { id: 26, title: "String Bending, Vibrato & Blues", phase: "Foundation" },
    { id: 27, title: "Advanced Lead & Solo Construction", phase: "Foundation" },
    { id: 28, title: "Rhythm-Lead Integration", phase: "Foundation" },
    { id: 29, title: "Complete Performance Preparation", phase: "Foundation" },
    { id: 30, title: "Celebration & Future Roadmap", phase: "Foundation" },
    { id: 31, title: "Music Theory Fundamentals", phase: "Major Theory" },
    { id: 32, title: "Chord Construction & Harmonic Function", phase: "Major Theory" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-navy border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
              <span className="text-3xl">🎸</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white font-accent">
                Guitar Mastery Hub
              </h1>
              <p className="text-xl text-gold font-semibold">
                All Lessons - Master Guitar at Your Own Pace
              </p>
            </div>
          </div>
          <p className="text-white/70 text-lg">
            32 lessons deployed • 14 more coming soon
          </p>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Foundation Phase */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-white font-accent">Foundation Phase</h2>
            <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold">
              30/30 Complete
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.filter(l => l.phase === "Foundation").map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="group bg-white rounded-lg p-6 hover:shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-gold"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                    Lesson {lesson.id}
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                  {lesson.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Major Theory Module */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-white font-accent">Theory Module 1: Major Keys</h2>
            <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold">
              2/2 Complete
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.filter(l => l.phase === "Major Theory").map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="group bg-white rounded-lg p-6 hover:shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-gold"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                    Lesson {lesson.id}
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                  {lesson.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-navy/50 rounded-xl p-8 border-2 border-gold/30">
          <h2 className="text-3xl font-bold text-white font-accent mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            <div className="bg-white/5 p-6 rounded-lg border border-gold/20">
              <h3 className="font-bold text-gold mb-2 text-xl">Theory Module 2: Expanded Theory</h3>
              <p className="text-white/70">Lessons 33-38 (6 lessons)</p>
              <p className="text-sm text-white/60 mt-2">Deep dive into music theory applications</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-gold/20">
              <h3 className="font-bold text-gold mb-2 text-xl">Theory Module 3: Minor Keys</h3>
              <p className="text-white/70">Lessons 39-46 (8 lessons)</p>
              <p className="text-sm text-white/60 mt-2">Master minor scales and progressions</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex gap-4 flex-wrap">
          <Link 
            href="/practice"
            className="bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            📊 Practice Tracker
          </Link>
          <Link 
            href="/dashboard"
            className="bg-navy hover:bg-navy-light text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-gold"
          >
            🏠 Dashboard
          </Link>
          <Link 
            href="/progress"
            className="bg-white hover:bg-gray-50 text-navy font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-gold/30"
          >
            📈 Progress
          </Link>
        </div>

      </div>
    </div>
  );
}
