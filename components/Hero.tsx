'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoComplet, LogoNom } from '@/components/Logo'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  lang: unknown
}

export default function Hero({ }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', delay: 0.1 }
    )

    gsap.to(el, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: '10% top',
        scrub: 1,
        onLeave:     () => { el.style.pointerEvents = 'none' },
        onEnterBack: () => { el.style.pointerEvents = 'auto' },
      },
    })
  }, [])

  return (
    <div
      ref={heroRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45,41,38,0.52)' }} />

      <div
        ref={logoRef}
        className="relative"
        style={{ opacity: 0 }}
      >
        {/* Desktop : logo complet avec baseline */}
        <LogoComplet
          variant="light"
          className="hidden sm:block w-[420px]"
          style={{ maxWidth: '60vw' }}
        />
        {/* Mobile : logo + nom sans baseline */}
        <LogoNom
          variant="light"
          className="block sm:hidden w-[260px]"
          style={{ maxWidth: '72vw' }}
        />
      </div>
    </div>
  )
}
