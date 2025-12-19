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
        <div className="max-w-7xl mx-auto px-4 py-8">
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
            
            {/* HEADER */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-navy mb-4">🎸 Guitar Shape Library</h1>
              <p className="text-xl text-navy/70">Visual Reference for All Chord Shapes</p>
              <p className="text-sm text-gold font-semibold mt-2">Based on Den Lopez's "Shapes Not Chords" Philosophy</p>
            </div>

            {/* INTRO BOX */}
            <div className="bg-gradient-to-r from-gold/20 to-navy/20 border-2 border-gold rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-navy mb-3 text-center">The 6 Core Shapes</h2>
              <p className="text-navy/80 text-center mb-4">
                Master these 6 patterns and you'll have access to 100+ chord positions across the entire fretboard.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">E-Shape</span>
                  <p className="text-navy/60">6th string barre chords</p>
                </div>
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">A-Shape</span>
                  <p className="text-navy/60">5th string barre chords</p>
                </div>
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">D-Shape</span>
                  <p className="text-navy/60">Triangle voicings</p>
                </div>
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">C-Shape</span>
                  <p className="text-navy/60">Open position</p>
                </div>
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">G-Shape</span>
                  <p className="text-navy/60">Open position</p>
                </div>
                <div className="bg-white/50 rounded p-3">
                  <span className="font-bold text-navy">Triads</span>
                  <p className="text-navy/60">3-note voicings</p>
                </div>
              </div>
            </div>

            {/* E-SHAPE FAMILY */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-6 pb-3 border-b-4 border-gold">E-Shape Family</h2>
              <p className="text-navy/70 mb-6">The E-shape is your foundation for 6th string barre chords. Move this shape anywhere on the 6th string to create any major or minor chord.</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* E Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_e_L006_01.svg"
                      alt="E Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">E Major</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 6</p>
                  </div>
                </div>

                {/* E Minor */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_em_L001_01.svg"
                      alt="E Minor"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">E Minor</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 1</p>
                  </div>
                </div>

                {/* F Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_f_L004_07.svg"
                      alt="F Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">F Major</h3>
                    <p className="text-sm text-navy/60">E-shape moved to 1st fret</p>
                    <p className="text-xs text-gold mt-1">Lesson 21</p>
                  </div>
                </div>

                {/* F# Major - PLACEHOLDER */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_diagram_coming_soon.svg"
                      alt="F# Major - Coming Soon"
                      width={200}
                      height={175}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">F# Major</h3>
                    <p className="text-sm text-navy/60">E-shape moved to 2nd fret</p>
                    <p className="text-xs text-gold mt-1">Lesson 21</p>
                  </div>
                </div>

                {/* F# Minor - PLACEHOLDER */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_diagram_coming_soon.svg"
                      alt="F# Minor - Coming Soon"
                      width={200}
                      height={175}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">F# Minor</h3>
                    <p className="text-sm text-navy/60">Em-shape moved to 2nd fret</p>
                    <p className="text-xs text-gold mt-1">Lesson 22</p>
                  </div>
                </div>
              </div>
            </div>

            {/* A-SHAPE FAMILY */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-6 pb-3 border-b-4 border-gold">A-Shape Family</h2>
              <p className="text-navy/70 mb-6">The A-shape is your foundation for 5th string barre chords. Move this shape anywhere on the 5th string to create any major or minor chord.</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* A Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_a_L001_03.svg"
                      alt="A Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">A Major</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 1</p>
                  </div>
                </div>

                {/* A Minor */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_am_L001_02.svg"
                      alt="A Minor"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">A Minor</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 1</p>
                  </div>
                </div>

                {/* B Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_b_L022_02.svg"
                      alt="B Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">B Major</h3>
                    <p className="text-sm text-navy/60">A-shape moved to 2nd fret</p>
                    <p className="text-xs text-gold mt-1">Lesson 22</p>
                  </div>
                </div>

                {/* B Minor */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_bm_L004_09.svg"
                      alt="B Minor"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">B Minor</h3>
                    <p className="text-sm text-navy/60">Am-shape moved to 2nd fret</p>
                    <p className="text-xs text-gold mt-1">Lesson 22</p>
                  </div>
                </div>
              </div>
            </div>

            {/* D-SHAPE FAMILY */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-6 pb-3 border-b-4 border-gold">D-Shape Family</h2>
              <p className="text-navy/70 mb-6">The D-shape creates a distinctive triangle pattern. Primarily used in open position and as triads.</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* D Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_d_L002_01.svg"
                      alt="D Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">D Major</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 2</p>
                  </div>
                </div>

                {/* D Minor - PLACEHOLDER */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_diagram_coming_soon.svg"
                      alt="D Minor - Coming Soon"
                      width={200}
                      height={175}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">D Minor</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 22</p>
                  </div>
                </div>
              </div>
            </div>

            {/* C-SHAPE FAMILY */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-6 pb-3 border-b-4 border-gold">C-Shape Family</h2>
              <p className="text-navy/70 mb-6">The C-shape is most commonly used in open position. Moving this shape requires advanced technique.</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* C Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_c_L003_02.svg"
                      alt="C Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">C Major</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* G-SHAPE FAMILY */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-6 pb-3 border-b-4 border-gold">G-Shape Family</h2>
              <p className="text-navy/70 mb-6">The G-shape is most commonly used in open position. Moving this shape requires advanced technique.</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* G Major */}
                <div className="text-center">
                  <div className="bg-navy/5 rounded-lg p-4 border-2 border-navy/20 hover:border-gold transition">
                    <Image 
                      src="/chord_diagrams/chord_g_L003_01.svg"
                      alt="G Major"
                      width={200}
                      height={280}
                      className="mx-auto"
                    />
                    <h3 className="text-lg font-bold text-navy mt-3">G Major</h3>
                    <p className="text-sm text-navy/60">Open Position</p>
                    <p className="text-xs text-gold mt-1">Lesson 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK REFERENCE TABLE */}
            <div className="bg-navy/5 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-navy mb-6 text-center">Essential Beginner Chords - Quick Reference</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Chord</th>
                      <th className="px-4 py-3 text-left">Shape Family</th>
                      <th className="px-4 py-3 text-left">Position</th>
                      <th className="px-4 py-3 text-left">Learn in</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-navy/10">
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">E Minor</td>
                      <td className="px-4 py-3 text-navy/70">E-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 1</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-navy">A Minor</td>
                      <td className="px-4 py-3 text-navy/70">A-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 1</td>
                    </tr>
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">D Major</td>
                      <td className="px-4 py-3 text-navy/70">D-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 2</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-navy">G Major</td>
                      <td className="px-4 py-3 text-navy/70">G-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 3</td>
                    </tr>
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">C Major</td>
                      <td className="px-4 py-3 text-navy/70">C-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 3</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-navy">E Major</td>
                      <td className="px-4 py-3 text-navy/70">E-shape</td>
                      <td className="px-4 py-3 text-navy/70">Open (nut)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 6</td>
                    </tr>
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">F Major</td>
                      <td className="px-4 py-3 text-navy/70">E-shape barre</td>
                      <td className="px-4 py-3 text-navy/70">1st fret (6th string root)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 21</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-navy">B Major</td>
                      <td className="px-4 py-3 text-navy/70">A-shape barre</td>
                      <td className="px-4 py-3 text-navy/70">2nd fret (5th string root)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 22</td>
                    </tr>
                    <tr className="bg-navy/5">
                      <td className="px-4 py-3 font-bold text-navy">B Minor</td>
                      <td className="px-4 py-3 text-navy/70">Am-shape barre</td>
                      <td className="px-4 py-3 text-navy/70">2nd fret (5th string root)</td>
                      <td className="px-4 py-3 text-gold font-semibold">Lesson 22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FOOTER CTA */}
            <div className="bg-gradient-to-r from-gold/20 to-navy/20 border-2 border-gold rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-navy mb-4">Ready to Master These Shapes?</h2>
              <p className="text-navy/70 mb-6">
                You're not learning 180 chords. You're learning 6 shapes that unlock the entire guitar.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a 
                  href="/lessons/4"
                  className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg"
                >
                  Start with Lesson 4: Understanding Shapes
                </a>
                <a 
                  href="/lessons"
                  className="px-6 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-lg transition-all shadow-lg"
                >
                  Browse All Lessons
                </a>
              </div>
            </div>

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
              href="/resources"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-navy font-bold rounded-lg transition-all shadow-md border-2 border-navy"
            >
              📖 All Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
