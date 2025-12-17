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
    { id: 5, title: "Chord Transitions & Smooth Changes", phase: "Foundation" },
    { id: 6, title: "First Complete Song", phase: "Foundation" },
    { id: 7, title: "Strumming Patterns & Dynamics", phase: "Foundation" },
    { id: 8, title: "Advanced Strumming Rhythms", phase: "Foundation" },
    { id: 9, title: "Introduction to Music Reading", phase: "Foundation" },
    { id: 10, title: "Fingerstyle Basics", phase: "Foundation" },
    { id: 11, title: "Complex Chord Progressions", phase: "Foundation" },
    { id: 12, title: "Performance Preparation", phase: "Foundation" },
    { id: 13, title: "Consolidation & Review", phase: "Foundation" },
    { id: 14, title: "Stand By Me - Complete Song", phase: "Foundation" },
    { id: 15, title: "Muting Techniques & Rhythm Control", phase: "Foundation" },
    { id: 16, title: "Accents & Syncopation", phase: "Foundation" },
    { id: 17, title: "Power Chord Fundamentals", phase: "Foundation" },
    { id: 18, title: "5th String Roots & Advanced Transitions", phase: "Foundation" },
    { id: 19, title: "Power Chord Riffs", phase: "Foundation" },
    { id: 20, title: "Advanced Power Chords", phase: "Foundation" },
    { id: 21, title: "Major Barre Chords - E Shape", phase: "Foundation" },
    { id: 22, title: "A-Shape & Minor Barre Chords", phase: "Foundation" },
    { id: 23, title: "Barre Chord Progressions", phase: "Foundation" },
    { id: 24, title: "Complete Integration", phase: "Foundation" },
    { id: 25, title: "Single-Note Melodies", phase: "Foundation" },
    { id: 26, title: "Pentatonic Scale & Blues", phase: "Foundation" },
    { id: 27, title: "Advanced Lead Techniques", phase: "Foundation" },
    { id: 28, title: "Rhythm-Lead Integration", phase: "Foundation" },
    { id: 29, title: "Complete Performance Preparation", phase: "Foundation" },
    { id: 30, title: "Celebration & Future Roadmap", phase: "Foundation" },
    { id: 31, title: "Scale Construction & Theory", phase: "Major Theory" },
    { id: 32, title: "Chord Construction & Harmonic Function", phase: "Major Theory" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎸 Guitar Mastery Hub
          </h1>
          <p className="text-xl text-orange-400">
            All Lessons - Master Guitar at Your Own Pace
          </p>
          <p className="text-slate-400 mt-2">
            32 lessons deployed • 14 more coming soon
          </p>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Foundation Phase */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">Foundation Phase</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              30/30 Complete
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.filter(l => l.phase === "Foundation").map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="group bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-orange-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-orange-600">
                    Lesson {lesson.id}
                  </span>
                  <svg 
                    className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {lesson.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Major Theory Module */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">Theory Module 1: Major Keys</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              2/2 Complete
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.filter(l => l.phase === "Major Theory").map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="group bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-orange-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-orange-600">
                    Lesson {lesson.id}
                  </span>
                  <svg 
                    className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {lesson.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400">
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">Theory Module 2: Expanded Theory</h3>
              <p className="text-sm">Lessons 33-38 (6 lessons)</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">Theory Module 3: Minor Keys</h3>
              <p className="text-sm">Lessons 39-46 (8 lessons)</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex gap-4">
          <Link 
            href="/practice"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            📊 Practice Tracker
          </Link>
          <Link 
            href="/"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            🏠 Home
          </Link>
        </div>

      </div>
    </div>
  );
}
