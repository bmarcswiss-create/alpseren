'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { translations, type Lang } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

interface Props { lang: Lang }

export default function VideoPhone({ lang }: Props) {
  const wrapperRef      = useRef<HTMLDivElement>(null)
  const videoRef        = useRef<HTMLVideoElement>(null)
  const phoneFrameRef   = useRef<HTMLDivElement>(null)
  const leftBriefRef    = useRef<HTMLDivElement>(null)
  const rightBriefRef   = useRef<HTMLDivElement>(null)
  const leftDetailRef   = useRef<HTMLDivElement>(null)
  const rightDetailRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video   = videoRef.current!
    const isMobile = window.innerWidth <= 1023

    let lenisInstance: InstanceType<typeof Lenis> | null = null
    if (!isMobile) {
      lenisInstance = new Lenis()
      lenisInstance.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenisInstance!.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    const triggers: ScrollTrigger[] = []
    function reg(tw: gsap.core.Tween) {
      if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
    }

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

      // Video time scrub — maps scroll progress → video currentTime
      triggers.push(ScrollTrigger.create({
        trigger: c, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate(self) {
          if (video.duration) video.currentTime = self.progress * video.duration
        },
      }))

      if (!isMobile) {
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
      }

      // VideoPhone s'efface 80–90% — révèle ContactSection
      reg(gsap.fromTo(wrapperRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none',
          scrollTrigger: { trigger: c, start: '80% top', end: '90% top', scrub: 1 } }
      ))
    }

    // Pause immediately — scrubbing drives playback manually
    video.pause()
    if (video.readyState >= 3) {
      initScroll()
    } else {
      video.addEventListener('canplaythrough', initScroll, { once: true })
    }

    return () => { lenisInstance?.destroy(); triggers.forEach(t => t.kill()) }
  }, [])

  const t  = translations[lang]
  const sd = translations[lang].servicesDetail

  const labelStyle: React.CSSProperties = {
    fontSize: '11px', color: 'var(--beige)',
    letterSpacing: '0.20em', textTransform: 'uppercase', marginBottom: '0.9rem',
    fontFamily: 'var(--f-system)', fontWeight: 500,
  }
  const titleStyle: React.CSSProperties = {
    color: '#e8e1d2',
    fontSize: '64px', lineHeight: 1.15,
    fontFamily: 'var(--f-editorial)',
    fontWeight: 300,
    letterSpacing: '-0.01em',
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: '15px', color: 'var(--cream-72)', lineHeight: 1.85,
    fontFamily: 'var(--f-editorial)', fontWeight: 300,
  }
  const divStyle: React.CSSProperties = {
    width: '1.5rem', height: '1px',
    backgroundColor: 'var(--rule)', margin: '0.85rem 0',
  }
  const listItemStyle: React.CSSProperties = {
    fontSize: '15px', color: 'var(--cream-72)', lineHeight: 1.8,
    fontFamily: 'var(--f-editorial)', fontWeight: 300,
    display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
  }

  const panelBase = {
    position:             'absolute' as const,
    maxWidth:             '300px',
    padding:              '1.75rem 1.5rem',
    background:           'rgba(20,17,14,0.45)',
    backdropFilter:       'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    borderRadius:         '12px',
    border:               '1px solid rgba(232,225,210,.07)',
    overflow:             'hidden',
    pointerEvents:        'none' as const,
  }
  const leftPanel  = { ...panelBase, left:  '2%' }
  const rightPanel = { ...panelBase, right: '2%' }

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
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
              <span style={{ color: 'rgba(194,156,109,0.8)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
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
              <span style={{ color: 'rgba(194,156,109,0.8)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
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
        <div className="phone-notch" style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          width: '96px', height: '28px',
          backgroundColor: '#080808', borderRadius: '0 0 20px 20px',
        }} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          poster="/phone-poster.jpg"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/phone-animation.webm" type="video/webm" />
          <source src="/phone-animation.mp4"  type="video/mp4"  />
        </video>
      </div>
    </div>
  )
}
