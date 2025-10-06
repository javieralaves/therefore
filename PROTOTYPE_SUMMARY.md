# Therefore - Click-Through Prototype Summary

## ✅ Project Complete

A fully functional front-end click-through prototype built with:

- **Next.js 15.5.4** (App Router, TypeScript)
- **Tailwind CSS v4** with oklch color space
- **shadcn/ui** components (New York style, neutral palette)
- **Zustand** with sessionStorage persistence
- **Lucide React** icons

---

## 📁 Project Structure

```
/src
  /app
    layout.tsx                  # Root layout with TopBar
    page.tsx                    # Home/Ask page
    /context
      page.tsx                  # My Context page
    /challenge/[slug]
      page.tsx                  # Brief page (dynamic route)
    /studio/[slug]
      page.tsx                  # Studio flow (4 steps)
    /submitted
      page.tsx                  # Success page

  /components
    /ui                         # shadcn components (13 total)
      button, input, textarea, badge, card, switch
      progress, dialog, sheet, tooltip, sonner
      avatar, separator, label, placeholder
    /shell
      top-bar.tsx               # Global navigation

  /features
    /ask
      IntentSuggestions.tsx     # Homepage suggestion cards
    /brief
      BrandGuardrails.tsx       # Reusable guardrails component
      ExamplesCarousel.tsx      # Horizontal scroll examples
    /studio
      ProgressRail.tsx          # 25/50/75/100% progress bar
      PlanChat.tsx              # Pre-seeded conversation
      ScriptPane.tsx            # 3 variants + editor + guardrails
      MakePane.tsx              # Assembly board + A-roll/B-roll
      PublishPane.tsx           # Final settings + submission
      GuardrailsCard.tsx        # Live brand checks

  /lib
    flow-store.ts               # Zustand state management
    mock.ts                     # All mock data
    copy.ts                     # Copy constants
    utils.ts                    # Utility functions
```

---

## 🚀 Complete User Flow

### 1. **Home (/) - Ask**

- "What do you want to do?" headline
- Disabled input (prototype)
- 6 intent suggestion cards
- **1 "Sponsored" card** (Notion challenge) → leads to Brief

### 2. **My Context (/context)**

- Connected social handles (IG, TikTok, YouTube)
- Topics, tone chips
- 12 recent post placeholders
- "Improve my context" dialog with 4 toggle switches

### 3. **Brief (/challenge/notion)**

- Brand header (Notion logo + name)
- Why suggested for you (personalized)
- Payout: $45 CPM (up to $2,250)
- Must-say bullets (5 requirements)
- Examples carousel (4 placeholders)
- **Sticky guardrails sidebar**
- **"Start creating" CTA** → Studio with draftId

### 4. **Studio (/studio/notion?draft=demo-123)**

Forward-only flow with 4 steps:

#### **Step 1: Plan (25%)**

- Pre-seeded conversation (9 messages)
- Covers: audience, angle, tone, disclosure
- Plan summary card
- Continue → Script

#### **Step 2: Script (50%)**

- 3 script variants (Hook/Body/CTA/Rationale)
- Large text editor (editable, mono font)
- **Live guardrails** (5 checks):
  - ✅ Brand mention
  - ✅ Disclosure (#ad)
  - ✅ CTA with link
  - ⚠️ Duration estimate
  - ✅ Format (9:16)
- Inline action buttons (Tighten, Shorten, Insert CTA)
- Continue → Make

#### **Step 3: Make (75%)**

- **Timeline columns**: Hook (3-5s), Body (12-20s), CTA (3-5s)
- **A-roll section**: Upload | AI stand-in | Record later
- **B-roll grid**: 8 selectable Notion demo clips
- **Caption toggles**: Auto captions, Brand style
- Preview placeholder
- Guardrails (persistent)
- Continue → Publish

#### **Step 4: Publish (100%)**

- Final preview with "brand frame" label
- **Platform toggles**: Instagram Reels, TikTok, YouTube Shorts
- Caption textarea (editable)
- Hashtags textarea
- Helper text (24-hour review)
- Guardrails (persistent)
- **"Submit for brand review"** → Submitted

### 5. **Submitted (/submitted)**

- Success state (green theme)
- Check icon
- "Submitted for review! 🎉"
- Explanation of next steps
- "View my submissions" (disabled)
- **"Back to Home"** button

---

## 🎨 Design Principles Implemented

✅ **Forward motion over stepper chrome**

- Subtle progress bar (25/50/75/100%)
- Big "Continue" button at bottom-right
- Minimal Back link

✅ **Screens are minimal and pre-seeded**

- No blank inputs (Plan conversation pre-filled)
- Script variants ready to select
- Make step has defaults selected

✅ **Visual placeholders everywhere**

- Gray boxes with centered labels
- "Placeholder – [description]"
- 9:16 aspect ratio for video content

✅ **shadcn-first components**

- 13 shadcn components used throughout
- Consistent styling with Tailwind v4
- Neutral palette (bg-neutral-50/100/200/900)

---

## 💾 State Management

### Zustand Store (sessionStorage)

All state persists across page refreshes:

```typescript
{
  // Studio flow
  step: 'plan' | 'script' | 'make' | 'publish'
  draftId: 'demo-123456' (from URL)

  // Script
  selectedScriptId: 'variant-1'
  scriptEditorContent: 'Full script text...'

  // Make
  aRollMode: 'upload' | 'ai' | 'record-later'
  selectedBrollIds: ['broll-1', 'broll-3']
  autoCaptions: true
  brandStyleCaptions: true

  // Publish
  platformToggles: { instagram: true, tiktok: true, youtube: false }
  caption: '3 Notion features that changed my workflow...'
  hashtags: '#productivity #notion #creator'
}
```

### URL-First Architecture

- `/studio/notion?draft=demo-123456`
- Deep-linkable (copy/paste URL works)
- draftId syncs from URL to store on mount
- Refresh preserves all state

---

## 📊 Build Stats

```
Route (app)                         Size    First Load JS
┌ ○ /                                0 B         118 kB
├ ○ /_not-found                      0 B         118 kB
├ ƒ /challenge/[slug]                0 B         118 kB
├ ○ /context                     27.7 kB         146 kB
├ ƒ /studio/[slug]               23.8 kB         142 kB
└ ○ /submitted                       0 B         118 kB

First Load JS shared: 130 kB
```

- **7 routes** (5 static, 2 dynamic)
- **No linting errors**
- **No TypeScript errors**
- **Production build successful**

---

## 🎯 Definition of Done - All Met ✅

✅ All routes compile and navigate
✅ Forward-only flow works via "Continue"
✅ Plan screen shows believable pre-seeded conversation + plan summary
✅ Script shows 3 variants + sticky guardrails with mock checks
✅ Make shows timeline slots, A-roll mode toggle, B-roll selectable placeholders, caption toggles, preview
✅ Publish shows platform toggles, caption fields, working "Submit for brand review" button → /submitted
✅ No real uploads, no backend, no Stripe

---

## 🔧 Tech Highlights

1. **Tailwind v4**: Modern @import syntax, @theme inline, oklch colors
2. **Next.js 15**: App Router, async params, Turbopack build
3. **Zustand**: Lightweight state (13 KB chunk) with persist middleware
4. **shadcn/ui**: All components locally installed, fully customizable
5. **TypeScript**: Fully typed throughout, no any types
6. **Lucide Icons**: Tree-shaken, only used icons bundled

---

## 🎨 Visual Style

- **Neutral palette**: bg-neutral-50/100/200/900
- **Rounded corners**: rounded-2xl on cards
- **Soft shadows**: shadow-md/shadow-lg
- **Generous whitespace**: py-8/py-12, space-y-6/8
- **Typography**: Geist Sans (medium headlines, regular body)
- **Hover states**: Smooth transitions on all interactive elements

---

## 🚧 Obvious Polish Follow-ups

### High Priority

1. **Add loading states** during step transitions
2. **Animate progress bar** transitions (0.3s ease)
3. **Add micro-interactions**:
   - Button press scale (0.98)
   - Card hover lift
   - Toast notifications on Continue
4. **Script editor syntax highlighting** for [TO CAMERA], [B-ROLL] tags
5. **B-roll preview on hover** in Make step

### Medium Priority

6. **Keyboard navigation**: Arrow keys to switch script variants
7. **Auto-save indicator** (mock) in Script editor
8. **Character count** in caption/hashtags textareas
9. **Platform preview icons** (IG/TikTok/YT logos) instead of just labels
10. **Onboarding tooltips** on first visit (use localStorage flag)

### Nice to Have

11. **Dark mode** toggle (already configured in globals.css)
12. **Undo/Redo** in Script editor (Cmd+Z)
13. **Drag-and-drop** for B-roll reordering
14. **Export project** as JSON for sharing
15. **Print-friendly** Brief page

---

## 📝 Notes

- All data is mocked in `/src/lib/mock.ts`
- Copy text is centralized in `/src/lib/copy.ts`
- Component library is shadcn/ui (not external CDN)
- State persists in sessionStorage (cleared on browser close)
- No authentication, no API calls, no database
- Perfect for stakeholder demos and user testing

---

## 🎉 Ready for Testing

The prototype is fully functional and ready for:

- **Stakeholder demos**: Click through the full flow
- **User testing**: Gather feedback on UX
- **Design iteration**: Easy to adjust styling
- **Feature expansion**: Add real API integration

**Estimated completion time**: ≤30 minutes to click through entire flow (as designed!)

---

Built with ❤️ by Therefore team
