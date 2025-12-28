'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser, markLessonComplete, getLessonProgress } from '@/lib/supabase';

// SUCCESS CRITERIA CHECKBOXES
function SuccessCriteriaCheckboxes({ lessonNumber, items }: { lessonNumber: number; items: string[] }) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  
  const storageKey = `lesson_${lessonNumber}_success_criteria`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setCheckedItems(new Set(JSON.parse(saved)))
      }
    } catch (error) {
      console.error('Load error:', error)
    }
    setIsLoaded(true)
  }, [storageKey])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedItems)))
      } catch (error) {
        console.error('Save error:', error)
      }
    }
  }, [checkedItems, storageKey, isLoaded])

  const toggleItem = (index: number) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      newSet.has(index) ? newSet.delete(index) : newSet.add(index)
      return newSet
    })
  }

  if (!isLoaded) return null

  return (
    <ul className="list-disc pl-5 m-0">
      {items.map((item, index) => {
        const isChecked = checkedItems.has(index)
        
        // Parse: **Bold part** - Normal part
        const match = item.match(/\*\*(.+?)\*\*\s*-?\s*(.*)/)
        const boldPart = match ? match[1] : ''
        const normalPart = match ? match[2] : item.replace(/\*\*/g, '')
        
        return (
          <li 
            key={index}
            className="cursor-pointer hover:bg-gray-50 m-0 p-0"
            onClick={() => toggleItem(index)}
          >
            <span className="font-mono select-none">{isChecked ? '[✅]' : '[ ]'}</span>
            {' '}
            <span className="font-bold">{boldPart}</span>
            {normalPart && <span> - {normalPart}</span>}
          </li>
        )
      })}
    </ul>
  )
}

// ACCORDION FOR TROUBLESHOOTING PROBLEMS
function ProblemAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-300 rounded bg-white mb-0.5">
      <div 
        className="bg-gray-50 px-2 py-0 cursor-pointer flex items-center justify-between hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-semibold text-blue-900 my-0.5">{title}</h3>
        <svg className={`w-4 h-4 text-gray-600 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="px-2 py-0.5 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  )
}

const lessonFiles = [
  'first_two_chords', 'third_chord_d_major', 'fourth_fifth_chord_shapes_g_c', 'understanding_shapes',
  'strumming_fundamentals', 'e_major_e_shape', 'foundation_review_assessment', 'advanced_strumming_techniques',
  'music_reading', 'fingerstyle_basics', 'percussive_palm_muting_techniques', 'travis_picking_mastery',
  'walking_bass_lines', 'first_complete_song_stand_by_me', 'power_chord_preparation', 'understanding_fretboard',
  'power_chord_fundamentals', '5th_string_roots', 'power_chord_riffs', 'advanced_power_chords_integration',
  'major_barre_chords_e_shape', 'a_shape_and_minor_barre_chords', 'barre_chord_progressions', 'complete_integration',
  'single_note_melodies', 'string_bending_vibrato_blues', 'advanced_lead_solo_construction', 'rhythm_lead_integration',
  'complete_performance_preparation', 'celebration_future', 'music_theory_fundamentals', 'chord_construction_harmonic_function',
  'major_scale_formula', 'key_signatures_circle_of_fifths', 'understanding_flats_enharmonics', 'diatonic_harmony_major_keys',
  'chord_inversions_voice_leading', 'major_key_integration_practice', 'minor_scale', 'minor_key_signatures',
  'relative_vs_parallel_minor', 'minor_key_diatonic_chords', 'minor_key_progressions', 'modal_interchange_borrowing',
  'advanced_harmonic_concepts', 'complete_theory_integration'
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
      setCompletedLessons(progress ? progress.map((p: any) => p.lesson_number) : []);
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
        const response = await fetch(`/lessons/lesson_${formattedNum}_${filename}.md`);
        if (!response.ok) throw new Error('Lesson not found');
        const text = await response.text();
        if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
          throw new Error('File not found');
        }
        setContent(text);
        setLoading(false);
      } catch (err) {
        setError('Failed to load lesson');
        setLoading(false);
      }
    }
    if (user) loadLesson();
  }, [lessonNumber, user]);

  const handleMarkComplete = async () => {
    await markLessonComplete(lessonNumber);
    const { data: progress } = await getLessonProgress();
    setCompletedLessons(progress ? progress.map((p: any) => p.lesson_number) : []);
  };

  function extractSuccessCriteriaItems(markdown: string): string[] {
    const match = markdown.match(/## ✅ SUCCESS CRITERIA[\s\S]*?### Ready to Mark[\s\S]*?(?=\n### ⏰ NOT READY)/);
    if (!match) return [];
    const items = match[0].match(/- \[ \] (.+)/g);
    return items ? items.map(line => line.replace('- [ ] ', '').trim()) : [];
  }

  function splitLesson1Content(markdown: string) {
    // Find section positions
    const successStart = markdown.indexOf('## ✅ SUCCESS CRITERIA');
    const troubleshootingStart = markdown.indexOf('## 🔧 TROUBLESHOOTING');
    
    if (successStart === -1 || troubleshootingStart === -1) {
      return {
        beforeSuccess: markdown,
        successSection: '',
        troubleshootingSection: '',
        afterTroubleshooting: '',
        successItems: []
      };
    }

    // Extract full SUCCESS CRITERIA section (everything until TROUBLESHOOTING)
    const successSection = markdown.substring(successStart, troubleshootingStart);
    
    // Extract checkbox items only
    const successItems = extractSuccessCriteriaItems(markdown);
    
    // Extract full TROUBLESHOOTING section (everything until next ## heading)
    let troubleshootingEnd = markdown.length;
    const afterTroubleshootingMatch = markdown.substring(troubleshootingStart + 1).match(/\n## [^#]/);
    if (afterTroubleshootingMatch && afterTroubleshootingMatch.index !== undefined) {
      troubleshootingEnd = troubleshootingStart + 1 + afterTroubleshootingMatch.index;
    }
    const troubleshootingSection = markdown.substring(troubleshootingStart, troubleshootingEnd);
    
    // Parse individual problems from troubleshooting
    const problemMatches = troubleshootingSection.match(/### Problem: [^\n]+[\s\S]*?(?=\n### Problem:|$)/g);
    const problems = problemMatches || [];
    
    return {
      beforeSuccess: markdown.substring(0, successStart),
      successSection,
      troubleshootingProblems: problems,
      afterTroubleshooting: markdown.substring(troubleshootingEnd),
      successItems
    };
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const split = lessonNumber === 1 ? splitLesson1Content(content) : null;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-40">
              {lessonNumber > 1 && (
                <a href={`/lessons/${lessonNumber - 1}`} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Previous
                </a>
              )}
            </div>
            <div className="text-slate-300 font-semibold">Lesson {lessonNumber} of 46</div>
            <div className="w-40 flex justify-end">
              {lessonNumber < 46 && (
                <a href={`/lessons/${lessonNumber + 1}`} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              )}
            </div>
          </div>

          {loading && <div className="text-center py-12 text-white">Loading...</div>}
          {error && <div className="text-center py-12 text-red-400">{error}</div>}
          {!loading && !error && (
            <div>
              <div className="bg-white rounded-xl p-6 shadow-2xl mb-6">
                <article className="lesson-content">
                  {lessonNumber === 1 && split ? (
                    <>
                      {/* Content BEFORE Success Criteria */}
                      <div className="prose max-w-none prose-li:my-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{split.beforeSuccess}</ReactMarkdown>
                      </div>
                      
                      {/* SUCCESS CRITERIA - With interactive checkboxes */}
                      <div className="my-3">
                        <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                          <span>✅</span><span>SUCCESS CRITERIA</span>
                        </h2>
                        
                        <h3 className="text-lg font-semibold text-blue-900 mt-3 mb-2">Ready to Mark This Lesson Complete?</h3>
                        <p className="text-sm mb-2">Check these off honestly. If you can do all of these, you're ready to move on:</p>
                        
                        <SuccessCriteriaCheckboxes lessonNumber={1} items={split.successItems} />
                        
                        {/* Render the rest of SUCCESS CRITERIA section (NOT READY YET, REMEMBER) */}
                        <div className="prose max-w-none prose-li:my-0 mt-4">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {split.successSection.replace(/## ✅ SUCCESS CRITERIA[\s\S]*?(?=### ⏰ NOT READY)/, '')}
                          </ReactMarkdown>
                        </div>
                      </div>
                      
                      {/* TROUBLESHOOTING - With accordions */}
                      <div className="my-3">
                        <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                          <span>🔧</span><span>TROUBLESHOOTING</span>
                        </h2>
                        
                        <div className="space-y-0">
                          {split.troubleshootingProblems?.map((problem, index) => {
                            const titleMatch = problem.match(/### Problem: ([^\n]+)/);
                            const title = titleMatch ? titleMatch[1] : `Problem ${index + 1}`;
                            const content = problem.replace(/### Problem: [^\n]+\n/, '');
                            
                            return (
                              <ProblemAccordion key={index} title={`Problem: ${title}`}>
                                <div className="prose prose-sm max-w-none prose-li:my-0">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                                </div>
                              </ProblemAccordion>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Content AFTER Troubleshooting */}
                      <div className="prose max-w-none prose-li:my-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{split.afterTroubleshooting}</ReactMarkdown>
                      </div>
                    </>
                  ) : (
                    <div className="prose max-w-none prose-li:my-0">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
                  )}
                </article>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleMarkComplete} 
                  disabled={completedLessons.includes(lessonNumber)} 
                  className={completedLessons.includes(lessonNumber) 
                    ? 'px-6 py-3 rounded-lg font-semibold bg-green-900/30 text-green-200 cursor-not-allowed' 
                    : 'px-6 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white'
                  }
                >
                  {completedLessons.includes(lessonNumber) ? '✓ Completed' : 'Mark Complete'}
                </button>
                {lessonNumber < 46 && (
                  <a href={`/lessons/${lessonNumber + 1}`} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold">
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
