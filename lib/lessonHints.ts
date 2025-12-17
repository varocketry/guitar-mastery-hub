// lib/lessonHints.ts
// Practice tracking hints for each lesson
// Auto-populated in practice tracker when lesson number is provided

export interface LessonHint {
  lessonNumber: number;
  title: string;
  techniques: string;
  songs: string;
  focusAreas: string;
}

export const lessonHints: Record<number, LessonHint> = {
  1: {
    lessonNumber: 1,
    title: "Your First Two Chords",
    techniques: "Em chord formation, Am chord formation, finger placement on tips, chord transitions",
    songs: "'Horse with No Name' (Em-Am progression)",
    focusAreas: "Clean string ringing, smooth transitions between Em and Am, building calluses"
  },
  
  2: {
    lessonNumber: 2,
    title: "Your Third Chord - D Major",
    techniques: "D major chord (three-finger triangle), transitioning Em-D and Am-D, finger independence",
    songs: "'Knockin' on Heaven's Door' simplified, three-chord progressions",
    focusAreas: "D major formation speed, avoiding buzzing on open D string, smooth chord changes"
  },
  
  3: {
    lessonNumber: 3,
    title: "Fourth & Fifth Chords - G & C",
    techniques: "G major chord (all 6 strings), C major chord (5 strings), five-chord integration",
    songs: "'Let It Be' progression (C-G-Am-Em-D)",
    focusAreas: "G major finger stretch, C major high e string clarity, remembering all five chords"
  },
  
  4: {
    lessonNumber: 4,
    title: "Understanding Guitar Shapes",
    techniques: "Shape recognition, understanding movable patterns, connecting shapes to future barre chords",
    songs: "'Let It Be' complete with shape awareness",
    focusAreas: "Thinking in shapes not isolated chords, seeing patterns across fretboard"
  },
  
  5: {
    lessonNumber: 5,
    title: "Strumming Patterns & Rhythm",
    techniques: "Down-up strumming patterns, maintaining rhythm, strumming with dynamics, metronome practice",
    songs: "'Horse with No Name' with Pattern #2, 'Knockin' on Heaven's Door' with strumming",
    focusAreas: "Consistent rhythm, hand keeps moving on skipped strums, groove development"
  },
  
  6: {
    lessonNumber: 6,
    title: "The E-Shape Major Version",
    techniques: "E major chord formation, A major chord (two methods), E-shape philosophy, major/minor shape relationship",
    songs: "'Wild Thing' (A-D-E progression), 'La Bamba' style, 'Love Me Do' chorus",
    focusAreas: "E major finger angles, A major three-finger wall, understanding shape families"
  },
  
  7: {
    lessonNumber: 7,
    title: "Foundation Review & Assessment",
    techniques: "Reviewing all seven open chords, testing transition speed, identifying weak areas",
    songs: "Playing multiple complete songs, self-assessment of Week 1 skills",
    focusAreas: "Smooth transitions, consistent timing, completing songs without stopping"
  },
  
  8: {
    lessonNumber: 8,
    title: "Advanced Strumming Techniques",
    techniques: "Syncopated rhythms, accent patterns, dynamics (loud/soft), 16th note strumming",
    songs: "Songs with complex rhythmic patterns, funk-style strumming",
    focusAreas: "Off-beat emphasis, maintaining groove, dynamic control"
  },
  
  9: {
    lessonNumber: 9,
    title: "Music Reading Basics",
    techniques: "Reading chord charts, understanding rhythm notation, tablature basics",
    songs: "Playing from written music, sight-reading simple progressions",
    focusAreas: "Chart reading fluency, rhythm notation understanding"
  },
  
  10: {
    lessonNumber: 10,
    title: "Fingerstyle Basics",
    techniques: "P-i-m-a finger technique, alternating bass patterns, basic arpeggios, thumb independence",
    songs: "Simple fingerstyle songs, classical patterns",
    focusAreas: "Finger independence, consistent bass notes, smooth arpeggios"
  },
  
  11: {
    lessonNumber: 11,
    title: "Percussive & Palm Muting Techniques",
    techniques: "Palm muting at bridge, percussive strumming, ghost notes, staccato vs sustained",
    songs: "Funk patterns, reggae rhythms, rock power chord muting",
    focusAreas: "Consistent palm mute pressure, percussive accuracy, rhythmic precision"
  },
  
  12: {
    lessonNumber: 12,
    title: "Travis Picking Mastery",
    techniques: "Travis picking pattern, alternating bass, melody over bass, complex fingerstyle",
    songs: "Folk songs with Travis picking, 'Dust in the Wind' style patterns",
    focusAreas: "Bass note consistency, melody integration, pattern variations"
  },
  
  13: {
    lessonNumber: 13,
    title: "Walking Bass Lines",
    techniques: "Bass line movement, connecting chords with bass runs, chromatic approaches",
    songs: "Blues progressions with walking bass, jazz-influenced chord changes",
    focusAreas: "Smooth bass transitions, timing of bass runs, chord-to-chord connection"
  },
  
  14: {
    lessonNumber: 14,
    title: "First Complete Song - Stand By Me",
    techniques: "Integrating all foundation skills, performance preparation, playing complete arrangements",
    songs: "'Stand By Me' full arrangement, other complete song performances",
    focusAreas: "Maintaining tempo throughout song, smooth section transitions, confidence"
  },
  
  15: {
    lessonNumber: 15,
    title: "Power Chord Preparation",
    techniques: "Introduction to E5 and A5 power chords, string muting, transitions between power chords",
    songs: "'Wild Thing' with power chords, 'Blitzkrieg Bop' style progressions",
    focusAreas: "Clean two-note voicing, effective string muting, rock rhythm foundation"
  },
  
  16: {
    lessonNumber: 16,
    title: "Understanding the Fretboard",
    techniques: "Musical alphabet, note mapping on E and A strings, movable power chord concept, landmark notes",
    songs: "'Smoke on the Water' opening, 'Seven Nation Army' riff",
    focusAreas: "Root note location, fretboard navigation, finding any power chord anywhere"
  },
  
  17: {
    lessonNumber: 17,
    title: "Power Chord Fundamentals & Root Movement",
    techniques: "6th string root power chords (E5, F5, G5, A5), palm muting with power chords, basic transitions",
    songs: "'Blitzkrieg Bop' progression, 'Smoke on the Water' complete, punk progressions",
    focusAreas: "Two-note power chord shape, palm mute consistency, root note awareness"
  },
  
  18: {
    lessonNumber: 18,
    title: "5th String Roots & Advanced Transitions",
    techniques: "5th string root power chords (A5, B5, C5, D5, E5), switching between 6th and 5th string roots, chromatic movement",
    songs: "'Wild Thing' progression, 'Louie Louie' pattern, AC/DC-style grooves, 'Smells Like Teen Spirit' intro",
    focusAreas: "Mixed root transitions, faster chord changes, eighth-note rhythm patterns"
  },
  
  19: {
    lessonNumber: 19,
    title: "Power Chord Riffs & Three-Note Voicings",
    techniques: "Three-note power chords (root-fifth-octave), riff construction, combining power chords with single notes, advanced string dampening",
    songs: "'Smoke on the Water' complete, 'Sunshine of Your Love', 'You Really Got Me', 'Day Tripper' style",
    focusAreas: "Hybrid riffing, staccato power chords, clean note separation"
  },
  
  20: {
    lessonNumber: 20,
    title: "Advanced Power Chords & Integration",
    techniques: "Syncopated rhythm patterns, power chord song structures, dynamic control, connecting power chords with open chords",
    songs: "Classic rock formula songs, punk rock structures, grunge quiet-LOUD-quiet patterns",
    focusAreas: "Syncopation, dynamic arcs, complete song arrangements"
  },
  
  21: {
    lessonNumber: 21,
    title: "Major Barre Chords - E Shape Foundation",
    techniques: "E-shape major barre chords, index finger barre technique, F major (1st position), hand positioning, strength building",
    songs: "Songs using F, G, A, C major barre chords, movable chord progressions",
    focusAreas: "Clean barre tone, G string clarity, barre finger endurance, proper hand position"
  },
  
  22: {
    lessonNumber: 22,
    title: "A-Shape & Minor Barre Chords",
    techniques: "A-shape major barre chords (5th string root), E-shape and A-shape minor barre chords, 6th string muting, major-to-minor transformations",
    songs: "C major (A-shape), Am-F-C-G progression, major/minor emotional contrast songs",
    focusAreas: "A-shape construction, shape selection strategy, major vs minor in context"
  },
  
  23: {
    lessonNumber: 23,
    title: "Barre Chord Progressions & Fluency",
    techniques: "Advanced transition techniques, complete song progressions in various keys, strategic shape selection, sliding transitions, pivot fingers",
    songs: "'Let It Be' style, 'Hotel California' intro, 'Wonderwall' progression, classic blues (I-IV-V)",
    focusAreas: "Shape selection for minimal movement, speed building, progressive tempo training"
  },
  
  24: {
    lessonNumber: 24,
    title: "Complete Integration & Performance",
    techniques: "Combining open, power, and barre chords, complete song arrangements, dynamic arrangement, performance stamina",
    songs: "Acoustic rock ballad arrangement, punk rock anthem, singer-songwriter style, complete 3-4 minute performances",
    focusAreas: "Strategic chord type mixing, verse-chorus contrast, professional endings"
  },
  
  25: {
    lessonNumber: 25,
    title: "Single-Note Melodies & Scale Introduction",
    techniques: "Alternate picking fundamentals, E minor pentatonic 'box pattern', single-note technique, clean tone, simple melodies",
    songs: "'Mary Had a Little Lamb', blues licks, simple rock riffs, chord-melody integration",
    focusAreas: "Alternate picking accuracy, pentatonic scale pattern, single-note clarity"
  },
  
  26: {
    lessonNumber: 26,
    title: "String Bending, Vibrato & Blues",
    techniques: "String bending (half-step and whole-step), vibrato (wrist technique), blues scale, call and response improvisation",
    songs: "12-bar blues progressions, classic blues licks, blues shuffle rhythm",
    focusAreas: "Bending pitch accuracy, vibrato control, playing with blues feel"
  },
  
  27: {
    lessonNumber: 27,
    title: "Advanced Lead & Solo Construction",
    techniques: "All 5 pentatonic positions, hammer-ons and pull-offs (legato), slides, connecting positions, speed building, melodic phrasing",
    songs: "Complete guitar solos, rock and metal lead styles, position shifting exercises",
    focusAreas: "Position connectivity, legato smoothness, phrasing and space, building intensity"
  },
  
  28: {
    lessonNumber: 28,
    title: "Rhythm-Lead Integration",
    techniques: "Switching between rhythm and lead, hybrid technique (pick + fingers), chord fragments for comping, filling space between phrases",
    songs: "Complete song arrangements (both rhythm and lead parts), intro-verse-chorus-solo-outro structures",
    focusAreas: "Quick transitions chords to scales, solo construction over changes, both roles fluently"
  },
  
  29: {
    lessonNumber: 29,
    title: "Complete Performance Preparation",
    techniques: "Complete song repertoire (5-10 songs), performance anxiety management, error recovery, stage presence, recording yourself",
    songs: "3 rhythm-focused songs, 2 songs with lead/solo sections, 1 challenging showcase piece",
    focusAreas: "Mental preparation, mistake recovery, tempo maintenance under pressure, confidence"
  },
  
  30: {
    lessonNumber: 30,
    title: "Celebration & Future Roadmap",
    techniques: "Complete 30-day skill assessment, performance of complete setlist, goal setting for continued growth",
    songs: "Complete setlist performance, demonstrating all learned techniques",
    focusAreas: "Comprehensive skill demonstration, identifying strengths, planning next 3-12 months"
  },
  
  31: {
    lessonNumber: 31,
    title: "Music Theory Fundamentals",
    techniques: "Major scale construction, intervals, chord theory, scale degrees, key signatures",
    songs: "Applying theory to known songs, analyzing chord progressions",
    focusAreas: "Understanding the 'why' behind chords, connecting theory to fretboard"
  },
  
  32: {
    lessonNumber: 32,
    title: "Chord Construction & Harmonic Function",
    techniques: "Building triads, seventh chords, chord extensions, harmonic analysis, I-IV-V-vi progressions",
    songs: "Analyzing popular song progressions, writing original progressions",
    focusAreas: "Chord construction from scales, functional harmony, creating progressions"
  }
};

// Helper function to get hint for a specific lesson
export function getLessonHint(lessonNumber: number): LessonHint | null {
  return lessonHints[lessonNumber] || null;
}

// Helper function to get placeholder text for forms
export function getPlaceholderText(lessonNumber: number | null, field: 'techniques' | 'songs' | 'focusAreas'): string {
  if (!lessonNumber) {
    // Generic fallback if no lesson number provided
    const genericPlaceholders = {
      techniques: "Example: Chord transitions, strumming patterns, specific exercises...",
      songs: "Example: Songs or exercises you worked on today...",
      focusAreas: "Example: What needs more work or what you want to improve..."
    };
    return genericPlaceholders[field];
  }
  
  const hint = getLessonHint(lessonNumber);
  if (!hint) {
    // Fallback for lessons beyond current curriculum
    return `Example: What ${field} did you practice in Lesson ${lessonNumber}?`;
  }
  
  return `Example: ${hint[field]}`;
}

// Auto-expand for future lessons (33-46 when created)
// This function generates generic but helpful hints for lessons not yet detailed
export function getGenericHint(lessonNumber: number): LessonHint {
  // Theory Module 1 (Lessons 33-38) - Major key theory
  if (lessonNumber >= 33 && lessonNumber <= 38) {
    return {
      lessonNumber,
      title: `Theory Module 1 - Lesson ${lessonNumber}`,
      techniques: "Major key theory, scale patterns, harmonic analysis",
      songs: "Applying theory concepts to songs in major keys",
      focusAreas: "Understanding music theory, connecting concepts to fretboard"
    };
  }
  
  // Theory Module 2 (Lessons 39-46) - Minor key theory
  if (lessonNumber >= 39 && lessonNumber <= 46) {
    return {
      lessonNumber,
      title: `Theory Module 2 - Lesson ${lessonNumber}`,
      techniques: "Minor key theory, modal concepts, minor scale patterns",
      songs: "Applying theory concepts to songs in minor keys",
      focusAreas: "Minor key understanding, modal relationships"
    };
  }
  
  // Fallback for any lessons beyond current plan
  return {
    lessonNumber,
    title: `Lesson ${lessonNumber}`,
    techniques: "Advanced guitar techniques and concepts",
    songs: "Songs and exercises for this lesson",
    focusAreas: "Continued skill development and mastery"
  };
}

// Main function that handles all lesson numbers
export function getHintForLesson(lessonNumber: number): LessonHint {
  return lessonHints[lessonNumber] || getGenericHint(lessonNumber);
}
