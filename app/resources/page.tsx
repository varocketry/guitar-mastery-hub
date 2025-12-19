'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

export default function ResourcesPage() {
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
            <h1 className="text-4xl font-bold text-navy mb-6 font-accent">Guitar Resources</h1>
            
            <div className="space-y-8">
              {/* Internal Learning Resources */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-accent">Learning Resources</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <a 
                    href="/shape-library"
                    className="block p-6 bg-gold/10 hover:bg-gold/20 rounded-lg border-2 border-gold/30 hover:border-gold transition-all"
                  >
                    <h3 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎸</span>
                      Guitar Shape Library
                    </h3>
                    <p className="text-navy/80">
                      Complete chord shape reference based on Den Lopez's philosophy. Learn 6 shapes that unlock 100+ chord positions.
                    </p>
                    <div className="mt-3 text-gold font-semibold">→ View Complete Guide</div>
                  </a>
                  
                  <a 
                    href="/learning-guide"
                    className="block p-6 bg-gold/10 hover:bg-gold/20 rounded-lg border-2 border-gold/30 hover:border-gold transition-all"
                  >
                    <h3 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      Learning Science Guide
                    </h3>
                    <p className="text-navy/80">
                      Understand how adults learn guitar. Deliberate practice, spaced repetition, and proven strategies for success.
                    </p>
                    <div className="mt-3 text-gold font-semibold">→ View Complete Guide</div>
                  </a>

                  <a 
                    href="/practice-philosophy"
                    className="block p-6 bg-gold/10 hover:bg-gold/20 rounded-lg border-2 border-gold/30 hover:border-gold transition-all"
                  >
                    <h3 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Practice Philosophy
                    </h3>
                    <p className="text-navy/80">
                      "Slow is Smooth, Smooth is Fast" - Master tempo progression, metronome usage, and effective practice strategies.
                    </p>
                    <div className="mt-3 text-gold font-semibold">→ View Complete Guide</div>
                  </a>

                  <div className="block p-6 bg-navy/5 rounded-lg border-2 border-navy/20">
                    <h3 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">📖</span>
                      More Resources Coming
                    </h3>
                    <p className="text-navy/70">
                      Scale diagrams, practice logs, song library, and video playlists arriving soon!
                    </p>
                  </div>
                </div>
              </div>

              {/* Essential External Tools */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-accent">Essential Tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <a 
                    href="https://www.guitartuner.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-6 bg-navy/5 hover:bg-navy/10 rounded-lg border-2 border-navy/20 hover:border-gold transition-all"
                  >
                    <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎵</span>
                      Online Guitar Tuner
                    </h3>
                    <p className="text-navy/70">Free, accurate chromatic tuner - works in your browser</p>
                    <div className="mt-2 text-sm text-navy/60">→ guitartuner.app</div>
                  </a>
                  
                  <a 
                    href="https://www.musicca.com/metronome" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-6 bg-navy/5 hover:bg-navy/10 rounded-lg border-2 border-navy/20 hover:border-gold transition-all"
                  >
                    <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">⏱️</span>
                      Online Metronome
                    </h3>
                    <p className="text-navy/70">Practice with steady tempo - essential for rhythm development</p>
                    <div className="mt-2 text-sm text-navy/60">→ musicca.com/metronome</div>
                  </a>
                  
                  <a 
                    href="https://www.justinguitar.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-6 bg-navy/5 hover:bg-navy/10 rounded-lg border-2 border-navy/20 hover:border-gold transition-all"
                  >
                    <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      JustinGuitar
                    </h3>
                    <p className="text-navy/70">Free video lessons complementing this course</p>
                    <div className="mt-2 text-sm text-navy/60">→ justinguitar.com</div>
                  </a>
                  
                  <a 
                    href="https://www.ultimate-guitar.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-6 bg-navy/5 hover:bg-navy/10 rounded-lg border-2 border-navy/20 hover:border-gold transition-all"
                  >
                    <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎸</span>
                      Ultimate Guitar
                    </h3>
                    <p className="text-navy/70">Tabs and chords for thousands of songs</p>
                    <div className="mt-2 text-sm text-navy/60">→ ultimate-guitar.com</div>
                  </a>
                </div>
              </div>

              {/* Coming Soon Features */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-accent">Additional Resources Coming Soon:</h2>
                <ul className="space-y-3 text-navy/80">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Scale Diagrams</strong> - Pentatonic, major, minor scales with patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Practice Logs</strong> - Downloadable PDF practice tracking sheets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Song Library</strong> - Curated songs organized by difficulty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Video Playlists</strong> - Recommended YouTube lessons for each topic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Backing Tracks</strong> - Play-along tracks for practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mt-0.5">✓</span>
                    <span><strong className="text-navy">Equipment Guides</strong> - Recommendations for guitars, picks, accessories</span>
                  </li>
                </ul>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-6 border-t-2 border-gold/30">
                <h3 className="text-xl font-bold text-navy mb-4">Continue Your Journey:</h3>
                <div className="flex gap-4 flex-wrap">
                  <a 
                    href="/practice" 
                    className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    🎸 Practice Log
                  </a>
                  <a 
                    href="/lessons" 
                    className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    📚 All Lessons
                  </a>
                  <a 
                    href="/dashboard" 
                    className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md hover:shadow-lg border-2 border-navy"
                  >
                    🏠 Dashboard
                  </a>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-navy/5 border-2 border-navy/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-navy mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-navy/80">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Start with the Learning Guide to understand effective practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Reference the Shape Library during Lessons 1-4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Use Practice Philosophy for all tempo-based exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Tune your guitar every time before practicing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Always use a metronome for rhythm exercises</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
