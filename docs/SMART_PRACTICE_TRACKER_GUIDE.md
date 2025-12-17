# 🎸 Smart Practice Tracker Implementation Guide

## Overview
This guide covers implementing the single-tier, database-backed practice tracker with lesson-specific hints and video upload capabilities for all 46 lessons.

---

## ✅ What's Included

### 1. Core Files Created
- **`lessonHints.ts`** - Lesson-specific hints for all 32 existing lessons (auto-expands to 46)
- **`practice-page-with-hints-and-video.tsx`** - Full practice tracker component
- **Implementation guide** (this file)

### 2. Key Features
- ✅ Lesson-specific smart hints for all 32 current lessons
- ✅ Auto-expansion for Theory Module lessons (33-46)
- ✅ Video upload with preview
- ✅ Practice history with stats dashboard
- ✅ Star ratings for progress and focus
- ✅ Public/private sharing toggle
- ✅ Color-coded sections (wins=green, challenges=red, notes=yellow)

---

## 📂 File Locations

### Where Files Should Go:

```
your-project/
├── lib/
│   └── lessonHints.ts                    ← NEW FILE (create this directory if needed)
├── app/
│   └── practice/
│       └── page.tsx                      ← REPLACE with practice-page-with-hints-and-video.tsx
└── components/
    └── Navigation.tsx                    ← (you already have this)
```

---

## 🔧 Step-by-Step Implementation

### Step 1: Create lib Directory (if needed)
```bash
mkdir -p lib
```

### Step 2: Add lessonHints.ts
1. Copy `lessonHints.ts` to `lib/lessonHints.ts`
2. This file contains:
   - All 32 existing lesson hints
   - Auto-expansion for lessons 33-46
   - Helper functions for getting hints and placeholders

### Step 3: Update Practice Page
1. **Backup current practice page** (if you want to keep the old version):
   ```bash
   cp app/practice/page.tsx app/practice/page.tsx.backup
   ```

2. **Replace with new version**:
   ```bash
   cp practice-page-with-hints-and-video.tsx app/practice/page.tsx
   ```

### Step 4: Update Database Schema

Add video fields to `practice_sessions` table:

```sql
-- Add video columns to practice_sessions table
ALTER TABLE practice_sessions
ADD COLUMN video_url TEXT,
ADD COLUMN video_thumbnail TEXT,
ADD COLUMN is_public BOOLEAN DEFAULT false;

-- Create index for public sessions (for community features)
CREATE INDEX idx_practice_sessions_public 
ON practice_sessions(is_public, created_at DESC) 
WHERE is_public = true;
```

### Step 5: Create Storage Bucket for Videos

In Supabase Dashboard:
1. Go to Storage
2. Click "Create Bucket"
3. Name: `practice-videos`
4. Set to **Public** (users need to see their own videos)
5. Set policies:

```sql
-- Allow authenticated users to upload videos
CREATE POLICY "Users can upload practice videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'practice-videos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view their own videos
CREATE POLICY "Users can view their own videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'practice-videos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow viewing public videos
CREATE POLICY "Anyone can view public videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'practice-videos'
  AND EXISTS (
    SELECT 1 FROM practice_sessions
    WHERE video_url = storage.objects.name
    AND is_public = true
  )
);
```

### Step 6: Test the Implementation

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to practice page**: `http://localhost:3000/practice`

3. **Test lesson-specific hints**:
   - Try: `http://localhost:3000/practice?lesson=5`
   - Should show: "Lesson 5: Strumming Patterns & Rhythm"
   - Placeholders should update with lesson-specific examples

4. **Test video upload**:
   - Click "+ New Session"
   - Select a video file (max 100MB)
   - Should see preview before saving
   - After save, video should appear in session history

---

## 🎯 How Lesson Hints Work

### URL-Based Lesson Loading
When user clicks "Practice Log" link in a lesson:
```
/practice?lesson=18
```

The practice page:
1. Reads `?lesson=18` from URL
2. Calls `getHintForLesson(18)` from lessonHints.ts
3. Auto-populates lesson number field
4. Shows lesson title: "5th String Roots & Advanced Transitions"
5. Updates all placeholder text with lesson-specific examples

### Smart Placeholders
```typescript
// Without lesson number:
"Example: Chord transitions, strumming patterns, specific exercises..."

// With lesson number (e.g., Lesson 18):
"Example: 5th string root power chords (A5, B5, C5, D5, E5), 
switching between 6th and 5th string roots, chromatic movement"
```

### Auto-Expansion for Future Lessons
Lessons 33-38 (Theory Module 1) and 39-46 (Theory Module 2) automatically get generic but helpful hints even though they're not fully detailed yet.

---

## 📹 Video Feature Details

### Video Upload Flow
1. User clicks "Choose File" in video section
2. Browser validates: max 100MB, video files only
3. Preview shows immediately (using `URL.createObjectURL`)
4. On form submit:
   - Video uploads to Supabase Storage: `practice-videos/{user_id}/{timestamp}.mp4`
   - Public URL generated
   - URL saved to `practice_sessions.video_url`

### Video Display
- Shows in practice session history
- HTML5 video player with controls
- Responsive width (max 400px)
- Bordered with purple accent

### Privacy Control
- `is_public` checkbox determines visibility
- Private videos: only user can see
- Public videos: visible in community feed (future feature)

---

## 🔮 Future Enhancements

### Phase 2: Community Features (Not Implemented Yet)
When you're ready to add community:

```typescript
// Add to practice page:
const [showCommunity, setShowCommunity] = useState(false);

// Query for public sessions:
const { data: publicSessions } = await supabase
  .from('practice_sessions')
  .select('*, profiles(username, avatar_url)')
  .eq('is_public', true)
  .order('created_at', { ascending: false })
  .limit(20);
```

### Phase 3: Comments System
```sql
CREATE TABLE practice_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Phase 4: Video Thumbnails
Generate thumbnails on upload using edge function:
```typescript
// Potential edge function to generate thumbnail
export async function generateThumbnail(videoUrl: string) {
  // Use ffmpeg or video processing service
  // Extract frame at 2 seconds
  // Upload to storage
  // Return thumbnail URL
}
```

---

## 🎨 Adding Practice Log Links to Lessons

### In Each Lesson Markdown File:
Add this section near the end (before "Next Lesson Preview"):

```markdown
## 📝 Practice Log

**Track today's practice session:**

[📊 Open Practice Tracker for Lesson {X}](/practice?lesson={X})

Benefits of tracking your practice:
- See your progress over time
- Identify patterns in what works
- Stay motivated with visible improvement
- Build accountability through consistency
- Optional video recording to see technique improvement
```

### Example for Lesson 18:
```markdown
## 📝 Practice Log

**Track today's practice session:**

[📊 Open Practice Tracker for Lesson 18](/practice?lesson=18)

Benefits of tracking your practice:
- See your progress over time
- Identify patterns in what works
- Stay motivated with visible improvement
- Build accountability through consistency
- Optional video recording to see technique improvement
```

---

## 🐛 Troubleshooting

### Issue: Hints Not Showing
**Check:**
1. Is `lessonHints.ts` in the correct location? (`lib/lessonHints.ts`)
2. Does the lesson number match a key in `lessonHints` object?
3. Check browser console for import errors

### Issue: Video Upload Fails
**Check:**
1. Is Supabase Storage configured?
2. Is `practice-videos` bucket created?
3. Are storage policies set correctly?
4. Is video under 100MB?
5. Check browser console for upload errors

### Issue: Lesson Number Not Auto-Populating
**Check:**
1. Is URL parameter formatted correctly? `?lesson=18` (not `?lesson-18`)
2. Check `useSearchParams()` is working
3. Verify `useEffect` is updating form state

### Issue: Database Errors
**Check:**
1. Have you run the ALTER TABLE commands?
2. Are new columns present in Supabase table viewer?
3. Check Supabase logs for specific error messages

---

## 📊 Testing Checklist

- [ ] Practice page loads without errors
- [ ] Stats dashboard shows correct numbers
- [ ] "+ New Session" button toggles form
- [ ] Lesson number from URL auto-populates
- [ ] Lesson-specific hints appear in placeholders
- [ ] Video file selector works
- [ ] Video preview appears after selection
- [ ] Form submits successfully
- [ ] Session appears in history immediately
- [ ] Video displays in saved session
- [ ] Star ratings work (1-5 stars)
- [ ] Public/private toggle saves correctly
- [ ] Test with multiple lessons (5, 18, 25, 35)
- [ ] Test without lesson number (generic placeholders)

---

## 🎓 Usage for Students

### Standard Workflow:
1. Student completes a lesson
2. Clicks "Practice Log" link at bottom of lesson
3. Opens practice tracker with lesson # pre-filled
4. Sees lesson-specific hints as examples
5. Fills in what they actually practiced
6. Optionally records video of their playing
7. Rates their progress and focus
8. Saves session
9. Can review history anytime at `/practice`

### Benefits:
- **Immediate context**: Hints remind them what lesson covered
- **Low friction**: Lesson number already filled in
- **Visual progress**: See improvement over time
- **Accountability**: Built-in tracking encourages consistency
- **Video evidence**: Can actually see technique improvement

---

## 📈 Analytics Potential

Once you have practice data, you can build insights:

```sql
-- Most practiced lessons
SELECT lesson_number, COUNT(*) as practice_count
FROM practice_sessions
WHERE lesson_number IS NOT NULL
GROUP BY lesson_number
ORDER BY practice_count DESC;

-- Average session length by lesson
SELECT lesson_number, AVG(duration_minutes) as avg_duration
FROM practice_sessions
GROUP BY lesson_number
ORDER BY lesson_number;

-- Practice consistency (sessions per week)
SELECT 
  DATE_TRUNC('week', practice_date) as week,
  COUNT(*) as sessions
FROM practice_sessions
GROUP BY week
ORDER BY week DESC;

-- Lessons with lowest progress ratings (need content review)
SELECT lesson_number, AVG(progress_rating) as avg_rating
FROM practice_sessions
WHERE lesson_number IS NOT NULL
GROUP BY lesson_number
HAVING AVG(progress_rating) < 3
ORDER BY avg_rating ASC;
```

---

## 🚀 Deployment Notes

### Environment Variables
Make sure these are set:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Build Check
```bash
npm run build
```

If build succeeds, you're ready to deploy!

---

## 💡 Best Practices

### For Content Creation:
When creating new lessons (33-46), update `lessonHints.ts`:

```typescript
// Add to lessonHints object:
33: {
  lessonNumber: 33,
  title: "Understanding Major Scales",
  techniques: "Major scale construction, scale degrees, interval patterns",
  songs: "Scale-based melodies, major scale applications",
  focusAreas: "Scale pattern memorization, connecting scales to chords"
},
```

### For Students:
Encourage practice logging by:
- Adding reminder in lesson content
- Showing statistics dashboard
- Celebrating milestones (10 sessions, 100 sessions, etc.)
- Optional: Email reminders if they haven't logged in 3+ days

---

## ✅ Success Criteria

You'll know it's working when:
- Students can track practice from any lesson
- Hints are contextually relevant to the lesson
- Video uploads work smoothly
- Practice history accumulates over time
- Stats dashboard motivates continued practice
- System scales effortlessly to all 46 lessons

---

## 📞 Need Help?

Common issues and solutions are in the Troubleshooting section above. For complex issues:
1. Check browser console for errors
2. Check Supabase logs (Dashboard > Logs)
3. Verify database schema matches requirements
4. Test with sample data first

---

**Status**: Ready for implementation ✅  
**Estimated Implementation Time**: 30-45 minutes  
**Complexity**: Medium (database updates + file copying)  
**Impact**: High (transforms practice tracking experience)

---

**Let's build this! 🎸**
