'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations, type Lang } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

interface Props { lang: Lang }

export default function ScrollSections({ lang }: Props) {
  const t        = translations[lang]
  const philoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(philoRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: '#scroll-container', start: '10% top', end: '13% top', scrub: 1 },
        }
      )
      gsap.to(philoRef.current, {
        opacity: 0, y: -16, ease: 'none',
        scrollTrigger: { trigger: '#scroll-container', start: '17% top', end: '20% top', scrub: 1 },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={philoRef}
      className="fixed inset-0 z-20 hidden lg:flex items-center justify-center pointer-events-none opacity-0"
      style={{ padding: '0 2rem' }}
    >
      <div style={{
        position:   'relative',
        padding:    '6rem 7rem',
        background: 'radial-gradient(ellipse at center, rgba(20,17,14,0.94) 0%, rgba(20,17,14,0) 78%)',
      }}>
        <p className="philo-text" style={{
          maxWidth:   '680px',
          margin:     '0 auto',
          fontFamily: 'var(--f-editorial)',
          fontWeight: 400,
          fontSize:   '32px',
          lineHeight: 1.85,
          color:      '#e8e1d2',
          textAlign:  'center',
        }}>
          {t.philosophie.body}
        </p>
      </div>
    </div>
  )
}
