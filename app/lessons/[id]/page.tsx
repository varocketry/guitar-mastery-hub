'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { supabase, getCurrentUser, markLessonComplete, getLessonProgress } from '@/lib/supabase';

// COMPLETE LIST OF ALL 46 LESSONS - Must match actual files in /public/lessons/
const lessonFiles = [
  'first_two_chords',                          // 1
  'third_chord_d_major',                       // 2
  'fourth_fifth_chord_shapes_g_c',             // 3
  'understanding_shapes',                      // 4
  'strumming_fundamentals',                    // 5 ✅ FIXED
  'e_major_e_shape',                           // 6
  'foundation_review_assessment',              // 7
  'advanced_strumming_techniques',             // 8
  'music_reading',                             // 9
  'fingerstyle_basics',                        // 10
  'percussive_palm_muting_techniques',         // 11
  'travis_picking_mastery',                    // 12
  'walking_bass_lines',                        // 13
  'first_complete_song_stand_by_me',           // 14
  'power_chord_preparation',                   // 15
  'understanding_fretboard',                   // 16
  'power_chord_fundamentals',                  // 17
  '5th_string_roots',                          // 18
  'power_chord_riffs',                         // 19
  'advanced_power_chords_integration',         // 20
  'major_barre_chords_e_shape',                // 21
  'a_shape_and_minor_barre_chords',            // 22
  'barre_chord_progressions',                  // 23
  'complete_integration',                      // 24
  'single_note_melodies',                      // 25
  'string_bending_vibrato_blues',              // 26
  'advanced_lead_solo_construction',           // 27
  'rhythm_lead_integration',                   // 28
  'complete_performance_preparation',          // 29
  'celebration_future',                        // 30
  'music_theory_fundamentals',                 // 31
  'chord_construction_harmonic_function',      // 32
  'major_scale_formula',                       // 33
  'key_signatures_circle_of_fifths',           // 34
  'understanding_flats_enharmonics',           // 35
  'diatonic_harmony_major_keys',               // 36
  'chord_inversions_voice_leading',            // 37
  'major_key_integration_practice',            // 38
  'minor_scale',                               // 39
  'minor_key_signatures',                      // 40
  'relative_vs_parallel_minor',                // 41
  'minor_key_diatonic_chords',                 // 42
  'minor_key_progressions',                    // 43
  'modal_interchange_borrowing',               // 44
  'advanced_harmonic_concepts',                // 45
  'complete_theory_integration',               // 46
];

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const resolvedParams = use(params);
  const lessonNumber = parseInt(resolvedParams.id);

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
      const { data: progress } = await getLessonProgress();
      const completedNumbers = progress ? progress.map((p: any) => p.lesson_number) : [];
      setCompletedLessons(completedNumbers);
    }
    loadUser();
  }, [router]);

  useEffect(() => {
    async function loadLesson() {
      if (lessonNumber < 1 || lessonNumber > 46) {
        setError('Lesson not found');
        setLoading(false);
        return;
      }
      try {
        const formattedNum = String(lessonNumber).padStart(3, '0');
        const filename = lessonFiles[lessonNumber - 1];
        const lessonUrl = '/lessons/lesson_' + formattedNum + '_' + filename + '.md';
        
        console.log('Fetching lesson:', lessonUrl); // DEBUG: See what URL is being requested
        
        const response = await fetch(lessonUrl);
        if (!response.ok) throw new Error('Lesson not found');
        const text = await response.text();
        
        // Check if we accidentally got HTML instead of markdown
        if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
          throw new Error('Got HTML instead of markdown - file not found');
        }
        
        setContent(text);
        setLoading(false);
      } catch (err) {
        console.error('Error loading lesson:', err); // DEBUG: See what went wrong
        setError('Failed to load lesson');
        setLoading(false);
      }
    }
    if (user) loadLesson();
  }, [lessonNumber, user]);

  const handleMarkComplete = async () => {
    await markLessonComplete(lessonNumber);
    const { data: progress } = await getLessonProgress();
    const completedNumbers = progress ? progress.map((p: any) => p.lesson_number) : [];
    setCompletedLessons(completedNumbers);
  };

  if (!user) {
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
          {/* Navigation buttons */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-40">
              {lessonNumber > 1 ? (
                <a 
                  href={`/lessons/${lessonNumber - 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </a>
              ) : <div></div>}
            </div>
            
            <div className="text-slate-300 font-semibold text-center">
              Lesson {lessonNumber} of 46
            </div>
            
            <div className="w-40 flex justify-end">
              {lessonNumber < 46 ? (
                <a 
                  href={`/lessons/${lessonNumber + 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : <div></div>}
            </div>
          </div>

          {loading && <div className="text-center py-12 text-white">Loading lesson...</div>}
          {error && <div className="text-center py-12 text-red-400">{error}</div>}
          {!loading && !error && (
            <div>
              {/* WHITE CONTENT CARD */}
              <div className="bg-white rounded-xl p-8 shadow-2xl mb-6">
                <article className="lesson-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </article>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleMarkComplete} 
                  disabled={completedLessons.includes(lessonNumber)} 
                  className={completedLessons.includes(lessonNumber) 
                    ? 'px-6 py-3 rounded-lg font-semibold bg-green-900/30 text-green-200 cursor-not-allowed border border-green-700/50' 
                    : 'px-6 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition shadow-lg'
                  }
                >
                  {completedLessons.includes(lessonNumber) ? '✓ Completed' : 'Mark Complete'}
                </button>
                {lessonNumber < 46 && (
                  <a 
                    href={`/lessons/${lessonNumber + 1}`}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition shadow-lg"
                  >
                    Next Lesson →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
