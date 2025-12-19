'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

export default function ProgressPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-navy mb-6 font-accent">Your Progress</h1>
            
            <div className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 mb-8">
              <p className="text-navy text-lg font-bold mb-2">🚧 Coming Soon</p>
              <p className="text-navy/80">
                Your progress tracking dashboard is being developed. You'll be able to see detailed 
                statistics, charts, and insights about your guitar learning journey.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-accent">Progress Features Coming:</h2>
                <ul className="space-y-3 text-navy/80">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Visual Progress Charts</strong> - See your completion percentage across all modules</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Lesson History</strong> - Timeline of all completed lessons with dates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Practice Time Tracking</strong> - Log and review your practice sessions with video uploads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Skill Mastery Indicators</strong> - Track mastery of chords, techniques, and songs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Streak Tracking</strong> - Maintain your daily/weekly practice streaks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Module Completion</strong> - View progress through Foundation, Theory 1, and Theory 2</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Goal Setting</strong> - Set and track personal learning goals</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t-2 border-gold/30">
                <h3 className="text-xl font-bold text-navy mb-4">Keep Learning:</h3>
                <div className="flex gap-4 flex-wrap">
                  <a 
                    href="/practice" 
                    className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    🎸 Log Practice Session
                  </a>
                  <a 
                    href="/lessons" 
                    className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    📚 Browse Lessons
                  </a>
                  <a 
                    href="/dashboard" 
                    className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md hover:shadow-lg border-2 border-navy"
                  >
                    🏠 Dashboard
                  </a>
                </div>
              </div>

              {/* Current Progress Placeholder */}
              <div className="mt-8 p-6 bg-navy/5 border-2 border-navy/20 rounded-lg">
                <h3 className="text-xl font-bold text-navy mb-4">Your Learning Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">32</div>
                      <div className="text-navy/70 text-sm font-semibold">Lessons Available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">∞</div>
                      <div className="text-navy/70 text-sm font-semibold">Learn at Your Pace</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
