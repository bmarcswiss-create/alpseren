'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations, type Lang } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

interface Props { lang: Lang }

function fade(el: HTMLElement | null, from: object, to: object, start: string, end: string) {
  if (!el) return
  gsap.fromTo(el, from, {
    ...to, ease: 'none',
    scrollTrigger: { trigger: '#scroll-container', start, end, scrub: 1 },
  })
}

export default function ScrollSections({ lang }: Props) {
  const t        = translations[lang]
  const philoRef = useRef<HTMLDivElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Philosophie : 8–14%
      fade(philoRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, '8% top',  '11% top')
      fade(philoRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: -18 }, '11% top', '14% top')

      // CTA Final : apparaît 87–91%, disparaît 97–100% (avant les sections statiques)
      fade(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, '87% top', '91% top')
      fade(ctaRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: -12 }, '97% top', '100% top')

      ScrollTrigger.create({
        trigger: '#scroll-container',
        start: '91% top', end: '97% top',
        onEnter:     () => { if (ctaRef.current) ctaRef.current.style.pointerEvents = 'auto' },
        onLeave:     () => { if (ctaRef.current) ctaRef.current.style.pointerEvents = 'none' },
        onEnterBack: () => { if (ctaRef.current) ctaRef.current.style.pointerEvents = 'auto' },
        onLeaveBack: () => { if (ctaRef.current) ctaRef.current.style.pointerEvents = 'none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Philosophie */}
      <div ref={philoRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="px-8 md:px-20 max-w-xl text-center">
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8"
            style={{ color: '#F9F9F9' }}>
            {t.philosophie.heading[0]}<br />{t.philosophie.heading[1]}
          </h2>
          <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: '#C29B6D' }} />
          <p className="font-body font-light text-sm leading-relaxed"
            style={{ color: 'rgba(249,249,249,0.62)' }}>
            {t.philosophie.body}
          </p>
        </div>
      </div>

      {/* CTA Final */}
      <div ref={ctaRef}
        className="fixed bottom-0 inset-x-0 z-30 flex flex-col items-center pb-14 pointer-events-none opacity-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.png" alt="ALPSEREN — Private Estate & Lifestyle"
          className="w-24 h-auto mb-4" style={{ opacity: 0.9 }} />
        <p className="font-body font-light text-xs tracking-ultra uppercase mb-4"
          style={{ color: 'rgba(249,249,249,0.38)' }}>
          PRIVATE ESTATE & LIFESTYLE
        </p>
        <a href="mailto:contact@alpseren.com"
          className="font-body font-light text-xs tracking-ultra uppercase pb-0.5 transition-colors duration-300"
          style={{ color: '#C29B6D', borderBottom: '1px solid rgba(194,155,109,0.4)' }}>
          contact@alpseren.com
        </a>
      </div>
    </>
  )
}
