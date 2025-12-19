'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

export default function DashboardPage() {
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
            <h1 className="text-4xl font-bold text-navy mb-6 font-accent">Dashboard</h1>
            
            <div className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 mb-8">
              <p className="text-navy text-lg font-bold mb-2">🚧 Coming Soon</p>
              <p className="text-navy/80">
                Your personalized dashboard is currently being built. It will include your progress stats, 
                recent lessons, practice streaks, and personalized recommendations.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-accent">What's Coming:</h2>
                <ul className="space-y-3 text-navy/80">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Progress Overview</strong> - See your completion percentage and lesson history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Practice Streaks</strong> - Track your daily practice consistency</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Recently Completed</strong> - Quick access to your last 5 lessons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Next Up</strong> - Recommended next lesson based on your progress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Achievement Badges</strong> - Celebrate milestones and accomplishments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Practice Analytics</strong> - Visual charts of your practice time and consistency</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t-2 border-gold/30">
                <h3 className="text-xl font-bold text-navy mb-4">In the Meantime:</h3>
                <div className="flex gap-4 flex-wrap">
                  <a 
                    href="/lessons" 
                    className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    📚 Browse All Lessons
                  </a>
                  <a 
                    href="/practice" 
                    className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    🎸 Practice Log
                  </a>
                  <a 
                    href="/progress" 
                    className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md hover:shadow-lg border-2 border-navy"
                  >
                    📈 View Progress
                  </a>
                </div>
              </div>

              {/* Quick Stats Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-navy/5 border-2 border-navy/20 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-gold mb-2">32</div>
                  <div className="text-navy/70 font-semibold">Lessons Available</div>
                </div>
                <div className="bg-navy/5 border-2 border-navy/20 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-gold mb-2">✓</div>
                  <div className="text-navy/70 font-semibold">Start Learning</div>
                </div>
                <div className="bg-navy/5 border-2 border-navy/20 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-gold mb-2">🎯</div>
                  <div className="text-navy/70 font-semibold">Your Own Pace</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
