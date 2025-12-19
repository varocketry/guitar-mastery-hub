'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

const shapeLibraryContent = `# 🎸 Guitar Shape Library
## Complete Reference for Chord Shapes

**Based on Den Lopez's "Shapes Not Chords" Philosophy**

---

## Understanding Shapes: The Revolutionary Concept

### What is a "Shape"?

A **shape** is a finger pattern that you can move to different positions on the fretboard.

**Traditional Thinking (Wrong):**
- "I need to learn C major, then learn F major, then learn B♭ major..."
- Result: 180 isolated fingerings to memorize

**Shape Thinking (Right):**
- "I'll learn the C-shape pattern, then move it to create F, B♭, and all major chords"
- Result: 6 shapes that unlock 72+ chord positions

---

## Why Shapes Change Everything

### The Problem with "Learning Chords"

Most beginners think:
- ❌ Every chord is unique and unrelated
- ❌ Must memorize 180 different fingerings
- ❌ Barre chords are completely different from open chords
- ❌ The fretboard is a mystery

**This is overwhelming and inefficient.**

### The Shape Philosophy Solution

With shape thinking:
- ✅ 6 core patterns cover everything
- ✅ Open chords are just "shapes at the nut"
- ✅ Barre chords are "moving those same shapes"
- ✅ Fretboard becomes a logical pattern

**This is manageable and powerful.**

---

## The 6 Core Shapes

### Shape Family Overview

| Shape | Open Position | Movable Version | Most Common Uses |
|-------|---------------|-----------------|------------------|
| **E-Shape** | E major/minor at nut | Barre chords on 6th string | F, F#, G, Ab, A, Bb, B, C |
| **A-Shape** | A major/minor at nut | Barre chords on 5th string | Bb, B, C, C#, D, Eb, E, F |
| **D-Shape** | D major at nut | Triangle chord voicings | Rare as barre, common as triads |
| **C-Shape** | C major at nut | Movable C-shape (difficult) | Mostly used in open position |
| **G-Shape** | G major at nut | Movable G-shape (difficult) | Mostly used in open position |
| **Triads** | Various 3-note shapes | All over fretboard | Lead guitar, chord melody |

**Master these 6 patterns → Access to 100+ chord positions**

---

## Shape 1: E-Shape Family

### Open E Major

\`\`\`
E Major (E-shape at nut):
    E A D G B e
    | | | | | |
    0-0-0-1-2-3  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): G string, 1st fret
- Middle (2): A string, 2nd fret
- Ring (3): D string, 2nd fret
- Other strings: Open
\`\`\`

**Notes:** E - B - E - G# - B - E

---

### Open E Minor

\`\`\`
E Minor (Em-shape at nut):
    E A D G B e
    | | | | | |
    0-0-0-2-3-0  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Middle (2): A string, 2nd fret
- Ring (3): D string, 2nd fret
- Other strings: Open
\`\`\`

**Notes:** E - B - E - G - B - E

**Key Difference:** Only ONE note changes (G# → G)

---

### Movable E-Shape: F Major Barre

\`\`\`
F Major (E-shape moved to 1st fret):
    E A D G B e
    | | | | | |
    1-1-1-2-3-4  ← Fret 1
    | | | | | |
    
Fingers:
- Index (1): Barre across all 6 strings, 1st fret
- Middle (2): G string, 2nd fret
- Ring (3): A string, 3rd fret
- Pinky (4): D string, 3rd fret
\`\`\`

**Notes:** F - C - F - A - C - F

**See it?** This is exactly the E major shape, moved up 1 fret with a barre.

---

### E-Shape Major: Movable Positions

| Fret | Root Note | Chord | Shape |
|------|-----------|-------|-------|
| 0 | E | E major | E-shape (open) |
| 1 | F | F major | E-shape + barre |
| 3 | G | G major | E-shape + barre |
| 5 | A | A major | E-shape + barre |
| 7 | B | B major | E-shape + barre |
| 8 | C | C major | E-shape + barre |
| 10 | D | D major | E-shape + barre |

**Same finger pattern. Different frets. Different chords.**

---

### E-Shape Minor: Movable Positions

\`\`\`
Em-shape moved to 3rd fret = G minor:
    E A D G B e
    | | | | | |
    3-3-3-5-5-3  ← Fret 3
    | | | | | |
\`\`\`

| Fret | Root Note | Chord | Shape |
|------|-----------|-------|-------|
| 0 | E | E minor | Em-shape (open) |
| 1 | F | F minor | Em-shape + barre |
| 3 | G | G minor | Em-shape + barre |
| 5 | A | A minor | Em-shape + barre |
| 7 | B | B minor | Em-shape + barre |
| 8 | C | C minor | Em-shape + barre |
| 10 | D | D minor | Em-shape + barre |

**One shape. Major or minor. Anywhere on neck.**

---

## Shape 2: A-Shape Family

### Open A Major

\`\`\`
A Major (A-shape at nut):
    E A D G B e
    X | | | | |
    --0-0-2-3-2  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): D string, 2nd fret
- Middle (2): G string, 2nd fret
- Ring (3): B string, 2nd fret
- A string: Open
- High e string: Open
- Low E string: Muted (X)
\`\`\`

**Notes:** A - E - A - C# - E

---

### Open A Minor

\`\`\`
A Minor (Am-shape at nut):
    E A D G B e
    X | | | | |
    --0-1-2-3-0  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): B string, 1st fret
- Middle (2): D string, 2nd fret
- Ring (3): G string, 2nd fret
- A and high e strings: Open
- Low E string: Muted (X)
\`\`\`

**Notes:** A - E - A - C - E

**Key Difference:** C# → C (one note changes)

---

### Movable A-Shape: B♭ Major Barre

\`\`\`
B♭ Major (A-shape moved to 1st fret):
    E A D G B e
    X | | | | |
    --1-1-3-4-3  ← Fret 1
    | | | | | |
    
Fingers:
- Index (1): Barre on A, D, G, B strings, 1st fret
- Middle (2): G string, 3rd fret
- Ring (3): B string, 4th fret
- Pinky (4): e string, 3rd fret
- Low E string: Muted
\`\`\`

**Notes:** Bb - F - Bb - D - F

**See it?** This is exactly the A major shape, moved with barre.

---

### A-Shape Major: Movable Positions

| Fret | Root Note (5th String) | Chord | Shape |
|------|----------------------|-------|-------|
| 0 | A | A major | A-shape (open) |
| 1 | Bb | Bb major | A-shape + barre |
| 3 | C | C major | A-shape + barre |
| 5 | D | D major | A-shape + barre |
| 7 | E | E major | A-shape + barre |
| 10 | G | G major | A-shape + barre |
| 12 | A | A major | A-shape + barre (octave) |

---

### A-Shape vs E-Shape: Same Chord, Different Sound

**Example: C Major**

**Using E-Shape (8th fret on 6th string):**
- Lower, fuller sound
- Root on 6th string (low E)

**Using A-Shape (3rd fret on 5th string):**
- Brighter, tighter sound
- Root on 5th string (A)

**Both are C major. Different voicings. Different tonal colors.**

This is why shapes matter—you can choose the sound you want!

---

## Shape 3: D-Shape Family

### Open D Major

\`\`\`
D Major (D-shape at nut):
    E A D G B e
    X X | | | |
    ----0-1-3-2  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): G string, 2nd fret
- Middle (2): high e string, 2nd fret
- Ring (3): B string, 3rd fret
- D string: Open
- E and A strings: Muted (XX)
\`\`\`

**Notes:** D - A - D - F#

**Shape Characteristic:** Triangle formation with fingers

---

### Open D Minor

\`\`\`
D Minor (Dm-shape at nut):
    E A D G B e
    X X | | | |
    ----0-1-3-1  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): high e string, 1st fret
- Middle (2): G string, 2nd fret
- Ring (3): B string, 3rd fret
- D string: Open
- E and A strings: Muted (XX)
\`\`\`

**Notes:** D - A - D - F

---

### Movable D-Shape: Rare as Full Barre

**Why D-shape is different:**
- Difficult to barre (requires 4 fingers + barre)
- Usually appears as "triad shapes" (3 notes)
- More common in lead/melody playing than rhythm

**Where you WILL use D-shape thinking:**
- Triad voicings on strings 2-3-4
- Chord melody techniques
- Advanced voicings

**For now:** Master the open position. Advanced uses come in Lessons 31+.

---

## Shape 4: C-Shape Family

### Open C Major

\`\`\`
C Major (C-shape at nut):
    E A D G B e
    X | | | | |
    --3-0-2-0-1  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Index (1): B string, 1st fret
- Middle (2): D string, 2nd fret
- Ring (3): A string, 3rd fret
- G and high e strings: Open
- Low E string: Muted (X)
\`\`\`

**Notes:** C - E - G - C - E

---

### Movable C-Shape: Advanced Technique

**Why C-shape is rarely moved:**
- Requires large finger stretch
- Awkward hand position
- Open strings are part of what makes it work

**Where you'll see movable C-shape:**
- Jazz voicings (advanced)
- Partial chord shapes (omitting some notes)
- Rare in rock/pop rhythm guitar

**For now:** Master open C. You'll use it constantly.

---

## Shape 5: G-Shape Family

### Open G Major

\`\`\`
G Major (G-shape at nut):
    E A D G B e
    | | | | | |
    3-0-2-0-0-3  ← Fret 0 (open)
    | | | | | |
    
Fingers:
- Middle (2): A string, 2nd fret
- Index (1): E string, 3rd fret (optional)
- Ring (3): high e string, 3rd fret
- D, G, B strings: Open

Alternative fingering (more common):
- Middle (2): A string, 2nd fret  
- Ring (3): low E string, 3rd fret
- Pinky (4): high e string, 3rd fret
\`\`\`

**Notes:** G - B - D - G - B - G

---

### Movable G-Shape: Advanced/Rare

**Why G-shape is rarely moved:**
- Very wide stretch required
- Depends on open strings for fullness
- Can create partial voicings when moved

**Where you'll see it:**
- Advanced jazz/blues voicings
- Partial chord fragments
- Not common in beginner-intermediate playing

**For now:** Master open G. It's one of the most common chords in all music.

---

## Shape 6: Triad Shapes

### What Are Triads?

**Triads** are 3-note chord shapes—the essential notes of a chord (root, third, fifth).

**Why learn them:**
- Small, movable shapes
- Connect the fretboard
- Used in lead guitar
- Create chord melody
- Foundation for advanced playing

---

### Major Triad Shape 1 (Strings 1-2-3)

\`\`\`
C Major Triad (high strings):
    e B G  ← strings
    | | |
    5-5-5  ← 5th fret
    | | |

Fingers:
- Index finger barres across strings 1-2-3 at 5th fret
\`\`\`

**Move this shape:**
- 5th fret = C major
- 7th fret = D major
- 9th fret = E major
- 12th fret = G major

---

### Major Triad Shape 2 (Strings 2-3-4)

\`\`\`
C Major Triad (middle strings):
    B G D  ← strings
    | | |
    5-5-5  ← 5th fret
    | | |
\`\`\`

**Same notes, different strings. Learns in Lessons 25+.**

---

### Minor Triad Shapes

**Same positions as major, but:**
- Middle note moves down 1 fret
- Changes major to minor

**Example:**
\`\`\`
C Major Triad:     C Minor Triad:
    e B G              e B G
    | | |              | | |
    5-5-5              5-4-5  ← middle note down 1 fret
\`\`\`

---

## How Shapes Connect

### The CAGED System (Same Concept, Different Name)

**JustinGuitar and others call this "CAGED":**
- **C**-shape
- **A**-shape
- **G**-shape
- **E**-shape
- **D**-shape

**It's the same 5 shapes we're teaching!**

The order "CAGED" represents how shapes connect along the neck for one chord. But you don't need to learn the system deeply—just understand the shapes.

---

### Shape Relationships

**Key Insight:** Shapes overlap and connect

**Example: Playing G major up the neck**

- **Open G:** G-shape at nut (fret 0)
- **G on 3rd fret:** E-shape (barre at 3rd fret, root on 6th string)
- **G on 10th fret:** A-shape (barre at 10th fret, root on 5th string)

**Same chord. Three different shapes. Three different sounds.**

---

## Using Shapes in Your Learning Journey

### Lessons 1-4: Learn the Open Shapes

**What you're doing:**
- Learning E, A, D, G, C in open position
- You're learning **shapes**, not just "chords"
- Building finger patterns

**You don't realize it yet, but:**
You're learning movable patterns that will unlock the entire fretboard!

---

### Lessons 5-14: Apply the Shapes

**What you're doing:**
- Playing songs using these shapes
- Switching between shapes
- Building fluency

**What's actually happening:**
- Your brain is encoding these patterns
- Muscle memory is forming
- Foundation is being built for barre chords

---

### Lessons 15-20: Power Chords (Simplified Shapes)

**What you're learning:**
- 2-note shapes (root + fifth)
- Movable patterns up and down neck
- Same principle: learn the shape, move it

**This reinforces:** The fretboard is patterns, not mystery

---

### Lessons 21-24: Move Your Shapes (Barre Chords)

**The big reveal:**

**"That E major chord you learned in Lesson 1? Add a barre, move it to the 3rd fret—now it's G major!"**

**This isn't new—it's the same shape you already know!**

**Barre chords suddenly make sense:**
- F major = E-shape moved
- Bb major = A-shape moved
- All barre chords = shapes you already know

---

### Lessons 25-30: Triads and Advanced Shapes

**What's next:**
- Smaller 3-note shapes
- Moving all over the fretboard
- Connecting lead and rhythm
- Complete fretboard mastery

---

## Shape Mastery Checklist

### Beginner Level (Lessons 1-14)

- [ ] Can play all 5 open major shapes (E, A, D, G, C)
- [ ] Can play all 3 open minor shapes (Em, Am, Dm)
- [ ] Understand that these are "shapes" not isolated chords
- [ ] Can name the shape family ("This is an E-shape")
- [ ] Smooth transitions between shapes

---

### Intermediate Level (Lessons 15-24)

- [ ] Can play E-shape major as barre chord (F, G, A, Bb)
- [ ] Can play A-shape major as barre chord (Bb, C, D)
- [ ] Can play E-shape minor as barre chord (Fm, Gm, Am)
- [ ] Can play A-shape minor as barre chord (Bbm, Cm, Dm)
- [ ] Understand how power chords relate to full chords
- [ ] Can choose which shape to use for a given chord

---

### Advanced Level (Lessons 25-30)

- [ ] Can play triad shapes on multiple string sets
- [ ] Can find any chord in 3+ positions on neck
- [ ] Understand how shapes connect (CAGED concept)
- [ ] Can use shapes for chord melody playing
- [ ] Can modify shapes for different voicings

---

## Quick Reference: Root Notes

### 6th String (E string)

| Fret | Note |
|------|------|
| 0 | E |
| 1 | F |
| 3 | G |
| 5 | A |
| 7 | B |
| 8 | C |
| 10 | D |
| 12 | E (octave) |

**Use E-shape for these roots**

---

### 5th String (A string)

| Fret | Note |
|------|------|
| 0 | A |
| 1 | Bb |
| 3 | C |
| 5 | D |
| 7 | E |
| 10 | G |
| 12 | A (octave) |

**Use A-shape for these roots**

---

## Practical Applications

### Scenario 1: Song Requires Bb Major

**Your options:**

**Option 1: A-shape**
- 1st fret, 5th string root
- Bright, tight sound
- Easier reach

**Option 2: E-shape**
- 6th fret, 6th string root
- Fuller, deeper sound
- Requires more stretch

**Choose based on:**
- What comes before/after (minimize hand movement)
- Desired tonal quality
- Your comfort level

---

### Scenario 2: Playing in Key of G

**Chords needed:** G, C, D, Em

**Shape choices:**
- **G:** Open G-shape (easiest)
- **C:** Open C-shape (easiest)
- **D:** Open D-shape (easiest)
- **Em:** Open Em-shape (easiest)

**All open chords! This is why G is a "guitar-friendly" key.**

---

### Scenario 3: Playing in Key of Bb

**Chords needed:** Bb, Eb, F, Gm

**No open chords available. Use shapes:**
- **Bb:** A-shape at 1st fret OR E-shape at 6th fret
- **Eb:** A-shape at 6th fret
- **F:** E-shape at 1st fret (or open, different voicing)
- **Gm:** Em-shape at 3rd fret

**Now keys with sharps/flats are no harder than open position!**

---

## Practice Exercises

### Exercise 1: Shape Recognition

**Play these chords and identify the shape:**

1. Open E major → "E-shape"
2. Open A minor → "A-shape (minor)"
3. Open D major → "D-shape"
4. F major (1st fret barre) → "E-shape moved"
5. C major (3rd fret on A string) → "A-shape moved"

**Goal:** Automatic shape recognition

---

### Exercise 2: Same Chord, Different Shapes

**Play G major three ways:**

1. Open position (G-shape)
2. 3rd fret, 6th string root (E-shape)
3. 10th fret, 5th string root (A-shape)

**Listen:** Notice how each sounds different but all are G major

**Goal:** Understand voicing choices

---

### Exercise 3: Shape Transformation

**Start with E major (open)**

1. Play it
2. Move everything up 1 fret, add barre → F major
3. Move up to 3rd fret → G major
4. Move up to 5th fret → A major

**Goal:** Feel how shapes move

---

### Exercise 4: Major/Minor Shifting

**E-shape at 3rd fret:**

1. Play G major (E-shape major)
2. Change middle note (G string) down 1 fret → G minor
3. Back to major
4. Back to minor

**Goal:** Understand major/minor relationship

---

## Resources

### Video Resources

**Den Lopez - Shapes Philosophy:**
- Search YouTube: "Den Lopez chord shapes"
- His explanations are clear and revolutionary

**JustinGuitar - CAGED System:**
- Search: "JustinGuitar CAGED"
- Same concept, different name
- Excellent free resource

**Marty Music - Chord Theory:**
- Search: "Marty Music barre chords"
- Practical applications

---

### Within This Platform

**Learning Guide:** Understanding why shapes work (learning science)
**Practice Philosophy:** How to practice shapes effectively
**Lesson 4:** Explicit introduction to shape thinking
**Lessons 21-24:** Moving shapes (barre chords)

---

## Common Questions

### "Do I need to memorize all the fret positions?"

**No!** You just need to know:
1. The 6 shapes
2. Where the root notes are (5th and 6th strings mainly)
3. The shape for that root

**Example:**
- Need Bb major?
- Root on 5th string (A) is 1st fret
- Use A-shape at 1st fret
- Done!

---

### "Why not just memorize every chord position?"

**You could, but:**
- 12 keys × 15 chord types = 180 positions
- Overwhelming
- Doesn't teach you WHY it works
- Hard to remember

**With shapes:**
- 6 patterns × major/minor = 12 core patterns
- Logical system
- Teaches fretboard geography
- Easier to remember

---

### "When will this 'click' for me?"

**Timeline:**
- **Lessons 1-4:** Learning shapes (don't fully understand yet)
- **Lessons 5-14:** Using shapes (starting to see patterns)
- **Lessons 15-20:** Power chords reinforce patterns
- **Lessons 21-24:** BREAKTHROUGH—"Oh! It's all shapes!"
- **Lessons 25-30:** Complete understanding

**Be patient. The "aha moment" comes around Lesson 21-24 for most students.**

---

### "I'm confused. Should I just focus on chords for now?"

**No—keep thinking shapes from the beginning!**

**Every time you learn a chord, think:**
- "This is a D-shape"
- "This is an E-shape"
- "This is an A-shape"

**This mental framing pays off hugely in Lessons 21-24.**

---

## Final Thoughts

**You're not learning 180 chords.**
**You're learning 6 shapes that unlock the entire guitar.**

This is the secret that takes guitarists from "I know some chords" to "I understand the fretboard."

**Trust the process. Learn the shapes. Master the patterns.**

**Your future guitarist self will thank you.**

---

> **"The guitar is a miniature orchestra in itself."** — Ludwig van Beethoven

> **"Good things come to those who wait... greater things come to those who work."** — Unknown

> **"I don't measure a man's success by how high he climbs but how high he bounces when he hits bottom."** — George S. Patton

**Learn the shapes. Master the guitar.** 🎸

---

*This Shape Library is based on Den Lopez's "Shapes Not Chords" philosophy, the CAGED system, and proven music pedagogy adapted for adult self-directed learners.*
`;

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
            <article className="lesson-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}> 
                {shapeLibraryContent}
              </ReactMarkdown>
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
