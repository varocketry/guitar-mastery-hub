'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/app/components/PageLayout';
import ContentCard from '@/app/components/ContentCard';
import { styles } from '@/lib/designSystem';
import { getCurrentUser } from '@/lib/supabase';

export default function ProgressPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
    }
    loadUser();
  }, [router]);

  if (!user) {
    return (
      <PageLayout>
        <div className="text-white text-lg">Loading...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ContentCard>
        <h1 className={styles.heading1}>Your Progress</h1>
        
        <div className={styles.warningBox + ' mb-8'}>
          <p className="text-gray-800 text-lg font-semibold mb-2">🚧 Coming Soon</p>
          <p className="text-gray-700">
            Your progress tracking dashboard is being developed. You'll be able to see detailed 
            statistics, charts, and insights about your guitar learning journey.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className={styles.heading2}>Progress Features Coming:</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Visual Progress Charts</strong> - See your completion percentage across all modules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Lesson History</strong> - Timeline of all completed lessons with dates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Practice Time Tracking</strong> - Log and review your practice sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Skill Mastery Indicators</strong> - Track mastery of chords, techniques, and songs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Streak Tracking</strong> - Maintain your daily/weekly practice streaks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Module Completion</strong> - View progress through Foundation, Theory 1, and Theory 2</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className={styles.heading3}>Keep Learning:</h3>
            <div className="flex gap-4">
              <a href="/practice" className={styles.buttonPrimary}>
                Practice Page
              </a>
              <a href="/lessons/1" className={styles.buttonSecondary}>
                Browse Lessons
              </a>
            </div>
          </div>
        </div>
      </ContentCard>
    </PageLayout>
  );
}
