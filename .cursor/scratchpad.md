# Therefore Prototype - Action Plan (Updated)

## Overview

Building a front-end only click-through prototype in Next.js (App Router, TypeScript), Tailwind v4, and shadcn/ui.

## Key Improvements Incorporated

- **URL-first routing**: draftId query param (`/studio/[slug]?draft=abc123`) for deep-linking
- **Feature-based organization**: `/src/features/` instead of `/src/components/`
- **Zustand with persist**: sessionStorage for resilient state across refreshes
- **Brand guardrails throughout**: Live pass/fail chips in Script, Make, and Publish (not separate step)
- **Pre-seeded conversation**: Plan step shows complete dialogue, not blank chat
- **Placeholder helper**: Consistent gray boxes with labels
- **Script variants with rationale**: Hook, Body, CTA, and "Why this works" blurb
- **Make pane as assembly board**: Columns (Hook 3-5s / Body 12-20s / CTA 3-5s)
- **copy.ts in /lib**: Moved from /styles to /lib

## Updated Folder Structure

```
/src/app
  /page.tsx                     // Ask
  /context/page.tsx
  /challenge/[slug]/page.tsx
  /studio/[slug]/page.tsx
/src/features/studio
  PlanChat.tsx  ScriptPane.tsx  MakePane.tsx  PublishPane.tsx
  GuardrailsCard.tsx  ProgressRail.tsx
/src/features/brief
  BrandGuardrails.tsx  ExamplesCarousel.tsx
/src/features/ask
  IntentSuggestions.tsx
/src/components/ui
  placeholder.tsx (+ shadcn components)
/src/components/shell
  top-bar.tsx
/src/lib
  flow-store.ts   mock.ts   copy.ts
```

## Action Plan

### Phase 1: Setup & Dependencies

- [ ] **Task 1.1**: Check Zustand version and add shadcn/ui components
  - Success: Zustand with persist middleware installed, all shadcn components added (button, input, textarea, badge, card, switch, progress, dialog, sheet, tooltip, toast, avatar, separator)

### Phase 2: Core Structure & State

- [ ] **Task 2.1**: Create flow store (`/src/lib/flow-store.ts`) with Zustand + persist middleware
  - Success: Store with sessionStorage persistence, URL-first approach, fields (step, selectedScriptId, aRollMode, selectedBrollIds, platformToggles, captions, hashtags)
- [ ] **Task 2.2**: Create mock data file (`/src/lib/mock.ts`)
  - Success: Mock includes challenge brief, script variants (Hook/Body/CTA/"Why this works"), stock B-roll items, intent suggestions, pre-seeded Plan conversation
- [ ] **Task 2.3**: Create copy/content file (`/src/lib/copy.ts`)
  - Success: Copy constants for headlines, CTAs, guardrail descriptions defined
- [ ] **Task 2.4**: Create Placeholder helper component (`/src/components/ui/placeholder.tsx`)
  - Success: Reusable component with neutral gray-200/70 bg, centered label, rounded-xl, min-h-40

### Phase 3: Layout & Shell Components

- [ ] **Task 3.1**: Create top bar component (`/src/components/shell/top-bar.tsx`)
  - Success: Slim top bar with "Therefore" logo left, "My Context" link right
- [ ] **Task 3.2**: Update root layout with top bar
  - Success: Layout includes top bar, proper spacing, clean neutral styling

### Phase 4: Home & Context Pages

- [ ] **Task 4.1**: Build Home/Ask page (`/src/app/page.tsx`)
  - Success: "What do you want to do?" headline, disabled input, grid of intent suggestions with one "Sponsored" tile clearly marked
- [ ] **Task 4.2**: Create intent suggestions component (`/src/features/ask/IntentSuggestions.tsx`)
  - Success: Component renders mock suggestions as clickable cards, one marked "Sponsored" linking to /challenge/notion
- [ ] **Task 4.3**: Build My Context page (`/src/app/context/page.tsx`)
  - Success: Read-only cards for connected handles, topics, tone chips, recent posts (gray placeholders), "Improve my context" button opens dialog

### Phase 5: Brief Page

- [ ] **Task 5.1**: Create Brief page (`/src/app/challenge/[slug]/page.tsx`)
  - Success: Brand logo/name, "why suggested" blurb, payout (mock CPM), must-say bullets, examples carousel with placeholders
- [ ] **Task 5.2**: Create Brand Guardrails component (`/src/features/brief/BrandGuardrails.tsx`)
  - Success: Reusable component with bulleted checklist, reused in Studio steps
- [ ] **Task 5.3**: Create Examples Carousel component (`/src/features/brief/ExamplesCarousel.tsx`)
  - Success: Horizontal scroll of gray placeholder boxes labeled "Example - Brand video"

### Phase 6: Studio Flow - Infrastructure

- [ ] **Task 6.1**: Create Studio page scaffold (`/src/app/studio/[slug]/page.tsx`)
  - Success: Page reads draftId from URL query, syncs with Zustand, renders ProgressRail, content area, Continue/Back buttons
- [ ] **Task 6.2**: Create Progress Rail component (`/src/features/studio/ProgressRail.tsx`)
  - Success: Slim progress bar showing 25/50/75/100% for plan/script/make/publish steps

### Phase 7: Studio Flow - Plan Step

- [ ] **Task 7.1**: Create Plan Chat component (`/src/features/studio/PlanChat.tsx`)
  - Success: Pre-seeded conversation bubbles (Therefore ↔ You) covering audience, angle, tone, disclosure; ends with plan summary card; no input field

### Phase 8: Studio Flow - Script Step

- [ ] **Task 8.1**: Create Script Pane component (`/src/features/studio/ScriptPane.tsx`)
  - Success: Left: three variant cards (Hook/Body/CTA/rationale); Center: rich text editor for selected variant; inline action buttons (Tighten intro, Shorten to 30s, Insert CTA)
- [ ] **Task 8.2**: Create Guardrails Card component (`/src/features/studio/GuardrailsCard.tsx`)
  - Success: Sticky card on right with live ✅/⚠️ indicators (Must-say present, CTA included, #ad disclosure, Duration estimate)

### Phase 9: Studio Flow - Make Step

- [ ] **Task 9.1**: Create Make Pane component (`/src/features/studio/MakePane.tsx`)
  - Success: Assembly board with columns (Hook 3-5s / Body 12-20s / CTA 3-5s), A-roll picker (Upload | Use AI stand-in | Record later), B-roll grid (selectable "Brand demo stock" placeholders), caption toggles (Auto captions, Brand style captions), preview placeholder, guardrails card

### Phase 10: Studio Flow - Publish Step

- [ ] **Task 10.1**: Create Publish Pane component (`/src/features/studio/PublishPane.tsx`)
  - Success: Preview placeholder, platform toggles (IG Reels / TikTok / YT Shorts), caption textarea, hashtags textarea, "Submit for brand review" button → /submitted, guardrails card

### Phase 11: Submitted Page

- [ ] **Task 11.1**: Create Submitted page (`/src/app/submitted/page.tsx`)
  - Success: Big check icon, "Thanks! We'll notify you..." message, "View my submissions" (no-op) and "Back to Home" buttons

### Phase 12: Integration & Testing

- [ ] **Task 12.1**: Wire up Continue button through all steps with URL persistence
  - Success: Continue advances step and updates URL query; Back works; refresh preserves state
- [ ] **Task 12.2**: Test all navigation paths
  - Success: Home → Brief → Studio (plan → script → make → publish) → Submitted flows smoothly
- [ ] **Task 12.3**: Implement mock guardrail checks
  - Success: Script editor text searched for "#ad", "sponsored", brand keywords; checks update live with ✅/⚠️
- [ ] **Task 12.4**: Polish styling consistency
  - Success: Neutral palette, rounded-2xl cards, soft shadows, generous whitespace, consistent typography

### Phase 13: Final Review

- [ ] **Task 13.1**: Verify all routes compile and navigate
  - Success: No TypeScript errors, all links work, deep-links with draftId work
- [ ] **Task 13.2**: Check all placeholders are properly labeled
  - Success: All visual placeholders use Placeholder component with descriptive labels
- [ ] **Task 13.3**: Final polish and cleanup
  - Success: Code is tidy, feature-organized, well-typed, follows Next.js App Router best practices

---

## Progress

### ✅ Phase 1: Setup & Dependencies - COMPLETE

- [x] **Task 1.1**: Check Zustand version and add shadcn/ui components
  - ✅ Zustand v5.0.2 installed with persist middleware support
  - ✅ All shadcn components added: button, input, textarea, badge, card, switch, progress, dialog, sheet, tooltip, sonner (toast replacement), avatar, separator
  - ✅ 13 component files created in /src/components/ui/

**Task 1.2 Verification**: Tailwind v4 Configuration

- ✅ Tailwind v4 properly configured with modern @import syntax
- ✅ Using @theme inline for custom variables
- ✅ Using oklch color space (Tailwind v4 feature)
- ✅ PostCSS configured with @tailwindcss/postcss plugin
- ✅ Neutral base color scheme configured in components.json

### ✅ Phase 2: Core Structure & State - COMPLETE

- [x] **Task 2.1**: Create flow store (`/src/lib/flow-store.ts`) with Zustand + persist middleware
  - ✅ Store created with sessionStorage persistence using `createJSONStorage`
  - ✅ URL-first approach ready (draftId field)
  - ✅ All state fields: step, selectedScriptId, aRollMode, selectedBrollIds, platformToggles, captions, hashtags
  - ✅ Helper actions: nextStep(), previousStep(), resetFlow(), toggleBrollSelection()
- [x] **Task 2.2**: Create mock data file (`/src/lib/mock.ts`)
  - ✅ IntentSuggestions with one "Sponsored" Notion challenge
  - ✅ ChallengeBrief with brand info, payout, must-say bullets
  - ✅ Pre-seeded Plan conversation (9 messages, Therefore ↔ User)
  - ✅ Plan summary data (audience, angle, tone, disclosure, duration)
  - ✅ 3 Script variants with Hook/Body/CTA/rationale ("Why this works")
  - ✅ 8 B-roll items for Make step
  - ✅ Dynamic guardrail checker function (checkGuardrails)
  - ✅ User context data for /context page
- [x] **Task 2.3**: Create copy/content file (`/src/lib/copy.ts`)
  - ✅ All copy constants organized by feature
  - ✅ Headlines, CTAs, labels for all screens
  - ✅ Placeholder labels defined
- [x] **Task 2.4**: Create Placeholder helper component (`/src/components/ui/placeholder.tsx`)
  - ✅ Reusable component with neutral gray-200/70 bg
  - ✅ Centered label, rounded-xl, min-h-40
  - ✅ Accepts custom className for flexibility
  - ✅ No linting errors

### ✅ Phase 3: Layout & Shell Components - COMPLETE

- [x] **Task 3.1**: Create top bar component (`/src/components/shell/top-bar.tsx`)

  - ✅ Slim sticky header with border-bottom
  - ✅ "Therefore" brand name on left (links to home)
  - ✅ "My Context" link on right
  - ✅ Backdrop blur effect for modern look
  - ✅ Hover states and transitions
  - ✅ Uses COPY constants for all text

- [x] **Task 3.2**: Update root layout with top bar
  - ✅ TopBar imported and rendered at top of body
  - ✅ Main content area with proper height calculation (100vh - 3.5rem)
  - ✅ Metadata updated with Therefore branding
  - ✅ Geist fonts properly configured
  - ✅ Clean, minimal layout structure
  - ✅ Build successful - no errors

### ✅ Phase 4: Home & Context Pages - COMPLETE

- [x] **Task 4.1**: Build Home/Ask page (`/src/app/page.tsx`)

  - ✅ Centered headline: "What do you want to do?"
  - ✅ Large disabled input (h-14, opacity-60 for prototype)
  - ✅ "Suggestions for you" section heading
  - ✅ IntentSuggestions grid rendered
  - ✅ Responsive container with max-width
  - ✅ Clean, spacious layout with generous padding

- [x] **Task 4.2**: Create intent suggestions component (`/src/features/ask/IntentSuggestions.tsx`)

  - ✅ Grid layout: 1 col mobile, 2 cols tablet, 3 cols desktop
  - ✅ Card components with hover effects (shadow-lg, border highlight)
  - ✅ "Sponsored" badge on Notion challenge (dark bg, white text)
  - ✅ Links to `/challenge/[slug]` for sponsored card
  - ✅ Hover transitions on cards and titles
  - ✅ Mock data integration (6 suggestions, 1 sponsored)

- [x] **Task 4.3**: Build My Context page (`/src/app/context/page.tsx`)
  - ✅ Page header with title and "Improve my context" button
  - ✅ Dialog component with 4 toggle switches (mock settings)
  - ✅ Connected handles card (Instagram, TikTok, YouTube with follower counts)
  - ✅ Topics card with badge chips (5 topics)
  - ✅ Tone card with secondary badges (5 tone attributes)
  - ✅ Recent posts card with 12 gray placeholder boxes (9:16 aspect ratio)
  - ✅ Client component with useState for dialog
  - ✅ Read-only display with rich card styling
  - ✅ Build successful - 23.1 KB bundle size

### ✅ Phase 5: Brief Page - COMPLETE

- [x] **Task 5.1**: Create Brief page (`/src/app/challenge/[slug]/page.tsx`)

  - ✅ Dynamic routing with [slug] parameter (async params)
  - ✅ Brand header with logo placeholder and name
  - ✅ "Why suggested for you" card with personalized blurb
  - ✅ Payout card showing $45 CPM and "up to $2,250"
  - ✅ "Must include" card with numbered bullets (5 requirements)
  - ✅ Examples carousel section with 4 placeholder boxes
  - ✅ "Start creating" CTA button linking to `/studio/[slug]?draft=demo-[timestamp]`
  - ✅ Two-column layout: main content (2/3) + sticky sidebar (1/3)
  - ✅ notFound() handling for unsupported slugs
  - ✅ Server-rendered on demand (dynamic route)

- [x] **Task 5.2**: Create Brand Guardrails component (`/src/features/brief/BrandGuardrails.tsx`)

  - ✅ Reusable component accepting bullets array
  - ✅ Optional showSubtitle prop
  - ✅ Bordered card with neutral background (border-2, bg-neutral-50)
  - ✅ Bulleted list with proper spacing
  - ✅ Used in Brief sidebar (sticky positioning)
  - ✅ Will be reused in Studio steps (Script, Make, Publish)

- [x] **Task 5.3**: Create Examples Carousel component (`/src/features/brief/ExamplesCarousel.tsx`)
  - ✅ Horizontal scrollable container with overflow-x-auto
  - ✅ Accepts count prop for number of examples
  - ✅ Gray placeholder boxes (9:16 aspect ratio, h-80, w-64)
  - ✅ Labeled "Example - Brand video 1/2/3/4"
  - ✅ Shrink-0 to prevent squashing
  - ✅ Gap spacing and padding for scroll affordance

### ✅ Phase 6: Studio Flow - Infrastructure - COMPLETE

- [x] **Task 6.1**: Create Studio page scaffold (`/src/app/studio/[slug]/page.tsx`)

  - ✅ Dynamic routing with [slug] parameter
  - ✅ Client component with "use client" directive
  - ✅ URL query param handling (draft=...)
  - ✅ useSearchParams to read draftId from URL
  - ✅ Zustand store integration (useFlowStore)
  - ✅ useEffect to sync URL draftId to store on mount
  - ✅ Full-height layout with flex column
  - ✅ Three sections: Progress Rail (top), Content (middle), Navigation (bottom sticky)
  - ✅ Continue button advances steps, navigates to /submitted on final step
  - ✅ Back button goes to previous step or back to /challenge/[slug]
  - ✅ Dynamic button text: "Continue" vs "Submit for brand review"
  - ✅ Placeholder content area (min-h-500px) ready for step components
  - ✅ Build successful - 3.43 KB bundle, 133 KB First Load JS

- [x] **Task 6.2**: Create Progress Rail component (`/src/features/studio/ProgressRail.tsx`)
  - ✅ shadcn Progress component integration
  - ✅ Maps steps to progress values: plan=25%, script=50%, make=75%, publish=100%
  - ✅ Step labels displayed below progress bar
  - ✅ Current step highlighted with font-semibold and darker text
  - ✅ Clean, minimal design with proper spacing
  - ✅ Fully typed with StudioStep type

### ✅ Phase 7: Studio Flow - Plan Step - COMPLETE

- [x] **Task 7.1**: Create Plan Chat component (`/src/features/studio/PlanChat.tsx`)
  - ✅ Pre-seeded conversation with 9 messages (no input field)
  - ✅ Chat bubbles alternating between "Therefore" and "You"
  - ✅ Therefore messages: neutral-100 bg, left-aligned
  - ✅ User messages: neutral-900 bg, white text, right-aligned
  - ✅ Rounded-2xl bubbles with max-w-[80%]
  - ✅ Proper spacing between messages (space-y-4)
  - ✅ Conversation covers: audience, angle, tone, disclosure
  - ✅ Plan summary card at end with border-2, shadow-lg
  - ✅ Summary fields: Audience, Angle, Tone, Disclosure, Target duration
  - ✅ "Ready" badge with green styling
  - ✅ Helper text: "Click Continue to move to the Script step"
  - ✅ Max-w-3xl centered layout
  - ✅ Integrated into Studio page with conditional rendering
  - ✅ Build successful - 16.9 KB bundle (increased from 3.43 KB)

### ✅ Phase 8: Studio Flow - Script Step - COMPLETE

- [x] **Task 8.1**: Create Script Pane component (`/src/features/studio/ScriptPane.tsx`)

  - ✅ Three-column layout: Variants (left), Editor (center), Guardrails (right)
  - ✅ Variant cards showing 3 script options from mock data
  - ✅ Each variant displays: title, Hook preview, Body count, CTA preview, rationale
  - ✅ Selected variant highlighted with border-2 border-neutral-900 and shadow
  - ✅ Click to select variant, loads full script into editor
  - ✅ Auto-selects first variant on mount using useEffect
  - ✅ Large Textarea editor (min-h-500px, font-mono, leading-relaxed)
  - ✅ Editor syncs with Zustand store (scriptEditorContent)
  - ✅ Three inline action buttons (ghost buttons, no-ops for prototype):
    - "Tighten intro", "Shorten to 30s", "Insert CTA"
  - ✅ Responsive grid: stacks on mobile, 3 columns on desktop
  - ✅ Integrated into Studio page

- [x] **Task 8.2**: Create Guardrails Card component (`/src/features/studio/GuardrailsCard.tsx`)
  - ✅ Sticky positioning (sticky top-20) in right column
  - ✅ Live checks using checkGuardrails() function from mock.ts
  - ✅ Dynamic status indicators based on script content:
    - ✅ Green check (CheckCircle2) for pass
    - ⚠️ Amber warning (AlertTriangle) for warning
    - ✗ Red X (XCircle) for fail
  - ✅ Colored badges: ✓ (green), ⚠ (amber), ✗ (red)
  - ✅ Five guardrail checks implemented:
    - Brand mention ("Notion")
    - Disclosure (#ad or "sponsored")
    - CTA with link (notion.so)
    - Duration estimate (~45-55s based on length)
    - Format (9:16 vertical - always pass)
  - ✅ Updates live as user types in editor
  - ✅ Lucide icons integration (CheckCircle2, AlertTriangle, XCircle)
  - ✅ Bordered card design matching Brief guardrails
  - ✅ Client component with reactive updates

### ✅ Phase 9: Studio Flow - Make Step - COMPLETE

- [x] **Task 9.1**: Create Make Pane component (`/src/features/studio/MakePane.tsx`)
  - ✅ Assembly board layout with timeline columns at top:
    - Hook (3-5s) - Blue bordered card
    - Body (12-20s) - Green bordered card
    - CTA (3-5s) - Amber bordered card
  - ✅ Two-column layout below: Main content (2/3) + Guardrails (1/3)
  - ✅ A-roll section with three mode options:
    - Upload clip (Upload icon)
    - Use AI stand-in (Sparkles icon)
    - Record later (Video icon)
    - Button-based selector with active state highlighting
    - A-roll placeholder (9:16 aspect, max-h-300px)
  - ✅ B-roll section with 8 selectable items:
    - Grid layout: 2 cols mobile, 4 cols desktop
    - Mock items from mockBrollItems (Notion demos)
    - Click to select/deselect
    - Selected items show: border-2, ring, checkmark badge
    - Duration labels on each item (3s/4s)
    - Hover states and transitions
  - ✅ Caption toggles card:
    - Auto captions (Switch)
    - Brand style captions (Switch)
    - Syncs with Zustand store
  - ✅ Preview section with placeholder (9:16, max-h-400px)
  - ✅ Guardrails card (reused from Script step, sticky right column)
  - ✅ All state synced with Zustand: aRollMode, selectedBrollIds, autoCaptions, brandStyleCaptions
  - ✅ Label component created and installed (@radix-ui/react-label)
  - ✅ Lucide icons: Upload, Sparkles, Video
  - ✅ Build successful - 23.4 KB bundle (up from 19.9 KB)

### ✅ Phase 10: Studio Flow - Publish Step - COMPLETE

- [x] **Task 10.1**: Create Publish Pane component (`/src/features/studio/PublishPane.tsx`)
  - ✅ Two-column layout: Preview & Settings (2/3) + Guardrails (1/3)
  - ✅ Final preview section:
    - Large placeholder (9:16 aspect, max-h-500px)
    - "With brand frame" label overlay
  - ✅ Platform toggles card with three switches:
    - Instagram Reels (default: on)
    - TikTok (default: on)
    - YouTube Shorts (default: off)
    - Syncs with Zustand: platformToggles object
  - ✅ Caption textarea:
    - Editable text area (min-h-120px)
    - Placeholder: "Write your caption..."
    - Syncs with Zustand: caption field
  - ✅ Hashtags textarea:
    - Editable text area (min-h-80px)
    - Placeholder: "#productivity #notion #creator"
    - Syncs with Zustand: hashtags field
  - ✅ Helper text box (blue-50 bg):
    - Info about 24-hour review process
    - Notification details
  - ✅ Guardrails card (reused, sticky right column)
  - ✅ All state persists via Zustand
  - ✅ Integrated into Studio page
  - ✅ "Submit for brand review" button in bottom nav (Studio page)
  - ✅ Build successful - 23.8 KB bundle

### ✅ Phase 11: Submitted Page - COMPLETE

- [x] **Task 11.1**: Create Submitted page (`/src/app/submitted/page.tsx`)
  - ✅ Success state with green-themed card
  - ✅ Large check icon (CheckCircle2 from Lucide, w-12 h-12)
  - ✅ Success title: "Submitted for review! 🎉"
  - ✅ Confirmation message explaining 24-hour review process
  - ✅ Two action buttons:
    - "View my submissions" (disabled, no-op for prototype)
    - "Back to Home" (links to /)
  - ✅ "What happens next?" section with additional context
  - ✅ Border-2 green-200, bg-green-50/30 styling
  - ✅ Centered layout with max-w-screen-md
  - ✅ Responsive button layout (stacks on mobile)
  - ✅ Static page (prerendered)
  - ✅ Build successful - new route added
