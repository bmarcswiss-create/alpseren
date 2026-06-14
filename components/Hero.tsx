'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoComplet } from '@/components/Logo'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  lang: unknown
}

export default function Hero({ }: Props) {
  const heroRef    = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

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

    gsap.to(chevronRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: '4% top',
        scrub: 1,
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
        {/* Desktop lg+ */}
        <LogoComplet
          variant="light"
          className="hidden lg:block"
          style={{ width: '300px', maxWidth: '40vw' }}
        />
        {/* Mobile / tablette < lg */}
        <LogoComplet
          variant="light"
          className="block lg:hidden"
          style={{ width: 'clamp(180px, 60vw, 280px)' }}
        />
      </div>

      <div
        ref={chevronRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--cream)',
          pointerEvents: 'none',
        }}
      >
        <svg
          width="56"
          height="22"
          viewBox="0 0 40 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block', animation: 'chevronBob 1.8s cubic-bezier(0.45,0,0.55,1) infinite' }}
        >
          <polyline points="2,2 20,12 38,2" />
        </svg>
      </div>
    </div>
  )
}
