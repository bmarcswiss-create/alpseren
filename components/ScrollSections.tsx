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
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0"
      style={{ padding: '0 2rem' }}
    >
      <p style={{
        maxWidth:    '620px',
        margin:      '0 auto',
        fontFamily:  'var(--font-montserrat), sans-serif',
        fontWeight:  300,
        fontSize:    '17px',
        lineHeight:  2.0,
        color:       '#F9F9F9',
        textAlign:   'center',
        textShadow:  '0 1px 20px rgba(0,0,0,0.8)',
      }}>
        {t.philosophie.body}
      </p>
    </div>
  )
}
