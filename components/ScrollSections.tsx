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
      className="fixed inset-0 z-20 pointer-events-none opacity-0"
    >
      {/* Bande diagonale opaque — même sens que VideoPhone (droite plus basse) */}
      <div style={{
        position:  'absolute',
        inset:     0,
        background: 'var(--night)',
        clipPath:  'polygon(0 38%, 100% 28%, 100% 58%, 0 68%)',
      }} />
      {/* Texte centré dans la bande */}
      <div style={{
        position:        'absolute',
        inset:           0,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '0 2rem',
      }}>
        <p className="philo-text" style={{
          maxWidth:   '680px',
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
