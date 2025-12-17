'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/app/components/PageLayout';
import ContentCard from '@/app/components/ContentCard';
import { styles } from '@/lib/designSystem';
import { getCurrentUser } from '@/lib/supabase';

export default function DashboardPage() {
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
        <h1 className={styles.heading1}>Dashboard</h1>
        
        <div className={styles.warningBox + ' mb-8'}>
          <p className="text-gray-800 text-lg font-semibold mb-2">🚧 Coming Soon</p>
          <p className="text-gray-700">
            Your personalized dashboard is currently being built. It will include your progress stats, 
            recent lessons, practice streaks, and personalized recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className={styles.heading2}>What's Coming:</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Progress Overview</strong> - See your completion percentage and lesson history</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Practice Streaks</strong> - Track your daily practice consistency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Recently Completed</strong> - Quick access to your last 5 lessons</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Next Up</strong> - Recommended next lesson based on your progress</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Achievement Badges</strong> - Celebrate milestones and accomplishments</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className={styles.heading3}>In the Meantime:</h3>
            <div className="flex gap-4">
              <a href="/practice" className={styles.buttonPrimary}>
                Continue Learning
              </a>
              <a href="/lessons/1" className={styles.buttonSecondary}>
                View All Lessons
              </a>
            </div>
          </div>
        </div>
      </ContentCard>
    </PageLayout>
  );
}
