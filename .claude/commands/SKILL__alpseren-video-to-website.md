---
name: alpseren-video-to-website
description: Expérience scroll-driven vidéo pour ALPSEREN. Transforme 241 frames WebP en expérience cinématique pilotée par le scroll. Next.js 16 + Tailwind v4 + GSAP + Lenis.
---

Lire **`alpseren-frontend-design`** en complément. Toutes les règles de marque s'appliquent ici.

---

## 0. Fichiers Confirmés

| Fichier | Détail |
|---|---|
| Vidéo source | Video_Alpseren_1_0.mp4 |
| Durée | 10 secondes |
| Frames | 241 frames à 24fps |
| Résolution source | 3856 × 2148px |
| Résolution extraite | 1920px de large |
| Format frames | WebP qualité 80 |
| Dossier | `/public/frames/frame_0001.webp` … `frame_0241.webp` |

---

## 1. Architecture Fichiers

```
alpseren-v2/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          ← page principale
├── components/
│   ├── Header.tsx         ← logo + nav + switcher FR/EN
│   ├── Hero.tsx           ← section initiale plein écran
│   ├── VideoCanvas.tsx    ← canvas scroll-driven
│   ├── ScrollSections.tsx ← sections superposées
│   └── ContactForm.tsx    ← formulaire de contact
├── lib/
│   └── translations.ts    ← textes FR + EN
└── public/
    ├── logo.png
    └── frames/            ← 241 fichiers WebP
```

---

## 2. Séquence Scroll

```
[0%]      HERO
          Logo ALPSEREN centré, fond #F9F9F9
          Tagline FR: "L'Excellence du Quotidien"
          Tagline EN: "Everyday Excellence"
          Scroll indicator "Découvrir ↓"

[0→8%]   TRANSITION
          Hero fade out
          Canvas circle-wipe (clip-path 0% → 75%)

[8→100%] CANVAS SCROLL-DRIVEN
          241 frames défilent avec le scroll
          Vue aérienne descendante sur propriété de nuit

[15→30%] Section Estate Management (gauche)
          Fond texte : rgba(45,41,38,0.82) sur mobile
          Animation : fade-up

[35→50%] Section Lifestyle Services (droite)
          Animation : slide-left

[55→70%] Overlay sombre #2D2926 (opacity 0.88)
          Marquee : "ESTATE MANAGEMENT · LIFESTYLE SERVICES · ALPSEREN ·"
          Opacity marquee : 0.08

[72→88%] Section Contact (centré)
          Formulaire : Nom / Email / Message / Envoyer
          Animation : fade-up

[90→100%] CTA Final (persist)
           Logo + PRIVATE ESTATE & LIFESTYLE
           contact@alpseren.com
           Ne disparaît jamais
```

---

## 3. Contenu Sections Bilingue

### Estate Management
```
FR:
Label   : 01 / Estate Management
Heading : Votre Résidence,
          Notre Vigilance
Body    : Ménage, jardinage, coordination des prestataires.
          Votre propriété entretenue à la perfection, chaque jour.

EN:
Label   : 01 / Estate Management
Heading : Your Residence,
          Our Vigilance
Body    : Housekeeping, gardening, contractor coordination.
          Your property maintained to perfection, every day.
```

### Lifestyle Services
```
FR:
Label   : 02 / Lifestyle Services
Heading : Chaque Détail,
          Pris en Charge
Body    : Soins aux animaux, transport de chevaux, services
          sur-mesure. Votre quotidien, simplifié.

EN:
Label   : 02 / Lifestyle Services
Heading : Every Detail,
          Taken Care Of
Body    : Animal care, horse transport, bespoke services.
          Your daily life, simplified.
```

### Formulaire Contact
```
FR:
Label   : 03 / Contact
Fields  : Prénom & Nom / Email / Message
Button  : Envoyer
Email   : contact@alpseren.com

EN:
Label   : 03 / Contact
Fields  : Full Name / Email / Message
Button  : Send
Email   : contact@alpseren.com
```

---

## 4. VideoCanvas.tsx — Logique Scroll

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 241
const FRAME_PATH = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.webp`

export default function VideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT)
    let loadedCount = 0
    let currentFrame = 0

    // Lenis connecté à GSAP
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawFrame(index: number) {
      const img = frames[index]
      if (!img) return
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth  * scale
      const dh = img.naturalHeight * scale
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function initScroll() {
      const container = document.getElementById('scroll-container')!
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate(self) {
          const index = Math.min(
            Math.floor(self.progress * FRAME_COUNT),
            FRAME_COUNT - 1
          )
          if (index !== currentFrame) {
            currentFrame = index
            requestAnimationFrame(() => drawFrame(currentFrame))
          }
        }
      })
    }

    function loadOne(i: number) {
      const img = new Image()
      img.onload = () => {
        frames[i] = img
        loadedCount++
        if (loadedCount === FRAME_COUNT) initScroll()
      }
      img.src = FRAME_PATH(i + 1)
    }

    // Phase 1 : 10 premières frames immédiatement
    for (let i = 0; i < 10; i++) loadOne(i)
    // Phase 2 : reste en arrière-plan
    setTimeout(() => {
      for (let i = 10; i < FRAME_COUNT; i++) loadOne(i)
    }, 150)

    return () => {
      lenis.destroy()
      ScrollTrigger.killAll()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
```

---

## 5. Règles Spécifiques

| Générique | ALPSEREN |
|---|---|
| Couleurs libres | #F9F9F9 / #2D2926 / #C29B6D uniquement |
| Typo libre | Cinzel + Montserrat Light |
| Hero heading 12rem+ | 5–7rem — luxe discret |
| Marquee visible | opacity 0.08 — subliminal |
| Overlay sombre | #2D2926 à 0.88, jamais #000000 |
| CTA bouton | Lien texte + underline #C29B6D |
| Stats | Retirées — pas de chiffres validés |
| One-page | Oui — tout sur une seule page |

---

## 6. Checklist Finale

- [ ] 241 frames dans /public/frames/
- [ ] Lenis importé depuis 'lenis' (pas @studio-freight/lenis)
- [ ] GSAP ScrollTrigger connecté à Lenis
- [ ] Canvas fixed, z-index 0
- [ ] Sections en position absolute sur le canvas
- [ ] Overlay #2D2926, jamais #000000
- [ ] Marquee opacity 0.08
- [ ] CTA final persist — ne disparaît jamais
- [ ] Formulaire : Nom / Email / Message uniquement
- [ ] Bilingue FR/EN dans lib/translations.ts
- [ ] Mobile : texte avec fond rgba(45,41,38,0.82)
