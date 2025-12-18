'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { supabase, getCurrentUser, markLessonComplete, getLessonProgress } from '@/lib/supabase';

// CORRECTED FILENAMES - Must match actual files in /public/lessons/
const lessonFiles = [
  'first_two_chords',                          // 1 ✅ FIXED
  'third_chord_d_major',                       // 2 ✅ FIXED
  'fourth_fifth_chord_shapes_g_c',             // 3 ✅
  'understanding_shapes',                      // 4 ✅
  'strumming_patterns_rhythm',                 // 5 (placeholder - create later)
  'e_major_e_shape',                           // 6 (placeholder - create later)
  'foundation_review_assessment',              // 7 (placeholder - create later)
  'advanced_strumming_techniques',             // 8 (placeholder - create later)
  'music_reading',                             // 9 (placeholder - create later)
  'fingerstyle_basics',                        // 10 (placeholder - create later)
  'percussive_palm_muting_techniques',         // 11 (placeholder - create later)
  'travis_picking_mastery',                    // 12 (placeholder - create later)
  'walking_bass_lines',                        // 13 (placeholder - create later)
  'first_complete_song_stand_by_me',           // 14 (placeholder - create later)
  'power_chord_preparation',                   // 15 ✅
  'understanding_fretboard',                   // 16 ✅
  'power_chord_fundamentals',                  // 17 ✅
  '5th_string_roots',                          // 18 ✅
  'power_chord_riffs',                         // 19 ✅
  'advanced_power_chords_integration',         // 20 ✅
  'major_barre_chords_e_shape',                // 21 ✅
  'a_shape_and_minor_barre_chords',            // 22 ✅
  'barre_chord_progressions',                  // 23 ✅
  'complete_integration',                      // 24 ✅
  'single_note_melodies',                      // 25 ✅
  'string_bending_vibrato_blues',              // 26 ✅
  'advanced_lead_solo_construction',           // 27 ✅
  'rhythm_lead_integration',                   // 28 ✅
  'complete_performance_preparation',          // 29 ✅
  'celebration_future',                        // 30 ✅
  'music_theory_fundamentals',                 // 31 ✅
  'chord_construction_harmonic_function'       // 32 ✅
];

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const resolvedParams = await params;
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
      if (lessonNumber < 1 || lessonNumber > 32) {
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
              Lesson {lessonNumber} of 32
            </div>
            
            <div className="w-40 flex justify-end">
              {lessonNumber < 32 ? (
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
                <article className="prose prose-lg max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8 first:mt-0" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4" {...props} />,
                      p: ({node, ...props}) => <p className="text-gray-800 mb-4 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-800 mb-4 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-800 mb-4 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-800" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />,
                      a: ({node, ...props}) => <a className="text-orange-600 hover:text-orange-700 underline" {...props} />,
                      code: ({node, inline, ...props}: any) => 
                        inline ? (
                          <code className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                        ) : (
                          <code className="block bg-gray-100 text-gray-900 p-4 rounded text-sm font-mono overflow-x-auto" {...props} />
                        ),
                      pre: ({node, ...props}) => <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700 mb-4" {...props} />,
                      hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
                      img: ({node, ...props}) => (
                        <img 
                          className="max-w-full h-auto rounded-lg shadow-md my-4" 
                          {...props} 
                        />
                      ),
                    }}
                  >
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
                {lessonNumber < 32 && (
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
