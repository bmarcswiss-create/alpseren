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
  // 4 panneaux distincts — évite tout conflit d'état GSAP
  const leftBriefRef      = useRef<HTMLDivElement>(null)  // 20–35 %
  const rightBriefRef     = useRef<HTMLDivElement>(null)  // 35–50 %
  const leftDetailRef     = useRef<HTMLDivElement>(null)  // 50–65 %
  const rightDetailRef    = useRef<HTMLDivElement>(null)  // 65–80 %

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
        img.naturalWidth * s, img.naturalHeight * s,
      )
    }

    const triggers: ScrollTrigger[] = []
    function reg(tw: gsap.core.Tween) {
      if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
    }

    // ── slideIn : fromTo fixe l'état initial à opacity:0 ────────────────
    // ── slideOut : to évite d'écraser l'état initial ─────────────────────
    function slideIn(el: HTMLElement | null, x: number, start: string, end: string) {
      reg(gsap.fromTo(el,
        { opacity: 0, x },
        { opacity: 1, x: 0, ease: 'none',
          scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 } }
      ))
    }
    function slideOut(el: HTMLElement | null, x: number, start: string, end: string) {
      reg(gsap.to(el,
        { opacity: 0, x, ease: 'none',
          scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 } }
      ))
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

      // Téléphone : apparaît 18–22%
      reg(gsap.fromTo(phoneFrameRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, ease: 'none',
          scrollTrigger: { trigger: c, start: '18% top', end: '22% top', scrub: 1 } }
      ))

      // 01 Estate brief — gauche — 20–35%
      slideIn (leftBriefRef.current,  -28, '20% top', '24% top')
      slideOut(leftBriefRef.current,  -28, '32% top', '35% top')

      // 02 Lifestyle brief — droite — 35–50%
      slideIn (rightBriefRef.current,  28, '35% top', '39% top')
      slideOut(rightBriefRef.current,  28, '47% top', '50% top')

      // 03 Estate détaillé — gauche — 50–65%
      slideIn (leftDetailRef.current,  -28, '50% top', '54% top')
      slideOut(leftDetailRef.current,  -28, '62% top', '65% top')

      // 04 Lifestyle détaillé — droite — 65–80%
      slideIn (rightDetailRef.current,  28, '65% top', '69% top')
      slideOut(rightDetailRef.current,  28, '77% top', '80% top')

      // VideoPhone s'efface 80–90% — révèle ContactSection
      reg(gsap.fromTo(wrapperRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '80% top', end: '90% top', scrub: 1 } }
      ))
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
    fontSize: '11px', color: 'rgba(194,155,109,0.8)',
    letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.9rem',
  }
  const titleStyle: React.CSSProperties = {
    color: '#F9F9F9', textTransform: 'uppercase',
    fontSize: '32px', lineHeight: 1.2,
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: '14px', color: 'rgba(249,249,249,0.6)', lineHeight: 1.9,
  }
  const divStyle: React.CSSProperties = {
    width: '1.5rem', height: '1px',
    backgroundColor: 'rgba(194,155,109,0.4)', margin: '0.85rem 0',
  }
  const listItemStyle: React.CSSProperties = {
    fontSize: '13px', color: 'rgba(249,249,249,0.6)', lineHeight: 1.8,
    display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
  }

  const leftPanel = {
    position: 'absolute' as const,
    left: '2%', maxWidth: '280px', paddingLeft: '1rem',
    overflow: 'hidden', pointerEvents: 'none' as const,
  }
  const rightPanel = {
    position: 'absolute' as const,
    right: '2%', maxWidth: '280px', paddingRight: '1rem',
    overflow: 'hidden', pointerEvents: 'none' as const,
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 5 }}
    >
      {/* 01 Estate brief — gauche */}
      <div ref={leftBriefRef} className="phone-panel" style={{ ...leftPanel, opacity: 0 }}>
        <p className="font-body font-light" style={labelStyle}>{t.estate.label}</p>
        <h2 className="font-display" style={titleStyle}>
          {t.estate.heading[0]}<br />{t.estate.heading[1]}
        </h2>
        <div style={divStyle} />
        <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
          {t.estate.body}
        </p>
      </div>

      {/* 02 Lifestyle brief — droite */}
      <div ref={rightBriefRef} className="phone-panel" style={{ ...rightPanel, opacity: 0 }}>
        <p className="font-body font-light" style={labelStyle}>{t.lifestyle.label}</p>
        <h2 className="font-display" style={titleStyle}>
          {t.lifestyle.heading[0]}<br />{t.lifestyle.heading[1]}
        </h2>
        <div style={divStyle} />
        <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
          {t.lifestyle.body}
        </p>
      </div>

      {/* 03 Estate détaillé — gauche */}
      <div ref={leftDetailRef} className="phone-panel" style={{ ...leftPanel, opacity: 0 }}>
        <p className="font-body font-light" style={labelStyle}>03 / Estate Management</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sd.estate.items.map((item, i) => (
            <li key={i} className="font-body font-light" style={listItemStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 04 Lifestyle détaillé — droite */}
      <div ref={rightDetailRef} className="phone-panel" style={{ ...rightPanel, opacity: 0 }}>
        <p className="font-body font-light" style={labelStyle}>04 / Lifestyle Services</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sd.lifestyle.items.map((item, i) => (
            <li key={i} className="font-body font-light" style={listItemStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Cadre iPhone 320 × 650 px */}
      <div
        ref={phoneFrameRef}
        className="phone-frame-container"
        style={{
          opacity: 0, flexShrink: 0,
          width: '320px', height: '650px', borderRadius: '40px',
          backgroundColor: '#080808',
          border: '2px solid rgba(255,255,255,0.08)',
          overflow: 'hidden', position: 'relative',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          width: '96px', height: '28px',
          backgroundColor: '#080808', borderRadius: '0 0 20px 20px',
        }} />
        <canvas ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
