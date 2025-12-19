'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import { getCurrentUser } from '@/lib/supabase';

const learningGuideContent = `# 🎓 The Science of Effective Guitar Learning

**Welcome to your comprehensive guide to mastering the acoustic guitar!** This program is built on decades of research in adult learning, motor skill acquisition, and music pedagogy. Understanding these principles will accelerate your progress and make practice more enjoyable and effective.

---

## 1. Deliberate Practice: The Foundation of Mastery

Not all practice is created equal. **Deliberate practice** is the most effective method for skill acquisition and involves:

- **Specific Goals:** Each session should target particular skills (e.g., "play C-G-D chord progression smoothly at 60 BPM")
- **Focused Attention:** Eliminate distractions and concentrate fully on the task
- **Immediate Feedback:** Record yourself, use a metronome, or play with others to assess your performance
- **Operating at the Edge:** Practice material that's challenging but achievable—not too easy, not impossible
- **Mistake Correction:** When errors occur, stop immediately, identify the problem, slow down, and fix it

> **Key Insight:** Research shows that 20 minutes of deliberate, focused practice is more effective than 2 hours of mindless repetition. Quality trumps quantity every time.

---

## 2. Spaced Repetition: The Secret to Long-Term Retention

Your brain consolidates skills more effectively when practice is distributed over time rather than crammed into single sessions. This is called the **spacing effect**:

- **Daily Practice:** Short sessions (20-45 minutes) daily are far superior to long weekend sessions
- **Revisit Material:** Review previous lessons at increasing intervals (1 day, 3 days, 7 days, 14 days, 30 days)
- **Allow for Forgetting:** Slight forgetting between sessions actually strengthens memory upon retrieval
- **Interleaving:** Mix different skills in one session rather than blocking them (e.g., 10 min chords, 10 min scales, 10 min songs)

---

## 2.5 "Slow is Smooth, Smooth is Fast"

This mantra, popularized by Navy SEALs and adopted by musicians worldwide, is central to our approach:

- **Slow Practice:** Start every new technique at 40-50% of target tempo
- **Perfect Execution:** Speed comes from accurate, tension-free movements
- **Incremental Tempo:** Increase by 5 BPM only when current tempo is flawless
- **Metronome is Mandatory:** Not optional—essential for building speed correctly

> **Why This Works:** Rushing creates sloppy muscle memory that's hard to fix. Slow, perfect repetitions build neural pathways that naturally speed up over time. You're building a Ferrari engine, not a rusty lawnmower.

### Practical Application

**Example: Learning a New Chord Progression**

- **Week 1:** Learn chord at 40 BPM (feels painfully slow—that's correct!)
- **Week 2:** Practice at 50 BPM (still slow, building accuracy)
- **Week 3:** Progress to 60 BPM (starting to feel natural)
- **Week 4:** Reach 70-80 BPM (performance speed emerging)

**See our complete [Practice Philosophy Guide](#) for detailed tempo progression strategies.**

---

## 3. Muscle Memory and Neural Pathways

When you practice guitar, you're literally rewiring your brain:

- **Myelination:** Repeated movements strengthen neural pathways through myelin sheath development
- **Motor Cortex Development:** Consistent practice expands the brain regions controlling finger movements
- **Automation:** With enough repetition, movements become automatic, freeing your conscious mind for musicality
- **Slow Practice:** Practicing slowly (50-70% of target tempo) builds cleaner neural pathways than rushing

---

## 3.5 Shape-Based Learning: The Den Lopez Approach

One of the most powerful breakthroughs in modern guitar pedagogy is understanding that **you're not learning 180 different chords—you're learning 6 movable shapes**.

> **The Shape Philosophy:** A "chord" is just a finger pattern (shape) that you can move to different positions on the fretboard. Instead of memorizing isolated fingerings, you learn the core shapes and how they move.

### The 6 Core Shapes

- **E-Shape:** Your open E major/minor chord becomes a movable pattern
- **A-Shape:** Your open A major/minor chord moves anywhere
- **D-Shape:** D major's triangle pattern is movable
- **C-Shape:** C major's distinctive shape travels the neck
- **G-Shape:** G major's reach becomes a movable voicing
- **Triads:** Small 3-note shapes that connect everything

### Why This Matters

- **Reduces Cognitive Load:** Instead of "180 chords to memorize," it's "6 shapes to move"
- **Fretboard Mastery:** You understand WHERE chords come from, not just memorizing positions
- **Easier Barre Chords:** When you reach Lessons 21-24, barre chords aren't "new and scary"—they're just "moving shapes you already know"
- **Transfer Effect:** Learning E-shape major also teaches you F, F#, G, G#, A, Bb, B, C (all the same shape!)
- **Pattern Recognition:** Your brain recognizes patterns faster than isolated fingerings

### How We Integrate This

- **Lessons 1-4:** You learn the 5 open shapes (E, A, D, G, C families)
- **Lesson 4:** We explicitly teach shape recognition
- **Lessons 5-14:** You apply these shapes in various contexts
- **Lessons 15-20:** Power chords (simplified shapes)
- **Lessons 21-30:** Moving your shapes = barre chords

> **Key Insight:** When you finish Lesson 30, you won't have "learned 30 chords." You'll have learned 6 shapes and how to move them across 12 frets, giving you access to 72+ chord positions. That's the power of shape-based thinking.

### Resources

- Den Lopez's YouTube channel explains this philosophy beautifully
- JustinGuitar calls this the "CAGED system" (same concept)
- Our **[Shape Library](#)** document (comprehensive reference material)

---

## 4. The 4-Part Practice Structure

Every effective practice session should include these components:

1. **Warm-Up (5 minutes):** Finger exercises, stretches, and light playing to prepare physically
2. **Technique Work (15 minutes):** Focused practice on specific technical skills with deliberate attention
3. **Repertoire (15 minutes):** Apply techniques to real songs and musical contexts
4. **Cool-Down & Review (5 minutes):** Play something you enjoy, reflect on progress, plan tomorrow

---

## 5. Effective Learning Strategies for Adult Guitarists

Adults learn differently than children. Leverage your advantages:

- **Goal Clarity:** You know why you want to play—use this motivation deliberately
- **Patience & Discipline:** Adults can maintain long-term commitment better than children
- **Conceptual Understanding:** Learn the "why" behind techniques—this accelerates learning
- **Self-Awareness:** Monitor your practice quality and adjust strategies accordingly
- **Scheduling:** Treat practice like an important appointment you can't miss

---

## 5.5 How This Platform Supports Your Learning

Unlike other courses, this platform is specifically designed for adult learners:

- **User-Controlled Progression:** Move at YOUR pace, not an arbitrary timeline
- **Realistic Completion Times:** Lessons take 2-7 days, not "one day" (because that's reality)
- **Comprehensive Depth:** 7,000-9,000 words per lesson (4x industry standard) means no gaps
- **Shape-Based Philosophy:** Learn patterns, not isolated fingerings
- **Built-In Troubleshooting:** Every lesson anticipates problems you'll encounter
- **No Artificial Time Pressure:** "Complete when ready" removes guilt and stress

> **What This Means:** You're not "behind" if Lesson 3 takes you 5 days. You're actually ahead—because you're building proper foundations that will accelerate your progress in Lessons 10, 20, and 30.

---

## 6. Common Pitfalls to Avoid

Watch out for these common mistakes:

- ❌ Playing only what you already know (comfort zone trap)
- ❌ Practicing with poor posture or excess tension
- ❌ Skipping fundamentals to jump to "fun" stuff
- ❌ Not using a metronome (timing is crucial!)
- ❌ Comparing yourself to others instead of tracking your own progress
- ❌ Giving up when progress plateaus (plateaus are normal and necessary!)
- ❌ Practicing at full speed too early (slow is smooth!)
- ❌ Not understanding shapes (thinking every chord is unique)
- ❌ Skipping the metronome (timing won't magically appear)
- ❌ Expecting progress every single session (plateaus are learning)

---

## 7. The Transfer Effect: Making Practice Efficient

When you master one skill, related skills become easier to learn. This is the **transfer effect**:

- Mastering one scale pattern helps you learn others faster
- Chord transitions in one key transfer to other keys
- Fingerpicking patterns share common movements
- Rhythm skills in one genre apply to all genres
- **Shape mastery transfers:** Learn E-shape once, use it for 12+ chords

---

## 8. Visualization and Mental Practice

You don't always need your guitar to practice:

- **Mental Rehearsal:** Visualize playing—this activates similar brain regions to physical practice
- **Audio Memory:** Sing or hum melodies and chord progressions
- **Shape Recognition:** Visualize chord shapes and finger positions away from the guitar
- **Score Study:** Read tabs and think through fingerings without playing
- **Fretboard Mapping:** Mentally map root notes and shape positions

---

## 9. Measuring Your Progress

Track these indicators to stay motivated:

- ✅ Can play chord progressions smoothly without looking
- ✅ Fingers move to correct positions automatically
- ✅ Can maintain steady rhythm with metronome
- ✅ Reduced physical tension while playing
- ✅ Completed songs sound musical, not mechanical
- ✅ Can recognize and correct your own mistakes
- ✅ Understand WHY techniques work, not just HOW
- ✅ Can identify chord shapes by feel
- ✅ Practice feels engaging, not frustrating

---

## 10. Understanding Progress Curves

Your learning won't be linear. Expect this pattern:

### The Typical Learning Curve

\`\`\`
Progress
    ^
    |     /----
    |    /
    |   /----
    |  /
    | /----
    |/
    +-----------> Time
    
    Initial   Plateau  Breakthrough  Plateau  Mastery
    Gains
\`\`\`

**What's Happening:**
- **Initial Gains (Days 1-7):** Rapid improvement, everything feels new and exciting
- **First Plateau (Days 8-14):** Progress slows, frustration may set in
- **Breakthrough (Days 15-21):** Suddenly things "click," big leap forward
- **Second Plateau (Days 22-30):** Consolidation phase, refining skills
- **Mastery Emerges (Day 30+):** Skills become automatic, musicality develops

> **Critical Insight:** Plateaus are NOT failure—they're consolidation. Your brain is integrating everything you've learned. Keep practicing during plateaus; breakthroughs are coming.

---

## 11. The Role of Rest and Recovery

Your body and brain need recovery time:

- **Rest Days:** Taking 1 day off per week is beneficial, not lazy
- **Sleep:** Learning consolidates during sleep—get 7-9 hours
- **Active Recovery:** Light, enjoyable playing counts as practice
- **Injury Prevention:** If fingers hurt excessively, take a break
- **Mental Breaks:** Short practice sessions are better than burnt-out long ones

---

## 12. Building Long-Term Success

### Year 1 Trajectory

**Months 1-2 (Foundation):** Basic chords, simple songs, technique fundamentals
**Months 3-4 (Expansion):** Barre chords, more complex progressions, basic lead
**Months 5-6 (Integration):** Complete songs, performance-ready pieces
**Months 7-12 (Specialization):** Choose your path (blues, rock, folk, jazz, classical)

### Keys to Sustained Progress

- **Consistency > Intensity:** 20 minutes daily beats 3 hours on Sunday
- **Enjoy the Process:** Play songs you love, not just exercises
- **Community:** Join guitar communities, play with others
- **Record Yourself:** Monthly recordings show progress you can't see daily
- **Set Mini-Goals:** "Play 'Wonderwall' smoothly" not "become Eric Clapton"

---

## 13. When You Get Stuck

**Troubleshooting Common Frustrations:**

### "I'm not making progress"
- Record yourself from 2 weeks ago—you're probably better than you think
- Are you practicing deliberately or mindlessly?
- Slow down your tempo—speed is hiding your mistakes
- Review fundamentals—there may be gaps in foundation

### "My hands hurt"
- Check posture—tension indicates poor positioning
- Are you pressing too hard? (Most common cause)
- Building calluses takes 2-3 weeks—normal soreness is okay
- Sharp pain = stop immediately and reassess

### "This chord change is impossible"
- You're probably trying at full speed—slow to 40 BPM
- Isolate the transition—repeat just that one change 50 times
- Look for "pivot fingers" that stay down during changes
- Time fixes everything—some changes take 2 weeks to smooth out

### "I can't keep rhythm"
- Use a metronome EVERY practice session (non-negotiable)
- Start at ridiculously slow tempos (40 BPM is normal)
- Tap your foot or count out loud
- Record yourself—you'll hear timing issues clearly

---

## 14. Resources and Further Learning

### Within This Platform

- **[Practice Philosophy Guide](#):** Deep dive into tempo progression and metronome usage
- **[Shape Library](#):** Complete reference for all chord shapes
- **Lesson-Specific Troubleshooting:** Every lesson includes common problem solutions
- **Progress Tracking:** Mark lessons complete as you master them

### External Resources (Supplement, Don't Replace)

- **JustinGuitar.com:** Free comprehensive lessons, great supplement
- **YouTube Channels:** Marty Music, Andy Guitar, Paul Davids
- **Apps:** GuitarTuna (tuning), Pro Metronome, Ultimate Guitar (tabs)
- **Communities:** r/Guitar on Reddit, local guitar groups

### When to Consider Private Lessons

Private instruction is valuable for:
- Correcting bad habits you can't identify yourself
- Personalized feedback on technique
- Accountability and motivation
- Advanced topics beyond this curriculum

But you can absolutely become a competent guitarist with this program alone.

---

## 15. Final Thoughts: The Guitarist's Mindset

### You Are Learning a Language

Guitar is a language. You wouldn't expect to speak French fluently after 30 days of study—but you'd expect to hold basic conversations. Same with guitar:

- **30 days:** Play simple songs, understand fundamentals
- **6 months:** Play intermediate repertoire, comfortable with most techniques
- **1 year:** Confident guitarist, can learn most songs
- **5 years:** Advanced player, can improvise and create

### Every Expert Was Once a Beginner

- Jimi Hendrix struggled with barre chords
- Eric Clapton's first months were frustrating
- Taylor Swift practiced until her fingers bled
- Ed Sheeran was once exactly where you are now

**The difference?** They didn't quit on Day 15 when it felt hard.

### The Journey IS the Destination

You're not learning guitar to "finish" and move on. You're developing a lifelong skill and source of joy. The frustrations of Week 2 will be forgotten when you're playing your favorite song at Week 8.

**Embrace the process. Trust the methodology. Practice daily. Be patient.**

---

## 🎸 Ready to Begin?

Now that you understand HOW learning works, you're equipped to make the most of every practice session.

**Start with Lesson 1, practice deliberately, and trust the process.**

Every chord you learn, every song you play, every practice session—you're building something permanent. Your future guitarist self will thank you for starting today.

---

> **"The guitar is a miniature orchestra in itself." — Ludwig van Beethoven**

> **"Music is the divine way to tell beautiful, poetic things to the heart." — Pablo Casals**

> **"The beautiful thing about learning is that no one can take it away from you." — B.B. King**

---

**Remember:** Learning guitar is a marathon, not a sprint. Celebrate small wins, be patient with yourself, and trust the process. Every expert was once a beginner who refused to give up. 🎸

---

*This learning guide is based on research in cognitive science, motor learning, and music pedagogy, adapted specifically for adult self-directed learners.*
`;

export default function LearningGuidePage() {
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
                {learningGuideContent}
              </ReactMarkdown>
            </article>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <a 
              href="/shape-library"
              className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-lg transition-all shadow-lg"
            >
              🎸 Shape Library
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
              📚 Start Learning
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
