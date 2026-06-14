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

    const isMobile = window.innerWidth <= 1023

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT)
    let loadedCount  = 0
    let currentFrame = 0

    let lenisInstance: InstanceType<typeof Lenis> | null = null
    if (!isMobile) {
      lenisInstance = new Lenis()
      ;(window as any).__lenis = lenisInstance
      lenisInstance.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenisInstance!.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

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

    // Fade uniquement — pas de translation x sur les aplats plein écran
    function slideIn(el: HTMLElement | null, start: string, end: string) {
      reg(gsap.fromTo(el,
        { opacity: 0 },
        { opacity: 1, ease: 'none',
          scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 } }
      ))
    }
    function slideOut(el: HTMLElement | null, start: string, end: string) {
      reg(gsap.to(el,
        { opacity: 0, ease: 'none',
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

      if (!isMobile) {
        // Centrage GSAP du téléphone (position: absolute top:50% left:50%)
        gsap.set(phoneFrameRef.current, { xPercent: -50, yPercent: -50 })

        // Téléphone : apparaît 18–22%
        reg(gsap.fromTo(phoneFrameRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, ease: 'none',
            scrollTrigger: { trigger: c, start: '18% top', end: '22% top', scrub: 1 } }
        ))

        // Phone x — se décale vers la zone ardoise opposée au texte
        // 01 / 03 gauche → phone glisse à droite +180px
        reg(gsap.fromTo(phoneFrameRef.current, { x: 0 }, { x: 180, ease: 'none',
          scrollTrigger: { trigger: c, start: '20% top', end: '24% top', scrub: 1 } }))
        reg(gsap.fromTo(phoneFrameRef.current, { x: 180 }, { x: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '32% top', end: '35% top', scrub: 1 } }))

        // 02 / 04 droite → phone glisse à gauche -180px
        reg(gsap.fromTo(phoneFrameRef.current, { x: 0 }, { x: -180, ease: 'none',
          scrollTrigger: { trigger: c, start: '35% top', end: '39% top', scrub: 1 } }))
        reg(gsap.fromTo(phoneFrameRef.current, { x: -180 }, { x: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '47% top', end: '50% top', scrub: 1 } }))

        reg(gsap.fromTo(phoneFrameRef.current, { x: 0 }, { x: 180, ease: 'none',
          scrollTrigger: { trigger: c, start: '50% top', end: '54% top', scrub: 1 } }))
        reg(gsap.fromTo(phoneFrameRef.current, { x: 180 }, { x: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '62% top', end: '65% top', scrub: 1 } }))

        reg(gsap.fromTo(phoneFrameRef.current, { x: 0 }, { x: -180, ease: 'none',
          scrollTrigger: { trigger: c, start: '65% top', end: '69% top', scrub: 1 } }))
        reg(gsap.fromTo(phoneFrameRef.current, { x: -180 }, { x: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '77% top', end: '80% top', scrub: 1 } }))

        // 01 Estate brief — gauche — 20–35%
        slideIn (leftBriefRef.current,  '20% top', '24% top')
        slideOut(leftBriefRef.current,  '32% top', '35% top')

        // 02 Lifestyle brief — droite — 35–50%
        slideIn (rightBriefRef.current, '35% top', '39% top')
        slideOut(rightBriefRef.current, '47% top', '50% top')

        // 03 Estate détaillé — gauche — 50–65%
        slideIn (leftDetailRef.current,  '50% top', '54% top')
        slideOut(leftDetailRef.current,  '62% top', '65% top')

        // 04 Lifestyle détaillé — droite — 65–80%
        slideIn (rightDetailRef.current, '65% top', '69% top')
        slideOut(rightDetailRef.current, '77% top', '80% top')
      }

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

    return () => { lenisInstance?.destroy(); triggers.forEach(t => t.kill()) }
  }, [])

  const t  = translations[lang]
  const sd = translations[lang].servicesDetail

  const labelStyle: React.CSSProperties = {
    fontSize: '13px', color: 'var(--beige)',
    letterSpacing: '0.20em', textTransform: 'uppercase', marginBottom: '1.6rem',
    fontFamily: 'var(--f-system)', fontWeight: 500,
  }
  const titleStyle: React.CSSProperties = {
    color: '#e8e1d2',
    fontSize: '88px', lineHeight: 1.1,
    fontFamily: 'var(--f-editorial)',
    fontWeight: 300,
    letterSpacing: '-0.01em',
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: '28px', color: 'var(--cream)', lineHeight: 1.85,
    fontFamily: 'var(--f-editorial)', fontWeight: 300,
  }
  const divStyle: React.CSSProperties = {
    width: '1.5rem', height: '1px',
    backgroundColor: 'var(--rule)', margin: '1.2rem 0',
  }
  const listItemStyle: React.CSSProperties = {
    fontSize: '28px', color: 'var(--cream)', lineHeight: 1.7,
    fontFamily: 'var(--f-editorial)', fontWeight: 300,
    display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
  }

  // Aplat gauche : couvre 0–42% en haut, 0–35% en bas (diagonale descendante)
  const clipLeft: React.CSSProperties = {
    position: 'absolute', inset: 0,
    background: 'var(--night)',
    clipPath: 'polygon(0 0, 42% 0, 35% 100%, 0 100%)',
    pointerEvents: 'none',
    display: 'flex', alignItems: 'center',
  }
  // Aplat droite : miroir — couvre 58–100% en haut, 65–100% en bas
  const clipRight: React.CSSProperties = {
    position: 'absolute', inset: 0,
    background: 'var(--night)',
    clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 65% 100%)',
    pointerEvents: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
  }
  // Conteneur texte — largeur contrainte à l'intérieur de l'aplat
  const innerLeft: React.CSSProperties  = { padding: '0 1rem 0 3.5rem', maxWidth: '40vw' }
  const innerRight: React.CSSProperties = { padding: '0 3.5rem 0 1rem', maxWidth: '40vw' }

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0"
      style={{ zIndex: 5 }}
    >
      {/* 01 Estate brief — aplat gauche */}
      <div ref={leftBriefRef} className="phone-panel" style={{ ...clipLeft, opacity: 0 }}>
        <div style={innerLeft}>
          <p className="font-body font-light" style={labelStyle}>{t.estate.label}</p>
          <h2 className="font-display" style={titleStyle}>
            {t.estate.heading[0]}<br />{t.estate.heading[1]}
          </h2>
          <div style={divStyle} />
          <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
            {t.estate.body}
          </p>
        </div>
      </div>

      {/* 02 Lifestyle brief — aplat droite */}
      <div ref={rightBriefRef} className="phone-panel" style={{ ...clipRight, opacity: 0 }}>
        <div style={innerRight}>
          <p className="font-body font-light" style={labelStyle}>{t.lifestyle.label}</p>
          <h2 className="font-display" style={titleStyle}>
            {t.lifestyle.heading[0]}<br />{t.lifestyle.heading[1]}
          </h2>
          <div style={divStyle} />
          <p className="font-body font-light whitespace-pre-line" style={bodyStyle}>
            {t.lifestyle.body}
          </p>
        </div>
      </div>

      {/* 03 Estate détaillé — aplat gauche */}
      <div ref={leftDetailRef} className="phone-panel" style={{ ...clipLeft, opacity: 0 }}>
        <div style={innerLeft}>
          <p className="font-body font-light" style={labelStyle}>03 / Estate Management</p>
          {sd.estate.intro && (
            <p className="font-body font-light" style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
              {sd.estate.intro}
            </p>
          )}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sd.estate.items.map((item, i) => (
              <li key={i} className="font-body font-light" style={listItemStyle}>
                <span style={{ color: 'rgba(194,156,109,0.8)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 04 Lifestyle détaillé — aplat droite */}
      <div ref={rightDetailRef} className="phone-panel" style={{ ...clipRight, opacity: 0 }}>
        <div style={innerRight}>
          <p className="font-body font-light" style={labelStyle}>04 / Lifestyle Services</p>
          {sd.lifestyle.intro && (
            <p className="font-body font-light" style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
              {sd.lifestyle.intro}
            </p>
          )}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sd.lifestyle.items.map((item, i) => (
              <li key={i} className="font-body font-light" style={listItemStyle}>
                <span style={{ color: 'rgba(194,156,109,0.8)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cadre iPhone — position absolute, centré + décalé par GSAP */}
      <div
        ref={phoneFrameRef}
        className="phone-frame-container"
        style={{
          opacity: 0,
          position: 'absolute', top: '50%', left: '50%',
          width: '320px', height: '650px', borderRadius: '40px',
          backgroundColor: '#080808',
          border: '2px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.5)',
        }}
      >
        <div className="phone-notch" style={{
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
