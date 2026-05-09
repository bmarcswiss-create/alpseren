'use client'

import { translations, type Lang } from '@/lib/translations'

interface Props { lang: Lang }

export default function MobileServices({ lang }: Props) {
  const t  = translations[lang]
  const sd = translations[lang].servicesDetail

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'rgba(194,155,109,0.8)',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: '0.9rem',
    fontFamily: 'var(--font-montserrat), sans-serif',
    fontWeight: 300,
  }

  const titleStyle: React.CSSProperties = {
    color: '#F9F9F9',
    textTransform: 'uppercase',
    fontSize: '26px',
    lineHeight: 1.25,
    fontFamily: 'var(--font-cinzel), serif',
    marginBottom: '1rem',
  }

  const rulerStyle: React.CSSProperties = {
    width: '1.5rem',
    height: '1px',
    backgroundColor: 'rgba(194,155,109,0.4)',
    margin: '0.85rem auto',
  }

  const bodyStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'rgba(249,249,249,0.6)',
    lineHeight: 1.9,
    fontFamily: 'var(--font-montserrat), sans-serif',
    fontWeight: 300,
    whiteSpace: 'pre-line',
  }

  const listItemStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'rgba(249,249,249,0.6)',
    lineHeight: 1.8,
    fontFamily: 'var(--font-montserrat), sans-serif',
    fontWeight: 300,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '0.4rem',
  }

  const separator = (
    <div style={{ height: '1px', backgroundColor: 'rgba(194,155,109,0.4)', margin: '0 2rem' }} />
  )

  const blockCenter: React.CSSProperties = { textAlign: 'center', color: '#F9F9F9' }

  return (
    <div
      className="md:hidden"
      style={{ backgroundColor: '#1a1814' }}
    >
      {/* Bloc 1 — 01 / Estate Management */}
      <div style={{ ...blockCenter, padding: '4rem 1.5rem' }}>
        <p className="mobile-section-label" style={labelStyle}>{t.estate.label}</p>
        <h2 className="mobile-section-title" style={titleStyle}>
          {t.estate.heading[0]}<br />{t.estate.heading[1]}
        </h2>
        <div style={rulerStyle} />
        <p className="mobile-section-body" style={bodyStyle}>{t.estate.body}</p>
      </div>

      {separator}

      {/* Bloc 2 — 02 / Lifestyle Services */}
      <div style={{ ...blockCenter, padding: '4rem 1.5rem' }}>
        <p className="mobile-section-label" style={labelStyle}>{t.lifestyle.label}</p>
        <h2 className="mobile-section-title" style={titleStyle}>
          {t.lifestyle.heading[0]}<br />{t.lifestyle.heading[1]}
        </h2>
        <div style={rulerStyle} />
        <p className="mobile-section-body" style={bodyStyle}>{t.lifestyle.body}</p>
      </div>

      {separator}

      {/* Bloc 3 — 03 / Estate Management détaillé */}
      <div style={{ ...blockCenter, padding: '3rem 1.5rem' }}>
        <p className="mobile-section-label" style={labelStyle}>03 / Estate Management</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sd.estate.items.map((item, i) => (
            <li key={i} className="mobile-section-body" style={listItemStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {separator}

      {/* Bloc 4 — 04 / Lifestyle Services détaillé */}
      <div style={{ ...blockCenter, padding: '3rem 1.5rem' }}>
        <p className="mobile-section-label" style={labelStyle}>04 / Lifestyle Services</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sd.lifestyle.items.map((item, i) => (
            <li key={i} className="mobile-section-body" style={listItemStyle}>
              <span style={{ color: 'rgba(194,155,109,0.5)', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
