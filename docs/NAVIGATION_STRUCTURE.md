# 🧭 GUITAR MASTERY HUB - NAVIGATION STRUCTURE

**Last Updated:** December 7, 2025  
**Version:** 1.0  
**Purpose:** Complete navigation implementation specifications

---

## ⚠️ CRITICAL RULE

**EVERY authenticated page MUST include the Navigation component!**

**Exception:** Only the login page (`/`) has a different layout without navigation.

---

## 📁 NAVIGATION COMPONENT

### **File Location**
```
app/components/Navigation.tsx
```

### **Component Signature**
```typescript
export default function Navigation({ user }: { user: any })
```

**Props:**
- `user`: User object from Supabase (contains email, id, etc.)

### **Usage Pattern**

```typescript
import Navigation from '../components/Navigation';  // or appropriate path
import { getCurrentUser } from '@/lib/supabase';

export default function SomePage() {
  const [user, setUser] = useState(null);
  
  // Load user...
  
  return (
    <div>
      <Navigation user={user} />
      {/* Page content */}
    </div>
  );
}
```

---

## 🗺️ NAVIGATION MENU STRUCTURE

### **Visual Layout**

```
┌──────────────────────────────────────────────────────────────┐
│  🎸 Guitar Mastery Hub    About  Lessons  Resources ▾  Contact    user@email.com  [Logout]  │
│                                       │                          │
│                                       │                          │
│                                  ┌────┴────────────────┐        │
│                                  │ Learning Guide      │        │
│                                  │ Practice Philosophy │        │
│                                  │ Shape Library       │        │
│                                  │ Practice Logs       │        │
│                                  └─────────────────────┘        │
└──────────────────────────────────────────────────────────────┘
```

### **Menu Items (Left to Right)**

#### **1. Logo (Left-most)**
- **Icon:** 🎸 (32px emoji)
- **Text:** "Guitar Mastery Hub" (24px, bold)
- **Link:** `/lessons`
- **Display:** Flex, gap 10px
- **Hover:** No special effect (always visible)

#### **2. About**
- **Text:** "About"
- **Link:** `/about`
- **Style:** White text, 16px, weight 500
- **Hover:** Opacity 0.8

#### **3. Lessons**
- **Text:** "Lessons"
- **Link:** `/lessons`
- **Style:** White text, 16px, weight 500
- **Hover:** Opacity 0.8

#### **4. Resources (Dropdown)**
- **Text:** "Resources ▾"
- **Behavior:** Shows dropdown on hover
- **Style:** White text, 16px, weight 500, cursor pointer
- **Dropdown Items:**
  1. Learning Guide → `/resources/learning-guide`
  2. Practice Philosophy → `/resources/practice-philosophy`
  3. Shape Library → `/resources/shape-library`
  4. Practice Log Templates → `/resources/practice-logs`

**Dropdown Styling:**
```css
position: absolute;
top: 100%;
left: 0;
background: white;
min-width: 220px;
box-shadow: 0 8px 16px rgba(0,0,0,0.1);
border-radius: 8px;
margin-top: 0;
padding-top: 5px;
z-index: 1000;
```

**Dropdown Item Styling:**
```css
display: block;
padding: 12px 20px;
color: #333;
text-decoration: none;
font-size: 14px;
transition: background 0.2s;
```

**Dropdown Item Hover:**
```css
background: #f5f7fa;
```

**Dropdown Separator:**
- Add `border-top: 1px solid #eee` to "Practice Logs" item

#### **5. Contact**
- **Text:** "Contact"
- **Link:** `/contact`
- **Style:** White text, 16px, weight 500
- **Hover:** Opacity 0.8

#### **6. User Email (Right side)**
- **Text:** User's email address
- **Display:** Read-only text
- **Style:** 14px, opacity 0.9
- **Example:** "jim@example.com"

#### **7. Logout Button (Right-most)**
- **Text:** "Logout"
- **Action:** Signs out user, redirects to `/`
- **Style:**
  ```css
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  ```
- **Hover:**
  ```css
  background: rgba(255,255,255,0.3);
  ```

---

## 📱 RESPONSIVE BEHAVIOR

### **Desktop (> 1024px)**
- All items visible in single row
- Dropdown appears below "Resources"
- No hamburger menu needed

### **Tablet (768px - 1024px)**
- Same as desktop
- May need to reduce spacing slightly

### **Mobile (< 768px)**

**Header Adaptation:**
- Logo: Centered or left-aligned
- Hamburger menu (☰): Replaces nav links
- User info: Move to top of mobile menu

**Mobile Menu:**
- Opens as drawer/overlay from top or side
- Full-width on small screens
- Items stack vertically
- Resources: Expand/collapse (no hover)
- Close button (✕) in top corner

**Mobile Menu Styling:**
```css
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
z-index: 1000;
padding: 20px;
```

---

## 🎨 STYLING SPECIFICATIONS

### **Navigation Container**

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 20px 0;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
position: sticky;
top: 0;
z-index: 100;
```

### **Inner Container**

```css
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
display: flex;
justify-content: space-between;
align-items: center;
```

### **Nav Menu Section**

```css
display: flex;
gap: 30px;
align-items: center;
```

### **User Info Section**

```css
display: flex;
align-items: center;
gap: 15px;
```

---

## 🔧 IMPLEMENTATION CODE

### **Complete Navigation Component**

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navigation({ user }: { user: any }) {
  const router = useRouter();
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/lessons" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'white'
        }}>
          <span style={{ fontSize: '32px' }}>🎸</span>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Guitar Mastery Hub</h1>
        </Link>

        {/* Navigation Menu */}
        <nav style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          <Link href="/about" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'opacity 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
            About
          </Link>

          <Link href="/lessons" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'opacity 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
            Lessons
          </Link>

          {/* Resources Dropdown */}
          <div
            style={{ position: 'relative', padding: '10px 0' }}
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            <span style={{
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Resources ▾
            </span>
            {showResourcesDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'white',
                minWidth: '220px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                marginTop: '0',
                paddingTop: '5px',
                zIndex: 1000
              }}>
                <Link href="/resources/learning-guide" style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f7fa'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  Learning Guide
                </Link>
                <Link href="/resources/practice-philosophy" style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f7fa'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  Practice Philosophy
                </Link>
                <Link href="/resources/shape-library" style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f7fa'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  Shape Library
                </Link>
                <Link href="/resources/practice-logs" style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px',
                  borderTop: '1px solid #eee',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f7fa'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  Practice Log Templates
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'opacity 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
            Contact
          </Link>
        </nav>

        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '14px', opacity: 0.9 }}>
            {user?.email}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 USAGE CHECKLIST

**When creating a new page:**
- [ ] Import Navigation component
- [ ] Load user with `getCurrentUser()`
- [ ] Pass user prop to Navigation
- [ ] Place Navigation as first child in layout
- [ ] Verify navigation renders on page
- [ ] Test all nav links work
- [ ] Test dropdown functionality
- [ ] Test logout button
- [ ] Test on mobile (responsive)

---

## 🧪 TESTING REQUIREMENTS

### **Desktop Testing**
- [ ] Logo links to /lessons
- [ ] All nav links navigate correctly
- [ ] Resources dropdown appears on hover
- [ ] All dropdown items link correctly
- [ ] Dropdown closes when mouse leaves
- [ ] User email displays
- [ ] Logout button works (redirects to /)
- [ ] Sticky position works on scroll

### **Mobile Testing**
- [ ] Hamburger menu appears
- [ ] Menu opens/closes
- [ ] All links work in mobile menu
- [ ] Resources expands/collapses
- [ ] Logout works
- [ ] No horizontal scroll
- [ ] Touch-friendly hit targets

---

## 🚨 COMMON MISTAKES TO AVOID

### **❌ WRONG: Building page without Navigation**
```typescript
export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      {/* Missing navigation! */}
    </div>
  );
}
```

### **✅ CORRECT: Including Navigation**
```typescript
import Navigation from '../components/Navigation';

export default function AboutPage() {
  const [user, setUser] = useState(null);
  // ... load user
  
  return (
    <div>
      <Navigation user={user} />
      <div>
        <h1>About</h1>
      </div>
    </div>
  );
}
```

### **❌ WRONG: Hardcoding user email**
```typescript
<Navigation user={{ email: 'test@example.com' }} />
```

### **✅ CORRECT: Loading actual user**
```typescript
const user = await getCurrentUser();
<Navigation user={user} />
```

---

## 🎯 ACTIVE STATE (Future Enhancement)

**Show which page is currently active:**

```typescript
import { usePathname } from 'next/navigation';

const pathname = usePathname();

// Then in nav link:
style={{
  color: 'white',
  textDecoration: 'none',
  borderBottom: pathname === '/about' ? '2px solid #FCD34D' : 'none'
}}
```

---

## 🔄 VERSION HISTORY

**v1.0 (Dec 7, 2025):**
- Initial navigation structure
- Desktop and mobile specs
- Complete component code
- Usage documentation

---

**Last Updated:** December 7, 2025  
**Maintained By:** Jim (Founder)  
**Claude Sessions:** ALWAYS include Navigation component on authenticated pages!

---

## ⚠️ FINAL CRITICAL REMINDER

**NEVER build an authenticated page without the Navigation component!**

If you're building a page and don't see Navigation in the code, **STOP** and add it first!

This is the #1 rule to prevent incomplete implementations.
