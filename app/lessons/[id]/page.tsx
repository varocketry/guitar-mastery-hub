'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser, markLessonComplete, getLessonProgress } from '@/lib/supabase';

// SUCCESS CRITERIA CHECKBOXES
function SuccessCriteriaCheckboxes({ lessonNumber, items, storageKey }: { lessonNumber: number; items: string[]; storageKey: string }) {
  console.log('SuccessCriteriaCheckboxes rendering:', { lessonNumber, itemCount: items.length, storageKey });
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

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

  if (!isLoaded) {
    console.log('SuccessCriteriaCheckboxes: Not loaded yet, returning null');
    return null;
  }

  console.log('SuccessCriteriaCheckboxes: Rendering', items.length, 'checkboxes');
  
  return (
    <ul className="list-disc pl-5 m-0">
      {items.map((item, index) => {
        const isChecked = checkedItems.has(index)
        
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

// ACCORDION FOR TROUBLESHOOTING
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

  function splitLessonContent(markdown: string, lessonNum: number) {
    console.log(`=== Lesson ${lessonNum} - Starting split ===`);
    console.log('Markdown length:', markdown.length);
    
    // Find all interactive sections
    const successMatch = markdown.match(/(?:^|\n)(## .*[Ss][Uu][Cc][Cc][Ee][Ss][Ss].*$)/im);
    const troubleMatch = markdown.match(/(?:^|\n)(## .*[Tt][Rr][Oo][Uu][Bb][Ll][Ee].*$)/im);
    const section5Match = lessonNum === 46 ? markdown.match(/(?:^|\n)(## .*SECTION 5:.*$)/im) : null;
    
    console.log('SUCCESS match:', successMatch ? 'FOUND' : 'NOT FOUND');
    console.log('TROUBLE match:', troubleMatch ? 'FOUND' : 'NOT FOUND');
    console.log('SECTION5 match:', section5Match ? 'FOUND' : 'NOT FOUND');
    
    if (!successMatch && !section5Match) {
      console.log('Split result: Failed (using plain markdown)');
      return null;
    }
    
    // Track sections to extract
    const sections: Array<{start: number, end: number, type: string}> = [];
    
    // Find SUCCESS section boundaries
    if (successMatch) {
      const start = successMatch.index! + (successMatch[0].startsWith('\n') ? 1 : 0);
      const nextSection = markdown.substring(start + 1).match(/\n## /);
      const end = nextSection ? start + 1 + nextSection.index! : markdown.length;
      sections.push({start, end, type: 'success'});
      console.log('SUCCESS section:', start, 'to', end);
    }
    
    // Find TROUBLESHOOTING section boundaries
    if (troubleMatch) {
      const start = troubleMatch.index! + (troubleMatch[0].startsWith('\n') ? 1 : 0);
      const nextSection = markdown.substring(start + 1).match(/\n## /);
      const end = nextSection ? start + 1 + nextSection.index! : markdown.length;
      sections.push({start, end, type: 'trouble'});
      console.log('TROUBLE section:', start, 'to', end);
    }
    
    // Find SECTION 5 boundaries
    if (section5Match) {
      const start = section5Match.index! + (section5Match[0].startsWith('\n') ? 1 : 0);
      const nextSection = markdown.substring(start + 1).match(/\n## /);
      const end = nextSection ? start + 1 + nextSection.index! : markdown.length;
      sections.push({start, end, type: 'section5'});
      console.log('SECTION5 section:', start, 'to', end);
    }
    
    // Sort sections by position
    sections.sort((a, b) => a.start - b.start);
    
    // Build chunks
    type Chunk = 
      | { type: 'markdown'; content: string }
      | { type: 'success'; items: string[]; restContent: string }
      | { type: 'trouble'; problems: string[] }
      | { type: 'section5'; items: string[]; restContent: string };
    
    const chunks: Chunk[] = [];
    let lastPos = 0;
    
    for (const sec of sections) {
      // Add markdown BEFORE this section
      if (sec.start > lastPos) {
        chunks.push({
          type: 'markdown',
          content: markdown.substring(lastPos, sec.start)
        });
      }
      
      // Extract section content
      const sectionContent = markdown.substring(sec.start, sec.end);
      
      if (sec.type === 'success') {
        const items = sectionContent.match(/- \[ \] (.+)/g);
        const checkboxItems = items ? items.map(line => line.replace('- [ ] ', '').trim()) : [];
        // Remove the entire checkbox section - everything before "### NOT READY" or "###" that's not "Ready to Mark"
        let restContent = sectionContent;
        const notReadyMatch = restContent.match(/### .*NOT READY/i);
        if (notReadyMatch && notReadyMatch.index !== undefined) {
          // Keep only from "### NOT READY" onwards
          restContent = restContent.substring(notReadyMatch.index);
        } else {
          // If no "### NOT READY", remove everything
          restContent = '';
        }
        console.log('SUCCESS items:', checkboxItems.length);
        chunks.push({ type: 'success', items: checkboxItems, restContent });
      } else if (sec.type === 'trouble') {
        const problemMatches = sectionContent.match(/### Problem: [^\n]+[\s\S]*?(?=\n### Problem:|$)/g);
        console.log('TROUBLE problems:', problemMatches ? problemMatches.length : 0);
        chunks.push({ type: 'trouble', problems: problemMatches || [] });
      } else if (sec.type === 'section5') {
        const items = sectionContent.match(/- \[ \] (.+)/g);
        const checkboxItems = items ? items.map(line => line.replace('- [ ] ', '').trim()) : [];
        // Remove the entire checkbox section - everything before "### Scoring"
        let restContent = sectionContent;
        const scoringMatch = restContent.match(/### Scoring/);
        if (scoringMatch && scoringMatch.index !== undefined) {
          // Keep only from "### Scoring" onwards
          restContent = restContent.substring(scoringMatch.index);
        } else {
          // If no "### Scoring", remove everything
          restContent = '';
        }
        console.log('SECTION5 items:', checkboxItems.length);
        console.log('SECTION5 restContent length:', restContent.length);
        chunks.push({ type: 'section5', items: checkboxItems, restContent });
      }
      
      // Move past this section
      lastPos = sec.end;
    }
    
    // Add remaining markdown
    if (lastPos < markdown.length) {
      chunks.push({
        type: 'markdown',
        content: markdown.substring(lastPos)
      });
    }
    
    console.log('Split result: Success -', chunks.length, 'chunks');
    return chunks;
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

  const chunks = splitLessonContent(content, lessonNumber);

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
                  {chunks ? (
                    <>
                      {chunks.map((chunk, idx) => {
                        if (chunk.type === 'markdown') {
                          return (
                            <div key={`md-${idx}`} className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.content}</ReactMarkdown>
                            </div>
                          );
                        }
                        
                        if (chunk.type === 'success') {
                          console.log('Rendering SUCCESS chunk with', chunk.items.length, 'items');
                          return (
                            <div key={`success-${idx}`} className="my-3">
                              <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <span>✅</span><span>SUCCESS CRITERIA</span>
                              </h2>
                              <h3 className="text-lg font-semibold text-blue-900 mt-3 mb-2">Ready to Mark This Lesson Complete?</h3>
                              <p className="text-sm mb-2">Check these off honestly. If you can do all of these, you're ready to move on:</p>
                              <SuccessCriteriaCheckboxes 
                                lessonNumber={lessonNumber} 
                                items={chunk.items}
                                storageKey={`lesson_${lessonNumber}_success`}
                              />
                              <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1 mt-4">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.restContent}</ReactMarkdown>
                              </div>
                            </div>
                          );
                        }
                        
                        if (chunk.type === 'trouble') {
                          return (
                            <div key={`trouble-${idx}`} className="my-3">
                              <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <span>🔧</span><span>TROUBLESHOOTING</span>
                              </h2>
                              <div className="space-y-0">
                                {chunk.problems.map((problem, pIdx) => {
                                  const titleMatch = problem.match(/### Problem: ([^\n]+)/);
                                  const title = titleMatch ? titleMatch[1] : `Problem ${pIdx + 1}`;
                                  const problemContent = problem.replace(/### Problem: [^\n]+\n/, '');
                                  return (
                                    <ProblemAccordion key={pIdx} title={`Problem: ${title}`}>
                                      <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{problemContent}</ReactMarkdown>
                                      </div>
                                    </ProblemAccordion>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        
                        if (chunk.type === 'section5') {
                          console.log('Rendering SECTION5 chunk with', chunk.items.length, 'items');
                          return (
                            <div key={`section5-${idx}`} className="my-3">
                              <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <span>📖</span><span>SECTION 5: THE COMPLETE MASTERY ASSESSMENT</span>
                              </h2>
                              <h3 className="text-lg font-semibold text-blue-900 mt-3 mb-2">Self-Assessment Checklist</h3>
                              <p className="text-sm mb-2">Mark each statement TRUE or FALSE. Be honest:</p>
                              <SuccessCriteriaCheckboxes 
                                lessonNumber={lessonNumber} 
                                items={chunk.items} 
                                storageKey={`lesson_${lessonNumber}_section5`}
                              />
                              <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1 mt-4">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.restContent}</ReactMarkdown>
                              </div>
                            </div>
                          );
                        }
                        
                        return null;
                      })}
                    </>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1">
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
