'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/app/components/PageLayout';
import ContentCard from '@/app/components/ContentCard';
import { styles } from '@/lib/designSystem';
import { getCurrentUser } from '@/lib/supabase';

export default function ResourcesPage() {
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
        <h1 className={styles.heading1}>Guitar Resources</h1>
        
        <div className={styles.warningBox + ' mb-8'}>
          <p className="text-gray-800 text-lg font-semibold mb-2">🚧 Expanded Library Coming Soon</p>
          <p className="text-gray-700">
            We're building a comprehensive resource library with chord charts, scale diagrams, 
            practice logs, and more. For now, here are essential external tools:
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className={styles.heading2}>Essential Tools</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a 
                href="https://www.guitartuner.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">🎵 Online Guitar Tuner</h3>
                <p className="text-gray-700">Free, accurate chromatic tuner - works in your browser</p>
              </a>
              
              <a 
                href="https://www.musicca.com/metronome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">⏱️ Online Metronome</h3>
                <p className="text-gray-700">Practice with steady tempo - essential for rhythm development</p>
              </a>
              
              <a 
                href="https://www.justinguitar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">📚 JustinGuitar</h3>
                <p className="text-gray-700">Free video lessons complementing this course</p>
              </a>
              
              <a 
                href="https://www.ultimate-guitar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">🎸 Ultimate Guitar</h3>
                <p className="text-gray-700">Tabs and chords for thousands of songs</p>
              </a>
            </div>
          </div>

          <div>
            <h2 className={styles.heading2}>Coming to Resource Library:</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Chord Chart Library</strong> - Visual diagrams for all chords in the course</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Scale Diagrams</strong> - Pentatonic, major, minor scales with patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Practice Logs</strong> - Downloadable PDF practice tracking sheets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Song Library</strong> - Curated songs organized by difficulty</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Video Playlists</strong> - Recommended YouTube lessons for each topic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold mt-1">✓</span>
                <span><strong>Backing Tracks</strong> - Play-along tracks for practice</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className={styles.heading3}>Continue Your Journey:</h3>
            <div className="flex gap-4">
              <a href="/practice" className={styles.buttonPrimary}>
                Practice Page
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
