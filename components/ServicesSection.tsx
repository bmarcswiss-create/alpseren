'use client'

import { translations, type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
}

export default function ServicesSection({ lang }: Props) {
  const t = translations[lang].servicesDetail

  return (
    <section className="relative w-full py-24 px-8 md:px-20" style={{ zIndex: 40 }}>

      {/* Gradient de transition depuis le scroll vidéo */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(13,13,11,0) 0%, rgba(13,13,11,0.3) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Colonnes + séparateur vertical */}
        <div className="flex items-stretch gap-0">

          {/* Colonne gauche — Estate Management */}
          <div className="flex-1 pr-8 md:pr-12">
            <p
              className="font-body font-light tracking-ultra uppercase mb-8"
              style={{ fontSize: '0.62rem', color: 'rgba(194,155,109,0.7)' }}
            >
              03 / Estate Management
            </p>
            <ul className="flex flex-col" style={{ gap: '0.9rem' }}>
              {t.estate.items.map((item, i) => (
                <li
                  key={i}
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '13px', color: 'rgba(249,249,249,0.6)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Séparateur vertical + mention technologie */}
          <div
            className="flex flex-col items-center flex-shrink-0"
            style={{ width: '1px', gap: '0' }}
          >
            <div className="flex-1 w-px" style={{ backgroundColor: 'rgba(194,155,109,0.18)' }} />
            <p
              className="font-body font-light tracking-ultra"
              style={{
                fontSize:      '10px',
                color:         'rgba(194,155,109,0.5)',
                writingMode:   'vertical-rl',
                textOrientation:'mixed',
                transform:     'rotate(180deg)',
                padding:       '2rem 0',
                whiteSpace:    'nowrap',
                letterSpacing: '0.25em',
              }}
            >
              — Interface client digitale —
            </p>
            <div className="flex-1 w-px" style={{ backgroundColor: 'rgba(194,155,109,0.18)' }} />
          </div>

          {/* Colonne droite — Lifestyle Services */}
          <div className="flex-1 pl-8 md:pl-12">
            <p
              className="font-body font-light tracking-ultra uppercase mb-8"
              style={{ fontSize: '0.62rem', color: 'rgba(194,155,109,0.7)' }}
            >
              04 / Lifestyle Services
            </p>
            <ul className="flex flex-col" style={{ gap: '0.9rem' }}>
              {t.lifestyle.items.map((item, i) => (
                <li
                  key={i}
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '13px', color: 'rgba(249,249,249,0.6)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
