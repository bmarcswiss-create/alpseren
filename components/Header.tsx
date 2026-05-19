'use client'

import { type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Header({ lang, setLang }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-7">
      <span
        className="header-logo-text"
        style={{
          fontFamily:    'var(--f-display)',
          fontSize:      '11px',
          letterSpacing: 'var(--track-logo)',
          textTransform: 'uppercase',
          color:         'var(--cream-50)',
        }}
      >
        ALPSEREN
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setLang('fr')}
          className="header-lang-btn"
          style={{
            fontFamily:    'var(--f-system)',
            fontWeight:    500,
            fontSize:      '11px',
            letterSpacing: 'var(--track-label)',
            textTransform: 'uppercase',
            color:         lang === 'fr' ? 'var(--cream)' : 'var(--cream-38)',
            transition:    'color 0.3s ease',
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            padding:       0,
          }}
          onMouseEnter={e => { if (lang !== 'fr') e.currentTarget.style.color = 'var(--cream-72)' }}
          onMouseLeave={e => { if (lang !== 'fr') e.currentTarget.style.color = 'var(--cream-38)' }}
        >
          FR
        </button>
        <span style={{ color: 'var(--rule-edge)', fontSize: '11px', userSelect: 'none' }}>|</span>
        <button
          onClick={() => setLang('en')}
          className="header-lang-btn"
          style={{
            fontFamily:    'var(--f-system)',
            fontWeight:    500,
            fontSize:      '11px',
            letterSpacing: 'var(--track-label)',
            textTransform: 'uppercase',
            color:         lang === 'en' ? 'var(--cream)' : 'var(--cream-38)',
            transition:    'color 0.3s ease',
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            padding:       0,
          }}
          onMouseEnter={e => { if (lang !== 'en') e.currentTarget.style.color = 'var(--cream-72)' }}
          onMouseLeave={e => { if (lang !== 'en') e.currentTarget.style.color = 'var(--cream-38)' }}
        >
          EN
        </button>
      </div>
    </header>
  )
}
