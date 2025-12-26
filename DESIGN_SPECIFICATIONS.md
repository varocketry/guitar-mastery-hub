# GUITAR MASTERY HUB - BRANDING & SITE ARCHITECTURE REFERENCE

**Last Updated:** December 25, 2025  
**Status:** AUTHORITATIVE - Use this as the single source of truth for branding and design  
**Purpose:** Reference document for all visual design, branding, and site structure decisions

---

## 🎨 OFFICIAL BRAND COLORS

### Primary Colors (Use These!)

**Dark Navy** `#1E3A8A`
- RGB: 30, 58, 138
- Usage: Main brand color, headings, navigation, primary text
- Tailwind: `bg-navy`, `text-navy`, `border-navy`
- Feel: Trust, professionalism, depth

**Gold Bronze** `#D4AF37`
- RGB: 212, 175, 55
- Usage: CTA buttons, accents, highlights, premium elements
- Tailwind: `bg-gold`, `text-gold`, `border-gold`
- Feel: Premium, warmth, emphasis, "mastery"

**White** `#FFFFFF`
- RGB: 255, 255, 255
- Usage: Backgrounds, cards, clean spaces, contrast
- Tailwind: `bg-white`, `text-white`
- Feel: Clarity, space, readability

### Secondary Colors

**Accent Blue** `#4A90E2`
- RGB: 74, 144, 226
- Usage: Links, highlights, info messages, interactive elements
- Tailwind: `text-accent-blue`, `bg-accent-blue`
- Feel: Focus, energy, interactivity

**Deep Teal** `#0D47A1`
- RGB: 13, 71, 161
- Usage: Secondary buttons, contrast, depth
- Tailwind: `bg-teal`
- Feel: Stability, professional contrast

**Light Gray** `#F0F0F0`
- RGB: 240, 240, 240
- Usage: Subtle backgrounds, section dividers
- Tailwind: `bg-light`
- Feel: Subtlety, readability

### Semantic Colors (Status/Feedback)

**Success Green** `#10B981`
- Completed lessons, success messages, checkmarks

**Warning Orange** `#F59E0B`
- Cautions, troubleshooting sections, things to watch

**Error Red** `#EF4444`
- Error messages, critical issues

**Info Blue** `#4A90E2`
- Informational messages, tips, FYI content

---

## 📝 TYPOGRAPHY

### Font Families

**Inter** (Primary Font)
- Use for: Body text, paragraphs, most content
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
- Feel: Professional, clean, highly readable
- Google Fonts: `Inter:wght@400;500;600;700;800`

**Montserrat** (Accent Font)
- Use for: Call-to-action buttons, special headings, emphasis
- Weights: 600 (Semibold), 700 (Bold), 800 (Extrabold)
- Feel: Strong, attention-grabbing, modern
- Google Fonts: `Montserrat:wght@600;700;800`

### Typography Scale

```
64px (4rem)    = Huge display headings (rare)
48px (3rem)    = Hero headings (h1 on landing/lesson pages)
36px (2.25rem) = Section headings (h2)
30px (1.875rem)= Subsection headings (h3)
24px (1.5rem)  = Small headings (h4)
20px (1.25rem) = Large body, subheadings
18px (1.125rem)= Large body text
16px (1rem)    = Body text (default)
14px (0.875rem)= Small text, secondary info
12px (0.75rem) = Tiny labels, captions
```

---

## 🏗️ SITE ARCHITECTURE

### URL Structure

```
Production Domain: https://www.guitarmasteryvets.com
Alternate: https://guitar-mastery-hub.vercel.app

/                        → Landing page (public)
/auth                    → Magic link authentication
/dashboard               → User dashboard (logged in)
/lessons                 → Lesson list page
/lessons/1               → Individual lesson page
/lessons/2               → Individual lesson page
... (lessons 1-46)
/pricing                 → Pricing information
/resources               → Additional resources
/contact                 → Contact page
/progress                → User progress tracking (future)
```

### Navigation Structure

**Public Navigation (Not Logged In):**
- Logo (links to /)
- Pricing
- Sign In

**Logged-In Navigation:**
- Logo (links to /dashboard)
- Lessons
- Dashboard
- Progress
- Resources
- Practice Log
- User menu (right side)

---

## 📄 PAGE-BY-PAGE BREAKDOWN

### 1. LANDING PAGE (`/`)

**Purpose:** Convert visitors to sign-ups  
**URL:** `https://www.guitarmasteryvets.com`

**Current Status:** ✅ Installed, needs imagery improvements

**Sections:**
1. **Hero Section**
   - Dark navy background (#1E3A8A)
   - Large headline: "Learn Guitar at Your Own Pace"
   - Subheadline: "Supported by adult learning science"
   - Gold CTA button: "Start Learning Free"
   - Secondary button: "View Pricing"

2. **Problem/Solution Comparison**
   - "Most Guitar Courses Get It Wrong" vs "We Built Something Better"
   - White background
   - Side-by-side comparison

3. **Features Grid** (4 features)
   - User-Controlled Progression
   - Comprehensive Content
   - Shape-Based Learning
   - Progress Tracking

4. **How It Works** (3 steps)
5. **Pricing Preview**
6. **Testimonials** (currently placeholder)
7. **FAQ** (6 questions)
8. **Footer**

**Design Notes:**
- Currently text-heavy, needs imagery
- Hero could use guitar/hands background image
- Features section could use icons or small illustrations
- Consider adding student success photos/testimonials

**Improvement Ideas (for next session):**
- Background image in hero (guitar close-up, hands on fretboard)
- Feature icons or illustrations
- Student testimonial photos
- Before/after student progress examples

---

### 2. AUTHENTICATION PAGE (`/auth`)

**Purpose:** Magic link login  
**URL:** `https://www.guitarmasteryvets.com/auth`

**Current Status:** ✅ Should match landing page after Vercel cache clear

**Design:**
- Dark navy background (#1E3A8A) - MATCHES LANDING PAGE
- White card with rounded corners
- Gold circle logo
- Gold "Send Magic Link" button
- Success message in green

**Email Branding:**
- FROM: "Guitar Mastery Vets <noreply@guitarmasteryvets.com>"
- Powered by: Resend SMTP
- One-click magic link (no password)

---

### 3. DASHBOARD (`/dashboard`)

**Purpose:** User home after login  
**URL:** Requires authentication

**Current Status:** ✅ Functional

**Sections:**
- Welcome message with user name
- Progress summary
- Continue where you left off
- Quick access to lessons
- Practice log summary

---

### 4. LESSON PAGES (`/lessons/[id]`)

**Purpose:** Display individual lesson content  
**URL:** `/lessons/1` through `/lessons/46`

**Current Status:** ✅ 46 lessons deployed

**Layout:**
- **Navigation bar** (top)
  - Dark navy background
  - Logo, Lessons, Dashboard, Progress, Resources, Practice Log
  - User avatar (gold circle, right side)

- **Lesson header**
  - Dark navy background
  - "Lesson X of 32" (NOTE: Should say "46"!)
  - Next button (right side)

- **Lesson content card**
  - White background
  - Gold horizontal rule under title
  - Blue left border on section headings
  - Navy headings
  - Well-formatted markdown content

**Standard Lesson Sections:**
1. Lesson Overview (gold underline)
2. Learning Objectives (graduation cap icon)
3. Main content (varies by lesson)
4. Practice exercises
5. Success criteria
6. Troubleshooting (🔧 icon)
7. Next lesson preview

**Troubleshooting Section:**
- **Current:** Fully expanded (overwhelming)
- **Future:** Accordion component (collapsible)
- **Status:** Component built, ready to install

---

### 5. PRICING PAGE (`/pricing`)

**Purpose:** Display pricing tiers  
**URL:** `/pricing`

**Current Status:** Needs verification

**Pricing Model:**
- **Free Trial:** Lessons 1-14
- **One-Time:** $29.99 (all 46 lessons, lifetime access)
- **Monthly:** $9.99/month (all 46 lessons)

---

## 🎸 LESSON INVENTORY

### Foundation Phase (Lessons 1-30)
**Status:** ✅ All 30 lessons complete and deployed

**Breakdown:**
- Lessons 1-4: First five chord shapes (Em, Am, D, G, C)
- Lesson 5: Strumming fundamentals
- Lesson 6: E major, A major shapes
- Lesson 7: Foundation review/assessment
- Lessons 8-14: Advanced techniques (strumming, reading, fingerstyle, song)
- Lessons 15-20: Power chords and integration
- Lessons 21-24: Barre chords and complete integration
- Lessons 25-30: Lead guitar and performance preparation

### Theory Module 1: Major Key Theory (Lessons 31-38)
**Status:** ✅ All 8 lessons complete

**Topics:**
- Music theory fundamentals
- Chord construction
- Major scale formula
- Key signatures & circle of fifths
- Understanding flats/enharmonics
- Diatonic harmony
- Chord inversions & voice leading
- Major key integration practice

### Theory Module 2: Minor Key Theory (Lessons 39-46)
**Status:** ✅ All 8 lessons complete

**Topics:**
- Minor scale (natural, harmonic, melodic)
- Minor key signatures
- Relative vs parallel minor
- Minor key diatonic chords
- Minor key progressions
- Modal interchange
- Advanced harmonic concepts
- Complete theory integration

**TOTAL: 46 LESSONS** (not 32!)

---

## 🐛 KNOWN ISSUES

### 1. Lesson Count Discrepancy ⚠️
**Issue:** Vercel and GitHub show "32 lessons" but we have 46  
**Locations:** 
- Dashboard says "Lesson X of 32"
- About section says "32 comprehensive lessons"
- Landing page may say "32 lessons"

**Root Cause:** Unknown - needs investigation  
**Priority:** Medium  
**Fix Required:** Find where "32" is hardcoded and update to "46"

### 2. Landing Page Imagery 📸
**Issue:** Landing page is text-heavy, lacks visual appeal  
**Comparison:** JustinGuitar.com uses photos, guitar imagery, student success stories  
**Priority:** High for launch appeal  
**Next Steps:** 
- Discuss image strategy
- Source or create appropriate images
- Consider: stock photos, custom photography, illustrations

### 3. Troubleshooting Sections 🔧
**Issue:** Too long, overwhelming (66 problems across 22 lessons)  
**Solution:** Accordion component (built, ready to install)  
**Status:** Testing phase  
**Priority:** Medium-High (improves user experience significantly)

---

## 🎯 DESIGN PRINCIPLES

### 1. Consistency
- Use the same colors everywhere (navy, gold, white)
- Use the same spacing patterns (multiples of 4px)
- Use the same button styles
- Maintain typography hierarchy

### 2. Hierarchy
- Largest/boldest = Most important
- Navy for headings = Importance
- Gold for CTAs = Action
- White space = Breathing room

### 3. Readability
- Plenty of white space
- Clear typography (Inter for body, Montserrat for emphasis)
- Good contrast ratios (dark on light, light on dark)
- Line length: 60-80 characters for readability

### 4. Professionalism
- Subtle shadows (not heavy drop shadows)
- Smooth transitions (250ms standard)
- Polished details (rounded corners, proper spacing)
- Adult learning aesthetic (not "gamified" or childish)

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```
Mobile:  < 768px  (1 column, stacked)
Tablet:  768-1024px (2 columns where appropriate)
Desktop: > 1024px (full layout, max-width containers)
```

### Mobile Considerations
- Navigation collapses to hamburger menu
- Cards stack vertically
- Text sizes reduce slightly (48px → 36px for h1)
- Buttons go full-width on mobile
- Touch targets: minimum 44px × 44px

---

## 🔐 AUTHENTICATION FLOW

### Magic Link Process
1. User visits landing page
2. Clicks "Sign In" or "Start Learning Free"
3. Redirected to `/auth`
4. Enters email address
5. Clicks "Send Magic Link"
6. Email sent from: `Guitar Mastery Vets <noreply@guitarmasteryvets.com>`
7. User clicks link in email
8. Auto-authenticated
9. Redirected to `/dashboard`

### Technical Details
- Provider: Supabase Auth
- SMTP: Resend (smtp.resend.com)
- Domain verified: guitarmasteryvets.com
- No passwords required
- 24-hour rate limit: Prevents spam

---

## 🎨 BUTTON STYLES

### Primary Button (Gold)
```tsx
<button className="bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
  Start Learning Free
</button>
```
- Background: Gold Bronze (#D4AF37)
- Text: Dark Navy (#1E3A8A)
- Use for: Main CTAs, primary actions

### Secondary Button (Navy)
```tsx
<button className="bg-navy hover:bg-teal text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
  View Lessons
</button>
```
- Background: Dark Navy (#1E3A8A)
- Text: White (#FFFFFF)
- Use for: Secondary actions

### Outline Button
```tsx
<button className="bg-transparent border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold py-3 px-6 rounded-lg transition-all">
  Learn More
</button>
```
- Background: Transparent
- Border: Dark Navy
- Use for: Tertiary actions, less emphasis

---

## 📊 SUCCESS METRICS

### User Experience Goals
- Lesson completion rate: > 90%
- Time to first lesson: < 2 minutes
- Auth success rate: > 95%
- Mobile usability: Fully functional

### Visual Design Goals
- Brand consistency: 100% across all pages
- Loading time: < 2 seconds
- Accessibility: WCAG 2.1 AA compliance
- Professional appearance: Comparable to JustinGuitar, Fender Play

---

## 🔄 DEPLOYMENT STATUS

**Production:** https://www.guitarmasteryvets.com  
**Hosting:** Vercel  
**Domain:** Porkbun (pointing to Vercel)  
**Email:** Resend SMTP  
**Database:** Supabase  

**Last Deploy:** December 25, 2025  
**Deploy Status:** ✅ Successful  
**Build Time:** ~2-3 minutes  
**Cache:** Clear on redeploy if CSS issues

---

## 📝 NEXT PRIORITIES

1. **Landing Page Images** (Discuss strategy)
   - Hero background image
   - Feature section illustrations
   - Student testimonials with photos

2. **Fix "32 lessons" Bug** (Should say "46")
   - Find all instances
   - Update to correct count
   - Deploy fix

3. **Install Troubleshooting Accordion** (Component ready)
   - Test on Lesson 1
   - Roll out to 22 lessons
   - Improves scannability

4. **Student Testimonials** (Future)
   - Collect from beta testers
   - Add to landing page
   - Build social proof

---

**This document is the AUTHORITATIVE reference for all branding and design decisions.**  
Update this document when designs change.  
Use this as the single source of truth for development.

---

**Last Updated:** December 25, 2025  
**Version:** 1.0  
**Status:** Current and Accurate
