'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

export default function ShapeLibraryPage() {
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
          {/* Back Link */}
          <div className="mb-6">
            <a 
              href="/resources"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Resources</span>
            </a>
          </div>

          {/* WHITE CONTENT CARD */}
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <article className="lesson-content prose prose-lg max-w-none">
              
              <h1 className="text-4xl font-bold text-navy mb-4">🎸 Guitar Shape Library</h1>
              <h2 className="text-2xl font-semibold text-navy/80 mb-8">Complete Reference for Chord Shapes</h2>
              
              <p className="text-lg text-navy/90 mb-8"><strong>Based on Den Lopez's "Shapes Not Chords" Philosophy</strong></p>

              <hr className="my-8 border-gold/30" />

              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Understanding Shapes: The Revolutionary Concept</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">What is a "Shape"?</h3>

              <p className="text-navy/80 mb-4">A <strong>shape</strong> is a finger pattern that you can move to different positions on the fretboard.</p>

              <div className="bg-navy/5 border-l-4 border-gold p-6 my-6">
                <p className="text-navy font-semibold mb-2">Traditional Thinking (Wrong):</p>
                <ul className="text-navy/80 ml-6">
                  <li>"I need to learn C major, then learn F major, then learn B♭ major..."</li>
                  <li><strong>Result:</strong> 180 isolated fingerings to memorize</li>
                </ul>

                <p className="text-navy font-semibold mb-2 mt-4">Shape Thinking (Right):</p>
                <ul className="text-navy/80 ml-6">
                  <li>"I'll learn the C-shape pattern, then move it to create F, B♭, and all major chords"</li>
                  <li><strong>Result:</strong> 6 shapes that unlock 72+ chord positions</li>
                </ul>
              </div>

              <hr className="my-8 border-gold/30" />

              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Why Shapes Change Everything</h2>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-700 mb-4">❌ The Problem with "Learning Chords"</h3>
                  <p className="text-navy/80 mb-2">Most beginners think:</p>
                  <ul className="text-navy/70 ml-6 space-y-1">
                    <li>Every chord is unique and unrelated</li>
                    <li>Must memorize 180 different fingerings</li>
                    <li>Barre chords are completely different</li>
                    <li>The fretboard is a mystery</li>
                  </ul>
                  <p className="text-red-600 font-semibold mt-4">This is overwhelming and inefficient.</p>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-4">✅ The Shape Philosophy Solution</h3>
                  <p className="text-navy/80 mb-2">With shape thinking:</p>
                  <ul className="text-navy/70 ml-6 space-y-1">
                    <li>6 core patterns cover everything</li>
                    <li>Open chords are just "shapes at the nut"</li>
                    <li>Barre chords are "moving those same shapes"</li>
                    <li>Fretboard becomes a logical pattern</li>
                  </ul>
                  <p className="text-green-600 font-semibold mt-4">This is manageable and powerful.</p>
                </div>
              </div>

              <hr className="my-8 border-gold/30" />

              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">The 6 Core Shapes</h2>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-navy/20">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Shape</th>
                      <th className="px-4 py-3 text-left font-bold">Open Position</th>
                      <th className="px-4 py-3 text-left font-bold">Movable Version</th>
                      <th className="px-4 py-3 text-left font-bold">Most Common Uses</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-navy/10">
                      <td className="px-4 py-3 font-bold text-navy">E-Shape</td>
                      <td className="px-4 py-3 text-navy/80">E major/minor at nut</td>
                      <td className="px-4 py-3 text-navy/80">Barre chords on 6th string</td>
                      <td className="px-4 py-3 text-navy/80">F, F#, G, Ab, A, Bb, B, C</td>
                    </tr>
                    <tr className="border-b border-navy/10 bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">A-Shape</td>
                      <td className="px-4 py-3 text-navy/80">A major/minor at nut</td>
                      <td className="px-4 py-3 text-navy/80">Barre chords on 5th string</td>
                      <td className="px-4 py-3 text-navy/80">Bb, B, C, C#, D, Eb, E, F</td>
                    </tr>
                    <tr className="border-b border-navy/10">
                      <td className="px-4 py-3 font-bold text-navy">D-Shape</td>
                      <td className="px-4 py-3 text-navy/80">D major at nut</td>
                      <td className="px-4 py-3 text-navy/80">Triangle chord voicings</td>
                      <td className="px-4 py-3 text-navy/80">Rare as barre, common as triads</td>
                    </tr>
                    <tr className="border-b border-navy/10 bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">C-Shape</td>
                      <td className="px-4 py-3 text-navy/80">C major at nut</td>
                      <td className="px-4 py-3 text-navy/80">Movable C-shape (difficult)</td>
                      <td className="px-4 py-3 text-navy/80">Mostly used in open position</td>
                    </tr>
                    <tr className="border-b border-navy/10">
                      <td className="px-4 py-3 font-bold text-navy">G-Shape</td>
                      <td className="px-4 py-3 text-navy/80">G major at nut</td>
                      <td className="px-4 py-3 text-navy/80">Movable G-shape (difficult)</td>
                      <td className="px-4 py-3 text-navy/80">Mostly used in open position</td>
                    </tr>
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">Triads</td>
                      <td className="px-4 py-3 text-navy/80">Various 3-note shapes</td>
                      <td className="px-4 py-3 text-navy/80">All over fretboard</td>
                      <td className="px-4 py-3 text-navy/80">Lead guitar, chord melody</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xl text-gold font-bold text-center my-8">Master these 6 patterns → Access to 100+ chord positions</p>

              <hr className="my-12 border-gold/30" />

              {/* E-SHAPE FAMILY */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Shape 1: E-Shape Family</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open E Major</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_e_L006_01.svg"
                    alt="E Major chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">E Major (E-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Index (1): G string, 1st fret</li>
                  <li>Middle (2): A string, 2nd fret</li>
                  <li>Ring (3): D string, 2nd fret</li>
                  <li>Other strings: Open</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: E - B - E - G# - B - E</p>
              </div>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open E Minor</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_em_L001_01.svg"
                    alt="E Minor chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">E Minor (Em-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Middle (2): A string, 2nd fret</li>
                  <li>Ring (3): D string, 2nd fret</li>
                  <li>Other strings: Open</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: E - B - E - G - B - E</p>
                <p className="text-gold font-semibold mt-2">Key Difference: Only ONE note changes (G# → G)</p>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* A-SHAPE FAMILY */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Shape 2: A-Shape Family</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open A Major</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_a_L001_03.svg"
                    alt="A Major chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">A Major (A-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Index (1): D string, 2nd fret</li>
                  <li>Middle (2): G string, 2nd fret</li>
                  <li>Ring (3): B string, 2nd fret</li>
                  <li>A string: Open</li>
                  <li>High e string: Open</li>
                  <li>Low E string: Muted (X)</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: A - E - A - C# - E</p>
              </div>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open A Minor</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_am_L001_02.svg"
                    alt="A Minor chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">A Minor (Am-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Index (1): B string, 1st fret</li>
                  <li>Middle (2): D string, 2nd fret</li>
                  <li>Ring (3): G string, 2nd fret</li>
                  <li>A and high e strings: Open</li>
                  <li>Low E string: Muted (X)</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: A - E - A - C - E</p>
                <p className="text-gold font-semibold mt-2">Key Difference: C# → C (one note changes)</p>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* D-SHAPE FAMILY */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Shape 3: D-Shape Family</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open D Major</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_d_L002_01.svg"
                    alt="D Major chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">D Major (D-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Index (1): G string, 2nd fret</li>
                  <li>Middle (2): high e string, 2nd fret</li>
                  <li>Ring (3): B string, 3rd fret</li>
                  <li>D string: Open</li>
                  <li>E and A strings: Muted (XX)</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: D - A - D - F#</p>
                <p className="text-navy/70 mt-2"><em>Shape Characteristic: Triangle formation with fingers</em></p>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* C-SHAPE FAMILY */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Shape 4: C-Shape Family</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open C Major</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_c_L003_02.svg"
                    alt="C Major chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">C Major (C-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement:</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Index (1): B string, 1st fret</li>
                  <li>Middle (2): D string, 2nd fret</li>
                  <li>Ring (3): A string, 3rd fret</li>
                  <li>G and high e strings: Open</li>
                  <li>Low E string: Muted (X)</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: C - E - G - C - E</p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
                <p className="font-semibold text-navy mb-2">Why C-shape is rarely moved:</p>
                <ul className="text-navy/70 ml-6 space-y-1">
                  <li>Requires large finger stretch</li>
                  <li>Awkward hand position</li>
                  <li>Open strings are part of what makes it work</li>
                </ul>
                <p className="text-navy/70 mt-3"><strong>Recommendation:</strong> Master the open C-shape. Advanced movable versions come much later (Lessons 31+)</p>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* G-SHAPE FAMILY */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Shape 5: G-Shape Family</h2>

              <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">Open G Major</h3>
              
              <div className="flex justify-center my-6">
                <div className="text-center">
                  <Image 
                    src="/chord_diagrams/chord_g_L003_01.svg"
                    alt="G Major chord diagram"
                    width={200}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-sm text-navy/60 mt-2">G Major (G-shape at nut)</p>
                </div>
              </div>

              <div className="bg-navy/5 rounded-lg p-6 my-6">
                <p className="font-semibold text-navy mb-2">Finger Placement (3-finger version):</p>
                <ul className="text-navy/80 ml-6 space-y-1">
                  <li>Middle (2): A string, 2nd fret</li>
                  <li>Index (1): high e string, 3rd fret</li>
                  <li>Ring (3): low E string, 3rd fret</li>
                  <li>D, G, B strings: Open</li>
                </ul>
                <p className="font-semibold text-navy mt-4">Notes: G - B - D - G - B - G</p>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* KEY INSIGHTS */}
              <div className="bg-gradient-to-r from-gold/20 to-navy/20 border-2 border-gold rounded-lg p-8 my-12">
                <h2 className="text-3xl font-bold text-navy mb-6 text-center">💡 Key Insights</h2>
                
                <div className="space-y-4 text-navy/80">
                  <p className="text-lg"><strong className="text-navy">You're not learning 180 chords.</strong></p>
                  <p className="text-lg"><strong className="text-navy">You're learning 6 shapes that unlock the entire guitar.</strong></p>
                  <p className="mt-6">This is the secret that takes guitarists from "I know some chords" to "I understand the fretboard."</p>
                  <p className="text-gold font-bold text-xl text-center mt-6">Trust the process. Learn the shapes. Master the patterns.</p>
                  <p className="text-navy text-center mt-4"><strong>Your future guitarist self will thank you.</strong></p>
                </div>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* ADDITIONAL RESOURCES */}
              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Resources</h2>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-navy/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-navy mb-3">Video Resources</h3>
                  <ul className="text-navy/70 space-y-2 ml-6">
                    <li><strong>Den Lopez:</strong> Search "Den Lopez chord shapes" on YouTube</li>
                    <li><strong>JustinGuitar:</strong> Search "JustinGuitar CAGED system"</li>
                    <li><strong>Marty Music:</strong> "Marty Music barre chords"</li>
                  </ul>
                </div>

                <div className="bg-navy/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-navy mb-3">Within This Platform</h3>
                  <ul className="text-navy/70 space-y-2 ml-6">
                    <li><a href="/learning-guide" className="text-gold hover:text-gold/80 font-semibold">Learning Guide</a>: Why shapes work</li>
                    <li><a href="/practice-philosophy" className="text-gold hover:text-gold/80 font-semibold">Practice Philosophy</a>: How to practice shapes effectively</li>
                    <li><a href="/lessons/4" className="text-gold hover:text-gold/80 font-semibold">Lesson 4</a>: Shape thinking introduction</li>
                    <li><a href="/lessons/21" className="text-gold hover:text-gold/80 font-semibold">Lessons 21-24</a>: Moving shapes (barre chords)</li>
                  </ul>
                </div>
              </div>

              <hr className="my-12 border-gold/30" />

              {/* FINAL QUOTE */}
              <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-navy/70 text-lg">
                <p>"The guitar is a miniature orchestra in itself." — Ludwig van Beethoven</p>
              </blockquote>

              <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-navy/70 text-lg">
                <p>"Good things come to those who wait... greater things come to those who work." — Unknown</p>
              </blockquote>

              <p className="text-center text-2xl font-bold text-gold my-8">Learn the shapes. Master the guitar. 🎸</p>

              <p className="text-sm text-navy/60 text-center mt-12"><em>This Shape Library is based on Den Lopez's "Shapes Not Chords" philosophy, the CAGED system, and proven music pedagogy adapted for adult self-directed learners.</em></p>

            </article>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <a 
              href="/learning-guide"
              className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg"
            >
              📚 Learning Guide
            </a>
            <a 
              href="/practice-philosophy"
              className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg"
            >
              🎯 Practice Philosophy
            </a>
            <a 
              href="/lessons"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md border-2 border-navy"
            >
              🎸 Start Learning
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
