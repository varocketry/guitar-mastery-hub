# 🏗️ GUITAR MASTERY HUB - SITE ARCHITECTURE

**Last Updated:** December 7, 2025  
**Version:** 1.0  
**Purpose:** Complete site structure and page specifications

---

## 🎯 OVERVIEW

Guitar Mastery Hub is a full-stack React web application for adult guitar learning with:
- 32 comprehensive lessons (7,000-9,000 words each)
- User authentication and progress tracking
- Resource library (learning guides, practice philosophy)
- Practice log system
- User-controlled progression model

---

## 📁 COMPLETE SITE MAP

```
Guitar Mastery Hub
│
├── / (Landing/Login)
│   └── Authentication with Supabase magic links
│
├── /lessons (Lesson Index)
│   ├── Grid view of all 32 lessons
│   ├── Phase grouping (Foundation, Theory)
│   └── Progress indicators
│
├── /lessons/[1-32] (Individual Lesson Pages)
│   ├── Markdown content rendering
│   ├── Sidebar navigation (125px)
│   ├── Progress tracking (mark complete)
│   └── Next lesson navigation
│
├── /about
│   ├── Project philosophy
│   ├── Instructor background
│   └── Pedagogical approach
│
├── /contact
│   ├── Email contact form
│   └── Support information
│
└── /resources/
    ├── /learning-guide
    │   └── How to use the platform effectively
    ├── /practice-philosophy
    │   └── "Slow is Smooth" methodology
    ├── /shape-library
    │   └── Den Lopez shapes-not-chords philosophy
    └── /practice-logs
        └── Downloadable practice log templates
```

---

## 🔐 AUTHENTICATION FLOW

```
User Journey:
1. Land on / (login page)
2. Enter email → Supabase sends magic link
3. Click link in email → Authenticated
4. Redirect to /lessons (lesson index)
5. Navigate to any page (all require auth)
6. Click logout → Return to /
```

**Authentication Rules:**
- All pages except `/` require authentication
- Unauthenticated users redirect to `/`
- Session persists across pages
- Logout available on every page

---

## 🧭 NAVIGATION REQUIREMENTS

### **CRITICAL RULE: Every authenticated page MUST have navigation bar**

**Navigation Component Location:** `app/components/Navigation.tsx`

**Required on these pages:**
- ✅ /lessons (lesson index)
- ✅ /lessons/[id] (all lesson pages)
- ✅ /about
- ✅ /contact
- ✅ /resources/learning-guide
- ✅ /resources/practice-philosophy
- ✅ /resources/shape-library
- ✅ /resources/practice-logs

**NOT required on:**
- ❌ / (login page - different layout)

### **Navigation Structure:**

```
┌─────────────────────────────────────────────────────────┐
│ 🎸 Guitar Mastery Hub                                  │
│                                                         │
│ About | Lessons | Resources ▾ | Contact    [Email] [Logout] │
│                     │                                   │
│                     └─ Learning Guide                   │
│                     └─ Practice Philosophy              │
│                     └─ Shape Library                    │
│                     └─ Practice Log Templates           │
└─────────────────────────────────────────────────────────┘
```

**Navigation Items (Left to Right):**
1. **Logo** (🎸 Guitar Mastery Hub) → links to `/lessons`
2. **About** → links to `/about`
3. **Lessons** → links to `/lessons`
4. **Resources** (dropdown) → shows submenu on hover:
   - Learning Guide → `/resources/learning-guide`
   - Practice Philosophy → `/resources/practice-philosophy`
   - Shape Library → `/resources/shape-library`
   - Practice Log Templates → `/resources/practice-logs`
5. **Contact** → links to `/contact`
6. **User Email** (display only)
7. **Logout Button** → signs out, redirects to `/`

---

## 📄 PAGE SPECIFICATIONS

### **1. Login Page (`/`)**

**Purpose:** User authentication  
**Layout:** Centered card on gradient background  
**Components:**
- Email input
- "Send Magic Link" button
- Success/error messaging
- No navigation bar (different layout)

**Technology:**
- Supabase Auth (magic links)
- Email OTP (one-time password)

---

### **2. Lesson Index (`/lessons`)**

**Purpose:** Browse all lessons  
**Layout:** Header + grid of lesson cards  
**Components:**
- ✅ Navigation component (required)
- Welcome message
- Stats (32 lessons, 240K words, etc.)
- Lesson grid (responsive)
- Phase grouping headers

**Features:**
- Lessons grouped by phase (Foundation 1-30, Theory 31-32)
- Each card shows: number, title, estimated time
- Click card → navigate to `/lessons/[id]`
- Visual indicators for completion status (future)

---

### **3. Individual Lesson Pages (`/lessons/[1-32]`)**

**Purpose:** Display lesson content  
**Layout:** Sidebar + main content area  
**Components:**
- ✅ Navigation component (required)
- Left sidebar (125px width):
  - List of all 32 lessons
  - Current lesson highlighted
  - Completion checkmarks
- Main content area:
  - Lesson title/number
  - Markdown content (rendered)
  - Mark Complete button
  - Next Lesson button

**Technology:**
- ReactMarkdown with remark-gfm
- Custom markdown components (styled headers, lists, code blocks)
- Supabase for progress tracking

**Data Flow:**
- Fetch lesson markdown from `/public/lessons/lesson_XXX_filename.md`
- Render with custom styling
- Save completion to Supabase
- Retrieve completion status on load

---

### **4. About Page (`/about`)**

**Purpose:** Explain project philosophy and background  
**Layout:** Single column content  
**Components:**
- ✅ Navigation component (required)
- Hero section
- Content sections (from about.md)
- Call-to-action (start learning)

**Content Source:** `/public/content/about.md` (markdown)

**Topics Covered:**
- User-controlled progression philosophy
- Tony Polecastro inspiration
- Den Lopez shape-based learning
- Quality standards (7,000-9,000 words/lesson)
- Adult learning principles

---

### **5. Contact Page (`/contact`)**

**Purpose:** User support and feedback  
**Layout:** Form + contact information  
**Components:**
- ✅ Navigation component (required)
- Contact form (name, email, message)
- Alternative contact methods
- Response time expectations

**Content Source:** `/public/content/contact.md` (markdown)

**Form Handling:**
- Simple mailto: link (MVP)
- Future: Email service integration

---

### **6. Resource Pages (`/resources/*`)**

**Purpose:** Supplementary learning materials  
**Layout:** Single column content  
**Components (all pages):**
- ✅ Navigation component (required)
- Page title
- Markdown content
- Download links (for practice logs)

#### **6a. Learning Guide (`/resources/learning-guide`)**
**Content:** How to use the platform effectively  
**Source:** `/public/content/learning_guide.md`

**Topics:**
- Platform navigation
- Study strategies
- Practice routines
- Success criteria interpretation
- Video resource usage

#### **6b. Practice Philosophy (`/resources/practice-philosophy`)**
**Content:** "Slow is Smooth, Smooth is Fast" methodology  
**Source:** `/public/content/practice_philosophy.md`

**Topics:**
- Tony Polecastro's approach
- Tempo-based practice (20-40 BPM starts)
- User-controlled progression
- No time pressure
- Realistic completion timelines

#### **6c. Shape Library (`/resources/shape-library`)**
**Content:** Den Lopez "shapes not chords" philosophy  
**Source:** `/public/content/shape_library.md`

**Topics:**
- 6 core shapes (E, A, D, C, G, triads)
- Shape families (major/minor from same shape)
- How shapes become barre chords
- Shape recognition exercises
- Visual diagrams

#### **6d. Practice Logs (`/resources/practice-logs`)**
**Content:** Downloadable practice log templates  
**Source:** `/public/content/practice_logs.md`

**Features:**
- Description of practice log system
- Links to downloadable PDFs
- Instructions for effective use
- Sample filled logs

---

## 🎨 SHARED LAYOUT COMPONENTS

### **Navigation Component** (Used on 8+ pages)
**File:** `app/components/Navigation.tsx`  
**Props:** `{ user: any }`  
**Renders:** Top navigation bar with logo, menu, user info

### **Footer Component** (Future - not implemented yet)
**File:** `app/components/Footer.tsx`  
**Renders:** Copyright, links, social media

### **Layout Wrapper** (Future - optional)
**File:** `app/components/Layout.tsx`  
**Wraps:** Navigation + children + Footer  
**Benefit:** DRY principle, consistent layout

---

## 🗄️ DATA STRUCTURE

### **Supabase Tables**

#### **lesson_progress**
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → auth.users)
- lesson_number (INTEGER, 1-32)
- completed (BOOLEAN)
- completed_at (TIMESTAMP)
- created_at (TIMESTAMP)
- UNIQUE(user_id, lesson_number)
```

**Row Level Security (RLS):**
- Users can only read/write their own progress
- No cross-user data access

### **File Structure**

#### **Lesson Content**
```
/public/lessons/
  ├── lesson_001_first_two_chord_shapes.md
  ├── lesson_002_third_chord_shape_d_major.md
  ├── ...
  └── lesson_032_chord_construction_harmonic_function.md
```

#### **Resource Content**
```
/public/content/
  ├── about.md
  ├── contact.md
  ├── learning_guide.md
  ├── practice_philosophy.md
  ├── shape_library.md
  └── practice_logs.md
```

#### **Practice Log PDFs** (Future)
```
/public/downloads/
  ├── practice-log-universal.pdf
  ├── practice-log-lesson-001.pdf
  ├── ...
  └── practice-log-lesson-006.pdf
```

---

## 🔀 ROUTING STRUCTURE

**Next.js App Router (app/ directory):**

```
app/
├── page.tsx                          → / (login)
├── lessons/
│   ├── page.tsx                      → /lessons (index)
│   └── [id]/
│       └── page.tsx                  → /lessons/[1-32]
├── about/
│   └── page.tsx                      → /about
├── contact/
│   └── page.tsx                      → /contact
├── resources/
│   ├── learning-guide/
│   │   └── page.tsx                  → /resources/learning-guide
│   ├── practice-philosophy/
│   │   └── page.tsx                  → /resources/practice-philosophy
│   ├── shape-library/
│   │   └── page.tsx                  → /resources/shape-library
│   └── practice-logs/
│       └── page.tsx                  → /resources/practice-logs
└── components/
    ├── Navigation.tsx                → Shared navigation
    └── (future components)
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

**Platform:** Vercel (free tier)  
**Database:** Supabase (free tier)  
**Hosting:** Automatic from GitHub

**Deployment Flow:**
```
Local Development → Git Commit → Git Push to GitHub → Vercel Auto-Deploy → Live Site
```

**Environment Variables (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
```

---

## 📊 SCALABILITY CONSIDERATIONS

### **Current (MVP - 32 Lessons):**
- Static lesson content (markdown files)
- Client-side rendering
- Simple progress tracking
- ~50 concurrent users supported

### **Future (180 Lessons):**
- May need CDN for markdown files
- Server-side rendering for SEO
- Advanced progress analytics
- ~500+ concurrent users

### **Optimization Opportunities:**
- Lazy load lesson content
- Cache markdown parsing results
- Compress images/diagrams
- Implement service worker (PWA)

---

## 🔒 SECURITY REQUIREMENTS

**Authentication:**
- ✅ Supabase magic links (passwordless)
- ✅ Row Level Security on database
- ✅ Client-side route protection
- ⚠️ TODO: Server-side route protection (middleware)

**Data Protection:**
- User emails stored in Supabase Auth
- Progress data isolated per user
- No sensitive data in localStorage
- HTTPS enforced in production

**Content Protection:**
- Public lesson content (no paywall yet)
- Future: Stripe integration for premium lessons
- Future: Lessons 15+ behind paywall

---

## 📱 RESPONSIVE DESIGN

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Navigation: Hamburger menu
- Lesson sidebar: Hidden by default, toggle button
- Lesson cards: Single column grid
- Typography: Slightly smaller

---

## ⚡ PERFORMANCE TARGETS

**Page Load Times:**
- Login page: < 1 second
- Lesson index: < 2 seconds
- Individual lesson: < 3 seconds (markdown parsing)
- Resource pages: < 2 seconds

**Metrics:**
- Lighthouse score: 90+ (all categories)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

---

## 🧪 TESTING REQUIREMENTS

**Manual Testing:**
- All navigation links work
- Auth flow completes successfully
- All 32 lessons load correctly
- Progress tracking saves/loads
- Mobile responsive on real device

**Automated Testing (Future):**
- E2E tests for user flows
- Unit tests for components
- Integration tests for Supabase

---

## 📋 LAUNCH CHECKLIST

**Before going live:**
- [ ] All 32 lessons load correctly
- [ ] Navigation works on every page
- [ ] Authentication flow tested
- [ ] Progress tracking verified
- [ ] Mobile responsive confirmed
- [ ] No console errors
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (optional)
- [ ] Analytics installed (optional)
- [ ] Beta user feedback collected

---

## 🔄 FUTURE ENHANCEMENTS

**Phase 2 (Post-Launch):**
- Stripe payment integration
- Lessons 15-32 behind paywall
- User dashboard with statistics
- Practice log database integration
- Email notifications

**Phase 3 (Growth):**
- Lessons 33-60 (Intermediate)
- Community features (comments, forums)
- Video integration
- Mobile apps (iOS/Android)
- Gamification (badges, streaks)

---

## 🎯 SUCCESS METRICS

**Technical:**
- 99.9% uptime
- < 3s average page load
- Zero critical bugs
- Mobile usage: 40%+

**User:**
- 30% completion rate (Lessons 1-14)
- 15% conversion (free → paid)
- 4.5+ star rating
- 50+ beta user signups (Jan 2026)

---

**Last Updated:** December 7, 2025  
**Maintained By:** Jim (Founder)  
**Claude Sessions:** Reference this file FIRST when building any page!

---

## ⚠️ CRITICAL REMINDERS FOR CLAUDE

1. **NEVER build a page without Navigation component** (except `/`)
2. **ALWAYS check this file before starting work**
3. **Verify page exists in site map before creating**
4. **Follow routing structure exactly**
5. **Match design specifications in all implementations**

This document is the **source of truth** for site structure!
