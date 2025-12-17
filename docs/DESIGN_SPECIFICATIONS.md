# 🎨 GUITAR MASTERY HUB - DESIGN SPECIFICATIONS

**Last Updated:** December 7, 2025  
**Version:** 1.0  
**Purpose:** Visual design system and UI specifications

---

## 🎨 COLOR PALETTE

### **Primary Colors**

**Purple Gradient (Primary Brand)**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- Used for: Navigation bar, hero sections, CTAs, lesson numbers
- Variations:
  - Light: `rgba(102, 126, 234, 0.1)` (10% opacity)
  - Medium: `rgba(102, 126, 234, 0.5)` (50% opacity)
  - Dark: `rgba(102, 126, 234, 0.8)` (80% opacity)

**Background Colors**
- Page background: `#f5f7fa` (light gray)
- Card background: `#ffffff` (white)
- Sidebar background: `rgba(0, 0, 0, 0.3)` (30% black on lesson pages)

### **Text Colors**

**Primary Text:**
- Headers: `#333333` (dark gray)
- Body text: `#666666` (medium gray)
- Light text (on dark): `#E9D5FF` (light purple)
- White text: `#FFFFFF`

**Accent Colors:**
- Gold/Yellow: `#FCD34D` (for highlights, special emphasis)
- Light Purple: `#D8B4FE` (for italics, secondary emphasis)
- Blue: `#60A5FA` (for links)

### **Status Colors**

**Success:**
- Background: `rgba(34, 197, 94, 0.8)` (green)
- Disabled: `rgba(34, 197, 94, 0.3)` (lighter green)

**Error:**
- Background: `#FCA5A5` (light red)
- Text: `#721c24` (dark red)

**Warning:**
- Background: `#FCD34D` (gold)

---

## 📝 TYPOGRAPHY

### **Font Stack**

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
```

**Why this stack:**
- Native fonts load instantly (no download)
- Looks great on all devices
- System-appropriate (Mac gets SF Pro, Windows gets Segoe UI)

### **Font Sizes**

**Headers:**
- H1: `2.5rem` (40px) - Page titles
- H2: `2rem` (32px) - Section headers
- H3: `1.5rem` (24px) - Subsection headers
- H4: `1.25rem` (20px) - Minor headers

**Body:**
- Large: `1.1rem` (17.6px) - Intro paragraphs
- Normal: `16px` - Standard body text
- Small: `14px` - Meta information, captions
- Tiny: `12px` - Labels, badges

**Lesson Content Specifics:**
- Headers: White or gold on dark backgrounds
- Paragraphs: Light purple (#E9D5FF) on dark
- Strong/Bold: Gold (#FCD34D)
- Italic: Light purple (#D8B4FE)
- Code: Gold on dark background
- Links: Blue (#60A5FA)

### **Font Weights**

- Normal: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

### **Line Heights**

- Headers: `1.2` - `1.4`
- Body text: `1.8` (generous spacing for readability)
- Lists: `1.6`
- Code blocks: `1.5`

---

## 📐 LAYOUT SYSTEM

### **Container Widths**

**Max-width constraints:**
- Main content: `1200px`
- Resource pages: `900px` (narrower for reading)
- Login card: `450px`

**Padding/Margins:**
- Page padding: `20px` (mobile), `40px` (desktop)
- Card padding: `25px` - `40px`
- Section spacing: `40px` between major sections

### **Grid Systems**

**Lesson Card Grid:**
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 20px;
```

**Lesson Page Layout:**
```
┌────────────────────────────────────────┐
│         Navigation Bar (sticky)        │
├──────┬─────────────────────────────────┤
│      │                                 │
│ 125px│     Main Content (flex: 1)     │
│ Side │                                 │
│ bar  │                                 │
│      │                                 │
└──────┴─────────────────────────────────┘
```

**Resource Page Layout:**
```
┌────────────────────────────────────────┐
│         Navigation Bar (sticky)        │
├────────────────────────────────────────┤
│                                        │
│       Content (max-width: 900px)       │
│            Centered                    │
│                                        │
└────────────────────────────────────────┘
```

---

## 🎯 COMPONENT SPECIFICATIONS

### **Navigation Bar**

**Dimensions:**
- Height: Auto (based on padding)
- Padding: `20px 0`
- Position: `sticky` (stays at top on scroll)
- Z-index: `100`

**Styling:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
```

**Internal Layout:**
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
display: flex;
justify-content: space-between;
align-items: center;
```

**Logo:**
- Icon: 🎸 (32px emoji)
- Text: "Guitar Mastery Hub" (24px, bold)
- Gap between: `10px`
- Link to: `/lessons`

**Nav Links:**
- Font size: `16px`
- Font weight: `500`
- Color: `white`
- Text decoration: `none`
- Hover: `opacity: 0.8`
- Gap between links: `30px`

**Resources Dropdown:**
- Trigger: `Resources ▾`
- Show on: `hover`
- Background: `white`
- Min-width: `220px`
- Shadow: `0 8px 16px rgba(0,0,0,0.1)`
- Border-radius: `8px`
- Item padding: `12px 20px`
- Item color: `#333`
- Item hover: Background `#f5f7fa`

**User Info:**
- Email display: `14px`, `opacity: 0.9`
- Logout button:
  - Background: `rgba(255,255,255,0.2)`
  - Border: `1px solid rgba(255,255,255,0.3)`
  - Padding: `8px 16px`
  - Border-radius: `6px`
  - Hover: Background `rgba(255,255,255,0.3)`

---

### **Lesson Sidebar**

**Dimensions:**
- Width: `125px` (narrow, just lesson numbers)
- Height: `100vh` (full viewport height)
- Overflow-y: `auto`

**Styling:**
```css
background: rgba(0,0,0,0.3);
padding: 2rem 1rem;
border-right: 1px solid rgba(255,255,255,0.1);
```

**Lesson List Items:**
- Display: `flex` column
- Gap: `0.5rem`
- Each item:
  - Padding: `0.75rem 1rem`
  - Border-radius: `0.5rem`
  - Background: `rgba(255,255,255,0.05)` (default)
  - Background: `rgba(124, 58, 237, 0.5)` (current)
  - Border: `2px solid rgba(252, 211, 77, 0.5)` (current)
  - Color: `#E9D5FF` (default), `#FFF` (current)

**Completion Indicators:**
- Completed: ✅ (checkmark emoji)
- Not completed: ⭕ (circle emoji)
- Font size: `1.2rem`

---

### **Cards (Lesson Cards, Content Cards)**

**Default Card Styling:**
```css
background: white;
border-radius: 12px;
padding: 25px;
box-shadow: 0 2px 10px rgba(0,0,0,0.05);
transition: all 0.3s;
```

**Hover State (for clickable cards):**
```css
transform: translateY(-5px);
box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
```

**Lesson Number Badge:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 6px 12px;
border-radius: 6px;
font-size: 12px;
font-weight: bold;
display: inline-block;
margin-bottom: 15px;
```

---

### **Buttons**

**Primary Button (CTA):**
```css
padding: 1rem 2rem;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border: none;
border-radius: 0.5rem;
font-size: 1.1rem;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;
```

**Hover:**
```css
transform: translateY(-2px);
box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
```

**Success Button (Mark Complete):**
```css
background: rgba(34, 197, 94, 0.8);
/* Same other properties */
```

**Disabled State:**
```css
background: rgba(34, 197, 94, 0.3);
cursor: not-allowed;
```

**Secondary Button (Logout):**
```css
background: rgba(255,255,255,0.2);
border: 1px solid rgba(255,255,255,0.3);
color: white;
padding: 8px 16px;
border-radius: 6px;
```

---

### **Forms**

**Input Fields:**
```css
width: 100%;
padding: 12px 15px;
border: 2px solid #e0e0e0;
border-radius: 8px;
font-size: 16px;
transition: all 0.3s;
```

**Focus State:**
```css
outline: none;
border-color: #667eea;
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
```

**Labels:**
```css
display: block;
margin-bottom: 8px;
color: #333;
font-weight: 500;
font-size: 14px;
```

---

### **Markdown Content Styling**

**Headers in Lessons:**
- H1: White, 2.5rem, bold, bottom border (2px solid rgba(255,255,255,0.2))
- H2: White, 2rem, bold, bottom border (1px solid rgba(255,255,255,0.1))
- H3: Gold (#FCD34D), 1.5rem, semibold
- H4: Gold (#FCD34D), 1.25rem, semibold

**Paragraphs:**
```css
margin-bottom: 1rem;
line-height: 1.8;
color: #E9D5FF;
```

**Lists:**
```css
margin: 1rem 0;
padding-left: 2rem;
line-height: 1.6;
```
- Unordered: Disc bullets
- Ordered: Decimal numbers
- List items: `margin-bottom: 0.5rem`

**Code Blocks:**

**Inline code:**
```css
background: rgba(0,0,0,0.3);
color: #FCD34D;
padding: 0.2rem 0.4rem;
border-radius: 0.25rem;
font-size: 0.9em;
```

**Block code:**
```css
display: block;
background: rgba(0,0,0,0.5);
color: #E9D5FF;
padding: 1rem;
border-radius: 0.5rem;
overflow: auto;
margin: 1rem 0;
```

**Blockquotes:**
```css
border-left: 4px solid #FCD34D;
padding-left: 1rem;
margin: 1rem 0;
font-style: italic;
color: #D8B4FE;
```

**Links:**
```css
color: #60A5FA;
text-decoration: underline;
```

**Horizontal Rules:**
```css
border: none;
border-top: 1px solid rgba(255,255,255,0.2);
margin: 2rem 0;
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints**

```css
/* Mobile First Approach */

/* Base styles: Mobile (< 768px) */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet-specific styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop-specific styles */
}
```

### **Mobile Adaptations**

**Navigation:**
- Logo: Smaller (20px text)
- Menu: Hamburger icon (☰)
- Dropdown: Full-width drawer from top
- User info: Stack vertically

**Lesson Page:**
- Sidebar: Hidden by default
- Toggle button: Shows sidebar overlay
- Main content: Full width

**Lesson Cards:**
- Grid: Single column
- Card padding: Reduced to 20px

**Typography:**
- H1: 2rem (reduced from 2.5rem)
- H2: 1.5rem (reduced from 2rem)
- Body: 15px (reduced from 16px)

---

## 🎭 ANIMATIONS & TRANSITIONS

### **Standard Transitions**

```css
transition: all 0.3s ease;
```

**Use for:**
- Button hovers
- Card hovers
- Link hovers
- Dropdown menus

### **Transform Animations**

**Button Hover:**
```css
transform: translateY(-2px);
```

**Card Hover:**
```css
transform: translateY(-5px);
```

### **Loading States**

**Spinner (if needed):**
- Color: Purple gradient
- Size: 40px
- Animation: Rotate 1s infinite

---

## 🖼️ IMAGERY & ICONS

### **Icons**

**Primary Icons (Emojis):**
- Guitar: 🎸 (brand icon)
- Checkmark: ✅ (completion)
- Circle: ⭕ (not completed)
- Clock: ⏱️ (time estimates)
- Document: 📝 (word count)

**Font Icons (if needed):**
- Lucide React (already installed)
- Use sparingly, prefer emojis for brand consistency

### **Images**

**Chord Diagrams (Future):**
- Format: PNG with transparency
- Background: Dark to match lesson pages
- Size: Max 600px width
- Location: `/public/images/chords/`

**Hero Images (Future):**
- Format: WebP (with PNG fallback)
- Optimize: < 200KB
- Dimensions: 1200x600px

---

## ♿ ACCESSIBILITY

### **Color Contrast**

**WCAG AA Compliance:**
- Text on white: Minimum 4.5:1 contrast
- Text on purple: White text (passes)
- Links: Underlined + color (not color alone)

### **Focus States**

**Keyboard Navigation:**
```css
:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

**Skip Links:**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### **ARIA Labels**

**Navigation:**
```html
<nav aria-label="Main navigation">
```

**Buttons:**
```html
<button aria-label="Mark lesson complete">
```

---

## 🎯 DESIGN PATTERNS

### **Consistent Spacing Scale**

```css
/* Use multiples of 0.25rem (4px) */
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

### **Shadow Hierarchy**

```css
/* Subtle elevation */
box-shadow: 0 2px 10px rgba(0,0,0,0.05);

/* Medium elevation (hover) */
box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);

/* Strong elevation (modals) */
box-shadow: 0 20px 60px rgba(0,0,0,0.3);
```

### **Border Radius Scale**

```css
--radius-sm: 6px;   /* Buttons, badges */
--radius-md: 8px;   /* Input fields, dropdowns */
--radius-lg: 12px;  /* Cards */
--radius-xl: 20px;  /* Large containers */
```

---

## 📋 DESIGN CHECKLIST

**Before implementing any component:**
- [ ] Uses correct purple gradient for brand elements
- [ ] Text contrast meets WCAG AA standards
- [ ] Hover states defined for interactive elements
- [ ] Mobile responsive (test at 375px width)
- [ ] Focus states visible for keyboard navigation
- [ ] Spacing uses consistent scale
- [ ] Typography follows size/weight hierarchy
- [ ] Shadow depth appropriate for context
- [ ] Border radius matches component type

---

## 🎨 FIGMA / DESIGN FILES

**Current Status:** No Figma files (coded directly)

**Future:** May create Figma file for:
- Chord diagram templates
- Marketing materials
- Mobile app mockups

---

## 🔄 VERSION HISTORY

**v1.0 (Dec 7, 2025):**
- Initial design system documentation
- Purple gradient brand established
- Typography scale defined
- Component specifications complete

---

**Last Updated:** December 7, 2025  
**Maintained By:** Jim (Founder)  
**Claude Sessions:** Reference this file when styling ANY component!

---

## ⚠️ CRITICAL REMINDERS FOR CLAUDE

1. **ALWAYS use the purple gradient** (#667eea to #764ba2) for brand elements
2. **ALWAYS ensure text contrast** meets accessibility standards
3. **ALWAYS include hover states** for interactive elements
4. **ALWAYS test mobile responsive** design
5. **NEVER use arbitrary colors** - stick to defined palette

This document is the **source of truth** for visual design!
