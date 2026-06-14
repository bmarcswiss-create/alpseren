'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoSymbol } from '@/components/Logo'
import { type Lang } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Header({ lang, setLang }: Props) {
  const symbolRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(symbolRef.current, {
      opacity: 0.65,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: '10% top',
        scrub: 1,
      },
    })
  }, [])

  const scrollToContact = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo('#contact', { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>

      {/* Symbole seul — discret sur le hero, s'affirme au scroll */}
      <div ref={symbolRef} style={{ opacity: 0 }}>
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
        >
          <LogoSymbol style={{ width: '28px', height: '28px' }} />
        </button>
      </div>

      {/* Droite : capsule Contact + FR/EN */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* Capsule Contact */}
        <button
          onClick={scrollToContact}
          style={{
            fontFamily:    'var(--f-system)',
            fontWeight:    500,
            fontSize:      '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--cream)',
            background:    'transparent',
            border:        '1px solid var(--rule-edge)',
            borderRadius:  '999px',
            padding:       '8px 18px',
            cursor:        'pointer',
            transition:    'background 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background    = 'var(--cream-08)'
            e.currentTarget.style.borderColor   = 'rgba(232,225,210,.22)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background    = 'transparent'
            e.currentTarget.style.borderColor   = 'var(--rule-edge)'
          }}
        >
          Contact
        </button>

        {/* Séparateur */}
        <span style={{ width: '1px', height: '14px', backgroundColor: 'var(--rule-edge)', display: 'block' }} />

        {/* Sélecteur de langue */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setLang('fr')}
            className="header-lang-btn"
            style={{
              fontFamily:    'var(--f-system)',
              fontWeight:    lang === 'fr' ? 600 : 500,
              fontSize:      '13px',
              letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase',
              color:         lang === 'fr' ? 'var(--cream)' : 'var(--cream-72)',
              transition:    'color 0.3s ease',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       0,
            }}
            onMouseEnter={e => { if (lang !== 'fr') e.currentTarget.style.color = 'var(--cream)' }}
            onMouseLeave={e => { if (lang !== 'fr') e.currentTarget.style.color = 'var(--cream-72)' }}
          >
            FR
          </button>
          <span style={{ color: 'var(--rule-edge)', fontSize: '13px', userSelect: 'none' }}>|</span>
          <button
            onClick={() => setLang('en')}
            className="header-lang-btn"
            style={{
              fontFamily:    'var(--f-system)',
              fontWeight:    lang === 'en' ? 600 : 500,
              fontSize:      '13px',
              letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase',
              color:         lang === 'en' ? 'var(--cream)' : 'var(--cream-72)',
              transition:    'color 0.3s ease',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       0,
            }}
            onMouseEnter={e => { if (lang !== 'en') e.currentTarget.style.color = 'var(--cream)' }}
            onMouseLeave={e => { if (lang !== 'en') e.currentTarget.style.color = 'var(--cream-72)' }}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
