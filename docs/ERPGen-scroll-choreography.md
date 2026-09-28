# ERPGen — Master Scroll Choreography & Visual Storyboard Blueprint

## 1. Executive Summary & Design Vision

This document defines the complete visual and motion choreography for the public ERPGen website. 

The website transforms from a disjointed sequence of independent cards into **one continuous visual journey** through the ERPGen product ecosystem. Every scroll movement conveys product meaning:
- **What ERPGen is**: Not a generic monolithic tool, but a modular, configurable ERP platform.
- **How operations connect**: Sales, Purchase, Inventory, HR, Projects, and Finance flowing into one synchronized data core.
- **Product truth**: Standalone or combined **ERPGen Invoice** and **ERPGen POS**, grounded in actual business operations.
- **Business contexts**: Restaurant, Barbershop, Supermarket, and Laundry.
- **Commercial clarity**: Standard ready-to-run **ERP Lite** vs tailored **ERP Pro**.

---

## 2. Motion Identities by Section

To eliminate repetitive "tilt-and-fade" fatigue, each major section is assigned a unique motion identity:

| Section | Motion Identity | Core Technique | Narrative Purpose |
| :--- | :--- | :--- | :--- |
| **01. Hero** | Spatial Depth & Dimensional Hub | Line masking, 3D layered plane, ambient glow scrub | Establishes the ERPGen product ecosystem |
| **02. Hero → ERP Story Handoff** | Spatial Morph & Element Travel | Section bridge, continuous scale handoff | Connects Hero world to the operational story |
| **03. What is ERPGen?** | Network Genesis & Node Formation | Radial vector expansion, node alignment | Shows the 6 core business operations emerging |
| **04. Connected System** | Convergent Stream Engine | Pinned 4-step timeline, SVG live data streams | Proves how disconnected streams unite into one core |
| **05. Products Ecosystem** | Dual Pillar Unfolding | Document fold (Invoice) & touch grid (POS) | Introduces Invoice & POS as modular solutions |
| **06. POS Deep Dive** | 3-Layer Spatial Unstacking | Layer separation (Base Terminal → Session → Sync) | Communicates speed, hardware, and live balance |
| **07. Business Contexts** | Contextual Exploration Slider | Directional horizontal glide, active spotlight | Shows POS tailored for Restaurant, Barbershop, Supermarket, Laundry |
| **08. ERP Tiers (Lite vs Pro)** | Dimensional Solution Shift | Perspective card flip & comparison morph | Clearly contrasts Standard vs Tailored without fake pricing |
| **09. Why ERPGen** | Editorial Typographic Reveal | Masked text stagger, tactile benefit hover | Highlights architectural advantages with clarity |
| **10. Contact & Consultation** | Calm Convergent Settle | Soft spatial rise, interactive consultation card | Effortless transition to human technical conversation |

---

## 3. Full-Page Motion Storyboard (0% → 100% Scroll Blueprint)

### `0% – 12%`: The Living ERPGen Hub (Hero)
- **Visual State**: Headline line-masked text reveals upward. Right side displays the dimensional ERPGen Living Hub. The 6 operational nodes pulse gently around the central core.
- **Scroll Progression**:
  - `0%`: Hero resting state. Ambient subtle mouse tilt active on desktop.
  - `6%`: Headline and CTAs gently recede upward (`y: -30px, opacity: 0.6`).
  - `12%`: The Product-World Hub scales slightly (`scale: 1.04`), tilts forward, and begins traveling toward the center axis.

### `12% – 22%`: Spatial Handoff → What is ERPGen?
- **Visual State**: The Hero Product Hub nodes transition into the 6 Core Operations Grid of "What is ERPGen".
- **Scroll Progression**:
  - `14%`: Hero background glides downward into a soft violet/emerald surface.
  - `18%`: The 6 operational nodes expand outward into their 6 respective category cards (Sales, Purchase, Inventory, HR, Projects, Finance).
  - `22%`: Headline "A configurable ERP platform that brings core business operations into one system" settles into place.

### `22% – 42%`: Connected System Convergence (Pinned Scene)
- **Visual State**: Pinned stage across 4 distinct dwell zones.
- **Scroll Progression**:
  - `24% – 28% (Step 1)`: Sales & Purchase nodes activate; data packets flow along SVG paths into the center.
  - `29% – 33% (Step 2)`: Inventory & Projects connect; stock deductions balance against procurement orders.
  - `34% – 38% (Step 3)`: HR & Finance ledgers synchronize; automated ledger records lock into place.
  - `39% – 42% (Step 4)`: Full convergence. All 6 beams ignite into the central ERPGen Platform Hub with a subtle radial pulse.

### `42% – 58%`: Products Ecosystem (Invoice & POS)
- **Visual State**: Central ERPGen Hub branches into two distinct product expressions: ERPGen Invoice & ERPGen POS.
- **Scroll Progression**:
  - `44%`: Left column unfolds ERPGen Invoice (structured tax calculations, PDF generation, customer profiles).
  - `48%`: Right column unfolds ERPGen POS (touch tiles, barcode scanning, split payments).
  - `52% – 58%`: Interactive Lifecycle Simulator allows testing between Invoice & POS workspaces with realistic product workflows.

### `58% – 70%`: POS Architecture — 3-Layer Spatial Unstacking
- **Visual State**: Detailed look inside ERPGen POS terminal architecture.
- **Scroll Progression**:
  - `60%`: The POS Register Terminal canvas rises into view.
  - `64%`: Active Order & Settlement Card unstacks and floats to the bottom-right plane (`translateZ: 30px`).
  - `68%`: Hardware & Thermal Receipt chip separates to the top-left anchor (`translateZ: 40px`).

### `70% – 82%`: POS Business Types (Directional Exploration)
- **Visual State**: Pinned horizontal showcase of the 4 approved business types.
- **Scroll Progression**:
  - `72%`: Restaurant POS (Table layouts, split checks, kitchen orders).
  - `75%`: Barbershop POS (Staff queues, chair appointments, service catalog).
  - `78%`: Supermarket POS (High-speed barcode scanning, multi-lane cashiers).
  - `81%`: Laundry POS (Garment tagging, drop-off, washing stages, pickup).
  - *RTL Rule*: Sliders advance from Right to Left when in Arabic mode.

### `82% – 92%`: ERP Tiers (Standard Lite vs Tailored Pro)
- **Visual State**: Resolution of the product story into actionable configurations.
- **Scroll Progression**:
  - `84%`: Tabbed switcher smoothly morphs between ERP Lite (standard turnkey) and ERP Pro (custom workflows).
  - `88%`: Interactive comparison matrix highlights deployment, customization, and multi-warehouse parameters.
  - `92%`: Direct CTAs route seamlessly to consultation with pre-filled tier parameters.

### `92% – 100%`: Technical Engagement & Footer
- **Visual State**: Calm settlement into the direct engineering consultation interface.
- **Scroll Progression**:
  - `94%`: Left contact channels (WhatsApp, Email, Direct Phone) settle into a clean card.
  - `97%`: Functional consultation form with returning visitor autofill renders crisply.
  - `100%`: Premium brand footer concludes the experience with live system status.

---

## 4. Responsive & Accessibility Blueprint

| Viewport | Screen Width | Animation Strategy | Pinned Story Handling |
| :--- | :--- | :--- | :--- |
| **Mobile S/M** | 375px – 430px | Zero 3D rotation, composite-only transforms (Y, opacity), disabled mouse tracking | Compact swipeable cards or vertical scrub; header-safe offset |
| **Tablet** | 768px – 1024px | Moderate scale transitions, simplified SVG paths | Pinned storytelling with reduced pin-scroll distance (1.5x innerHeight) |
| **Desktop** | 1280px – 1920px | Full spatial depth, subtle quickTo mouse tilt, layered Z-depth chips, multi-stage pinning | Full pinned storytelling (2.2x innerHeight), complete SVG particle streams |
| **Reduced Motion** | Any | All elements render immediately at resting state (opacity 1, scale 1, y 0). Lenis disabled. | Pinning replaced with natural stacked layout; zero scrub latency |

---

## 5. Arabic / RTL Motion & Layout Architecture

1. **Directional Flow Inversion**:
   - In LTR: Horizontal motion travels left (`xPercent: -75`).
   - In RTL: Horizontal motion travels right (`xPercent: 75`).
2. **Typography**:
   - Primary Arabic typography: **IBM Plex Sans Arabic** / **Tajawal** imported via Google Fonts.
   - Preserves balanced line-heights for Arabic diacritics.
3. **Icons & Badges**:
   - Directional arrows flip (`rtl:rotate-180`).
   - Universal status dots and logos remain unmirrored.
