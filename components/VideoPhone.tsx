'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { translations, type Lang } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 241
const FRAME_PATH  = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.webp`

interface Props { lang: Lang }

export default function VideoPhone({ lang }: Props) {
  const wrapperRef        = useRef<HTMLDivElement>(null)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const phoneFrameRef     = useRef<HTMLDivElement>(null)
  // 01 / 02 — textes courts
  const estateRef         = useRef<HTMLDivElement>(null)
  const lifestyleRef      = useRef<HTMLDivElement>(null)
  // 03 / 04 — listes détaillées
  const estateDetailRef   = useRef<HTMLDivElement>(null)
  const lifestyleDetailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    canvas.width  = 316
    canvas.height = 644

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT)
    let loadedCount  = 0
    let currentFrame = 0

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    function drawFrame(i: number) {
      const img = frames[i]
      if (!img?.complete || !img.naturalWidth) return
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img,
        (cw - img.naturalWidth  * scale) / 2,
        (ch - img.naturalHeight * scale) / 2,
        img.naturalWidth  * scale,
        img.naturalHeight * scale,
      )
    }

    const triggers: ScrollTrigger[] = []

    function push(tw: gsap.core.Tween) {
      if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
    }

    function slideIn(el: HTMLElement | null, x: number, start: string, end: string) {
      push(gsap.fromTo(el, { opacity: 0, x }, {
        opacity: 1, x: 0, ease: 'none',
        scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 },
      }))
    }
    function slideOut(el: HTMLElement | null, x: number, start: string, end: string) {
      push(gsap.fromTo(el, { opacity: 1, x: 0 }, {
        opacity: 0, x, ease: 'none',
        scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 },
      }))
    }

    function initScroll() {
      const c = document.getElementById('scroll-container')
      if (!c) return

      // ── Frame scrub ───────────────────────────────────────────────────
      triggers.push(ScrollTrigger.create({
        trigger: c, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate(self) {
          const idx = Math.min(Math.floor(self.progress * FRAME_COUNT), FRAME_COUNT - 1)
          if (idx !== currentFrame) { currentFrame = idx; drawFrame(idx) }
        },
      }))

      // ── Phone frame : apparaît 13–17% ────────────────────────────────
      push(gsap.fromTo(phoneFrameRef.current, { opacity: 0, scale: 0.97 }, {
        opacity: 1, scale: 1, ease: 'none',
        scrollTrigger: { trigger: c, start: '13% top', end: '17% top', scrub: 1 },
      }))

      // ── 01 / Estate Management — gauche — 18–33% ─────────────────────
      slideIn (estateRef.current,  -28, '18% top', '22% top')
      slideOut(estateRef.current,  -28, '29% top', '33% top')

      // ── 02 / Lifestyle Services — droite — 36–50% ────────────────────
      slideIn (lifestyleRef.current,  28, '36% top', '40% top')
      slideOut(lifestyleRef.current,  28, '46% top', '50% top')

      // ── 03 / Estate Management détaillé — gauche — 53–67% ────────────
      slideIn (estateDetailRef.current,  -28, '53% top', '57% top')
      slideOut(estateDetailRef.current,  -28, '63% top', '67% top')

      // ── 04 / Lifestyle Services détaillé — droite — 70–84% ───────────
      slideIn (lifestyleDetailRef.current,  28, '70% top', '74% top')
      slideOut(lifestyleDetailRef.current,  28, '80% top', '84% top')

      // ── VideoPhone s'efface à 95–100% (libère sections statiques) ────
      push(gsap.fromTo(wrapperRef.current, { opacity: 1 }, {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: c, start: '95% top', end: '100% top', scrub: 1 },
      }))
    }

    function loadOne(i: number) {
      const img  = new Image()
      const done = () => {
        loadedCount++
        if (i === 0 && img.complete && img.naturalWidth) drawFrame(0)
        if (loadedCount === FRAME_COUNT) initScroll()
      }
      img.onload  = done
      img.onerror = done
      img.src     = FRAME_PATH(i + 1)
      frames[i]   = img
    }

    for (let i = 0; i < 10; i++) loadOne(i)
    setTimeout(() => { for (let i = 10; i < FRAME_COUNT; i++) loadOne(i) }, 150)

    return () => { lenis.destroy(); triggers.forEach(t => t.kill()) }
  }, [])

  const t  = translations[lang]
  const sd = translations[lang].servicesDetail

  const labelStyle: React.CSSProperties = {
    fontSize: '0.62rem', color: 'rgba(194,155,109,0.75)',
    letterSpacing: '0.3em', textTransform: 'uppercase',
    marginBottom: '1rem',
  }
  const titleStyle: React.CSSProperties = {
    color: '#F9F9F9',
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: '13px', color: 'rgba(249,249,249,0.6)', lineHeight: 1.7,
  }
  const dividerStyle: React.CSSProperties = {
    width: '2rem', height: '1px',
    backgroundColor: 'rgba(194,155,109,0.4)', margin: '1rem 0',
  }
  const panelBase = 'absolute opacity-0'
  const leftPos   = 'left-8 md:left-14 lg:left-20'
  const rightPos  = 'right-8 md:right-14 lg:right-20'
  const maxW      = 'max-w-[220px] md:max-w-xs'

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 5 }}
    >
      {/* ── 01 Estate Management — gauche ────────────────────────── */}
      <div ref={estateRef}
        className={`${panelBase} ${leftPos} ${maxW}`}
        style={{ pointerEvents: 'none' }}
      >
        <p className="font-body font-light" style={labelStyle}>{t.estate.label}</p>
        <h2 className="font-display text-2xl md:text-3xl leading-tight" style={titleStyle}>
          {t.estate.heading[0]}<br />{t.estate.heading[1]}
        </h2>
        <div style={dividerStyle} />
        <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
          {t.estate.body}
        </p>
      </div>

      {/* ── 02 Lifestyle Services — droite ───────────────────────── */}
      <div ref={lifestyleRef}
        className={`${panelBase} ${rightPos} ${maxW}`}
        style={{ pointerEvents: 'none' }}
      >
        <p className="font-body font-light" style={labelStyle}>{t.lifestyle.label}</p>
        <h2 className="font-display text-2xl md:text-3xl leading-tight" style={titleStyle}>
          {t.lifestyle.heading[0]}<br />{t.lifestyle.heading[1]}
        </h2>
        <div style={dividerStyle} />
        <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
          {t.lifestyle.body}
        </p>
      </div>

      {/* ── 03 Estate Management détaillé — gauche ───────────────── */}
      <div ref={estateDetailRef}
        className={`${panelBase} ${leftPos} ${maxW}`}
        style={{ pointerEvents: 'none' }}
      >
        <p className="font-body font-light" style={labelStyle}>03 / Estate Management</p>
        <ul className="flex flex-col" style={{ gap: '0.6rem' }}>
          {sd.estate.items.map((item, i) => (
            <li key={i} className="font-body font-light flex items-start gap-2" style={bodyStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── 04 Lifestyle Services détaillé — droite ──────────────── */}
      <div ref={lifestyleDetailRef}
        className={`${panelBase} ${rightPos} ${maxW}`}
        style={{ pointerEvents: 'none' }}
      >
        <p className="font-body font-light" style={labelStyle}>04 / Lifestyle Services</p>
        <ul className="flex flex-col" style={{ gap: '0.6rem' }}>
          {sd.lifestyle.items.map((item, i) => (
            <li key={i} className="font-body font-light flex items-start gap-2" style={bodyStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Cadre iPhone 320 × 650 px ────────────────────────────── */}
      <div ref={phoneFrameRef}
        className="relative flex-shrink-0 opacity-0"
        style={{
          width: '320px', height: '650px', borderRadius: '40px',
          backgroundColor: '#080808',
          border: '2px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.5)',
        }}
      >
        <div className="absolute top-0 left-1/2 z-10" style={{
          transform: 'translateX(-50%)',
          width: '96px', height: '28px',
          backgroundColor: '#080808', borderRadius: '0 0 20px 20px',
        }} />
        <canvas ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
