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
  const wrapperRef    = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const phoneFrameRef = useRef<HTMLDivElement>(null)
  const leftRef       = useRef<HTMLDivElement>(null)   // gauche 18–45%
  const rightRef      = useRef<HTMLDivElement>(null)   // droite 50–80%

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
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img,
        (cw - img.naturalWidth  * s) / 2,
        (ch - img.naturalHeight * s) / 2,
        img.naturalWidth  * s,
        img.naturalHeight * s,
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

      // Frame scrub
      triggers.push(ScrollTrigger.create({
        trigger: c, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate(self) {
          const idx = Math.min(Math.floor(self.progress * FRAME_COUNT), FRAME_COUNT - 1)
          if (idx !== currentFrame) { currentFrame = idx; drawFrame(idx) }
        },
      }))

      // Phone frame : 13–17%
      push(gsap.fromTo(phoneFrameRef.current, { opacity: 0, scale: 0.97 }, {
        opacity: 1, scale: 1, ease: 'none',
        scrollTrigger: { trigger: c, start: '13% top', end: '17% top', scrub: 1 },
      }))

      // ── Gauche : 0.18 → 0.45 ────────────────────────────────────────
      slideIn (leftRef.current, -24, '18% top', '22% top')
      slideOut(leftRef.current, -24, '41% top', '45% top')

      // ── Droite : 0.50 → 0.80 ────────────────────────────────────────
      slideIn (rightRef.current, 24, '50% top', '54% top')
      slideOut(rightRef.current, 24, '76% top', '80% top')

      // VideoPhone s'efface à 95–100%
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
    fontSize: '11px', color: 'rgba(194,155,109,0.75)',
    letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.9rem',
  }
  const titleStyle: React.CSSProperties = {
    color: '#F9F9F9', textTransform: 'uppercase',
    fontSize: '32px', lineHeight: 1.2,
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: '14px', color: 'rgba(249,249,249,0.58)', lineHeight: 1.9,
  }
  const divStyle: React.CSSProperties = {
    width: '1.5rem', height: '1px',
    backgroundColor: 'rgba(194,155,109,0.4)', margin: '0.8rem 0',
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 5 }}
    >
      {/* ── Panneau gauche — Estate — 18–45% ─────────────────────── */}
      <div
        ref={leftRef}
        className="absolute opacity-0"
        style={{
          left:        '2%',
          maxWidth:    '280px',
          paddingLeft: '1rem',
          overflow:    'hidden',
          pointerEvents: 'none',
        }}
      >
        <p className="font-body font-light" style={labelStyle}>
          {t.estate.label}
        </p>
        <h2 className="font-display text-xl leading-tight" style={titleStyle}>
          {t.estate.heading[0]}<br />{t.estate.heading[1]}
        </h2>
        <div style={divStyle} />
        <ul className="flex flex-col" style={{ gap: '0.5rem' }}>
          {sd.estate.items.map((item, i) => (
            <li key={i} className="font-body font-light flex items-start gap-1.5" style={bodyStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Cadre iPhone 320 × 650 px ────────────────────────────── */}
      <div
        ref={phoneFrameRef}
        className="relative flex-shrink-0 opacity-0"
        style={{
          width: '320px', height: '650px', borderRadius: '40px',
          backgroundColor: '#080808',
          border: '2px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 z-10"
          style={{
            transform: 'translateX(-50%)',
            width: '96px', height: '28px',
            backgroundColor: '#080808', borderRadius: '0 0 20px 20px',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Panneau droite — Lifestyle — 50–80% ──────────────────── */}
      <div
        ref={rightRef}
        className="absolute right-[2%] opacity-0"
        style={{
          maxWidth:     '220px',
          paddingRight: '1rem',
          overflow:     'hidden',
          pointerEvents: 'none',
        }}
      >
        <p className="font-body font-light" style={labelStyle}>
          {t.lifestyle.label}
        </p>
        <h2 className="font-display text-xl leading-tight" style={titleStyle}>
          {t.lifestyle.heading[0]}<br />{t.lifestyle.heading[1]}
        </h2>
        <div style={divStyle} />
        <ul className="flex flex-col" style={{ gap: '0.5rem' }}>
          {sd.lifestyle.items.map((item, i) => (
            <li key={i} className="font-body font-light flex items-start gap-1.5" style={bodyStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
