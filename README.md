# ICARUS Debate Academy — Website

A premium cinematic 3D website for ICARUS Debate Academy built with:

- **Next.js 14** (App Router)
- **React Three Fiber** + **Drei** — 3D Icarus character scene
- **@react-three/postprocessing** — Bloom, Vignette, Depth of Field
- **Framer Motion** — UI animations and transitions
- **GSAP ScrollTrigger** — Scroll-driven reveals
- **Lenis** — Smooth inertia scroll
- **Tailwind CSS** — Cinematic dark design system

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## Architecture

```
app/
├── layout.tsx          # Root layout (fonts, metadata)
├── page.tsx            # Main page (composes all sections)
└── globals.css         # Design tokens, utilities, typography

components/
├── 3d/
│   ├── IcarusScene.tsx       # R3F Canvas — main scene wrapper
│   ├── IcarusCharacter.tsx   # 3D Icarus figure (geometry groups)
│   ├── FloatingParticles.tsx # Gold dust particles
│   ├── SceneLighting.tsx     # Dynamic golden lighting rig
│   ├── CameraRig.tsx         # Scroll-driven camera follow
│   └── AtmosphereBackground.tsx  # Custom shader sky gradient
│
├── sections/
│   ├── Hero.tsx            # Fullscreen 3D hero with scroll flight
│   ├── About.tsx           # Academy intro + animated stats
│   ├── Mission.tsx         # Mission & Vision cards + quote
│   ├── CoreValues.tsx      # Six value cards with hover effects
│   ├── Programs.tsx        # Interactive program selector
│   ├── Achievements.tsx    # Animated counters + awards timeline
│   ├── Team.tsx            # Team profile grid
│   ├── Testimonials.tsx    # Auto-cycling quote carousel
│   ├── Contact.tsx         # Contact form + info
│   └── FinalCTA.tsx        # Cinematic closing call to action
│
├── ui/
│   ├── Navigation.tsx      # Fixed nav with mobile menu
│   ├── GlassCard.tsx       # Reusable glassmorphism card
│   ├── SectionTitle.tsx    # Cinematic section heading
│   └── CustomCursor.tsx    # Gold custom cursor
│
└── SmoothScroll.tsx        # Lenis smooth scroll provider

hooks/
└── useScrollProgress.ts    # Scroll tracking utilities

lib/
└── constants.ts            # Site data, colors, transitions
```

---

## 3D Icarus Character

The Icarus character is built entirely from Three.js geometry (no external `.glb` required):

- **Wings**: Custom `ShapeGeometry` with Bézier curves, doubled as glow layer
- **Body**: Cylinders, spheres, and box geometries grouped hierarchically  
- **Animation**: Wing groups rotate around their shoulder pivot (skeletal-style)
- **Scroll flight**: Smooth `lerp` interpolation — no physics engine

---

## Performance

- `AdaptiveDpr` — auto-reduces pixel ratio under load
- `PerformanceMonitor` — tracks FPS and adjusts DPR
- Particles count halved on mobile
- DOF and antialiasing disabled on mobile
- All 3D loaded client-side with `dynamic()` + `ssr: false`
- GSAP/ScrollTrigger registered only on client

---

## Customisation

**Colors** — edit `tailwind.config.ts` and `app/globals.css` CSS variables  
**Content** — edit the data arrays in each section component  
**3D model** — replace geometry in `IcarusCharacter.tsx` with a real `.glb` via `useGLTF` from Drei  
**Fonts** — change Google Fonts import in `globals.css`
