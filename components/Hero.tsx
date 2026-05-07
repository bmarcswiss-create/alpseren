'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  lang: unknown // conservé pour compatibilité page.tsx
}

export default function Hero({ }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    // Entrée — fadeInUp logo
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', delay: 0.1 }
    )

    // Disparition au scroll (0 → 8 %)
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
      {/* Overlay sombre */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45,41,38,0.52)' }} />

      {/* Logo seul — centré */}
      <Image
        ref={logoRef}
        src="/logo-white.png"
        alt="ALPSEREN — Private Estate & Lifestyle"
        width={500}
        height={300}
        priority
        className="relative w-[500px] h-auto"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
