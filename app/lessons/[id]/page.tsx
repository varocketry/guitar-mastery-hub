'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser, markLessonComplete, getLessonProgress } from '@/lib/supabase';

// SUCCESS CRITERIA CHECKBOXES
function SuccessCriteriaCheckboxes({ lessonNumber, items, storageKey }: { lessonNumber: number; items: string[]; storageKey: string }) {
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

  if (!isLoaded) return null;
  
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
            {boldPart && <span className="font-bold">{boldPart}</span>}
            {normalPart && <span>{boldPart ? ' - ' : ''}{normalPart}</span>}
          </li>
        )
      })}
    </ul>
  )
}

// GROUPED CHECKBOXES FOR PROGRESS CHECKPOINT
function GroupedCheckboxes({ lessonNumber, groups, storageKey }: { 
  lessonNumber: number; 
  groups: Array<{ title: string; items: string[] }>; 
  storageKey: string 
}) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
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

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId)
      return newSet
    })
  }

  if (!isLoaded) return null;
  
  return (
    <div className="space-y-4">
      {groups.map((group, groupIdx) => (
        <div key={groupIdx}>
          <h4 className="font-semibold text-blue-900 mb-2">{group.title}</h4>
          <ul className="list-disc pl-5 m-0 space-y-1">
            {group.items.map((item, itemIdx) => {
              const itemId = `${groupIdx}-${itemIdx}`;
              const isChecked = checkedItems.has(itemId);
              
              return (
                <li 
                  key={itemId}
                  className="cursor-pointer hover:bg-gray-50 m-0 p-1"
                  onClick={() => toggleItem(itemId)}
                >
                  <span className="font-mono select-none">{isChecked ? '[✅]' : '[ ]'}</span>
                  {' '}
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
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
    // Find all special sections (REMOVED section5Match - it was breaking real Section 5)
    const successMatch = markdown.match(/(?:^|\n)(## .*[Ss][Uu][Cc][Cc][Ee][Ss][Ss].*(?:CHECKLIST|CRITERIA).*$)/im);
    const troubleMatch = markdown.match(/(?:^|\n)(## .*[Tt][Rr][Oo][Uu][Bb][Ll][Ee].*$)/im);
    const progressMatch = markdown.match(/(?:^|\n)(## .*PROGRESS CHECKPOINT.*$)/im);
    
    if (!successMatch && !troubleMatch && !progressMatch) {
      return null;
    }
    
    const sections: Array<{ type: string; start: number; end: number }> = [];
    
    // Helper to find next section header
    const findNextSection = (fromIndex: number) => {
      const nextMatch = markdown.substring(fromIndex).match(/\n## /);
      if (nextMatch && nextMatch.index !== undefined) {
        return fromIndex + nextMatch.index;
      }
      return markdown.length;
    };
    
    if (successMatch && successMatch.index !== undefined) {
      sections.push({
        type: 'success',
        start: successMatch.index,
        end: findNextSection(successMatch.index + 3)
      });
    }
    
    if (troubleMatch && troubleMatch.index !== undefined) {
      sections.push({
        type: 'trouble',
        start: troubleMatch.index,
        end: findNextSection(troubleMatch.index + 3)
      });
    }
    
    if (progressMatch && progressMatch.index !== undefined) {
      sections.push({
        type: 'progress',
        start: progressMatch.index,
        end: findNextSection(progressMatch.index + 3)
      });
    }
    
    sections.sort((a, b) => a.start - b.start);
    
    const chunks: Array<any> = [];
    let lastPos = 0;
    
    for (const sec of sections) {
      // Add markdown before this section
      if (sec.start > lastPos) {
        chunks.push({
          type: 'markdown',
          content: markdown.substring(lastPos, sec.start)
        });
      }
      
      const sectionContent = markdown.substring(sec.start, sec.end);
      
      if (sec.type === 'success') {
        const lines = sectionContent.split('\n').filter(l => l.trim().startsWith('- [ ]'));
        const checkboxItems = lines.map(l => l.replace('- [ ]', '').trim());
        let restContent = sectionContent;
        const scoringMatch = restContent.match(/(?:^|\n)(### .*[Ss][Cc][Oo][Rr][Ii][Nn][Gg].*$)/im);
        if (scoringMatch && scoringMatch.index !== undefined) {
          restContent = restContent.substring(scoringMatch.index);
        } else {
          restContent = '';
        }
        chunks.push({ type: 'success', items: checkboxItems, restContent });
      }
      
      if (sec.type === 'trouble') {
        // DUAL-FORMAT SUPPORT: Handle both H3 headings (Lessons 1-4) and bold text (Lesson 5)
        const problems: Array<{ title: string; content: string }> = [];
        
        // TRY FORMAT 1: Bold text with quotes - **Problem: "Title"**
        let problemPattern = /\*\*Problem:\s*"([^"]+)"\*\*/g;
        let matches: Array<{ title: string; index: number }> = [];
        let match;
        
        while ((match = problemPattern.exec(sectionContent)) !== null) {
          matches.push({
            title: match[1],
            index: match.index
          });
        }
        
        // TRY FORMAT 2: H3 headings - ### Problem: Title or ### Problem 1: Title
        if (matches.length === 0) {
          problemPattern = /### Problem(?:\s+\d+)?:\s+([^\n]+)/g;
          while ((match = problemPattern.exec(sectionContent)) !== null) {
            matches.push({
              title: match[1],
              index: match.index
            });
          }
        }
        
        // Extract content for each problem
        for (let i = 0; i < matches.length; i++) {
          const start = matches[i].index;
          const end = i < matches.length - 1 ? matches[i + 1].index : sectionContent.length;
          const problemContent = sectionContent.substring(start, end);
          
          problems.push({
            title: matches[i].title,
            content: problemContent
          });
        }
        
        chunks.push({ type: 'trouble', problems });
      }
      
      if (sec.type === 'progress') {
        // Parse PROGRESS CHECKPOINT with grouped checkboxes
        const groups: Array<{ title: string; items: string[] }> = [];
        
        // Find all subsection headers (bold text followed by colon)
        const subsectionPattern = /\*\*([^*]+)\*\*:/g;
        const subsections: Array<{ title: string; start: number; end: number }> = [];
        
        let subsecMatch;
        while ((subsecMatch = subsectionPattern.exec(sectionContent)) !== null) {
          const title = subsecMatch[1];
          const start = subsecMatch.index;
          subsections.push({ title, start, end: -1 });
        }
        
        // Set end positions
        for (let i = 0; i < subsections.length; i++) {
          if (i < subsections.length - 1) {
            subsections[i].end = subsections[i + 1].start;
          } else {
            // Find the "Advancement Guide" section or end of content
            const advMatch = sectionContent.substring(subsections[i].start).match(/### Advancement Guide/);
            subsections[i].end = advMatch && advMatch.index !== undefined 
              ? subsections[i].start + advMatch.index 
              : sectionContent.length;
          }
        }
        
        // Extract checkboxes for each subsection
        for (const subsec of subsections) {
          const subsecContent = sectionContent.substring(subsec.start, subsec.end);
          const lines = subsecContent.split('\n').filter(l => l.trim().startsWith('- [ ]'));
          const items = lines.map(l => l.replace('- [ ]', '').trim());
          if (items.length > 0) {
            groups.push({ title: subsec.title, items });
          }
        }
        
        // Extract rest content (Advancement Guide and Scoring)
        let restContent = '';
        const advMatch = sectionContent.match(/(?:^|\n)(### Advancement Guide[\s\S]*?)(?=\n## |$)/i);
        if (advMatch) {
          restContent = advMatch[1];
        }
        
        chunks.push({ type: 'progress', groups, restContent });
      }
      
      lastPos = sec.end;
    }
    
    // Add remaining markdown
    if (lastPos < markdown.length) {
      chunks.push({
        type: 'markdown',
        content: markdown.substring(lastPos)
      });
    }
    
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
                              {chunk.restContent && (
                                <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1 mt-4">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.restContent}</ReactMarkdown>
                                </div>
                              )}
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
                                {chunk.problems.map((problem: { title: string; content: string }, pIdx: number) => {
                                  return (
                                    <ProblemAccordion key={pIdx} title={`Problem: "${problem.title}"`}>
                                      <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{problem.content}</ReactMarkdown>
                                      </div>
                                    </ProblemAccordion>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        
                        if (chunk.type === 'progress') {
                          return (
                            <div key={`progress-${idx}`} className="my-3">
                              <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <span>🎸</span><span>PROGRESS CHECKPOINT</span>
                              </h2>
                              <h3 className="text-lg font-semibold text-blue-900 mt-3 mb-2">Self-Assessment Checklist</h3>
                              <p className="text-sm mb-2">Check off each skill honestly as you develop it:</p>
                              <GroupedCheckboxes 
                                lessonNumber={lessonNumber} 
                                groups={chunk.groups}
                                storageKey={`lesson_${lessonNumber}_progress`}
                              />
                              {chunk.restContent && (
                                <div className="prose prose-sm max-w-none prose-li:my-0 prose-p:my-1 mt-4">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.restContent}</ReactMarkdown>
                                </div>
                              )}
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
