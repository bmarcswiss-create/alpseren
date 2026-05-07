'use client'

import { useState } from 'react'
import Image from 'next/image'
import { translations, type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
}

export default function ContactSection({ lang }: Props) {
  const t = translations[lang].contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width:          '100%',
    background:     'transparent',
    border:         'none',
    borderBottom:   '1px solid rgba(249,249,249,0.5)',
    padding:        '1rem 0',
    color:          '#F9F9F9',
    fontFamily:     'var(--font-montserrat), sans-serif',
    fontWeight:     300,
    fontSize:       '13px',
    letterSpacing:  '0.05em',
    marginBottom:   '2rem',
    outline:        'none',
    display:        'block',
  }

  return (
    <section
      style={{
        position:       'relative',
        zIndex:         40,
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingTop:     '6rem',
      }}
    >
      <div
        style={{
          maxWidth:       '480px',
          width:          '100%',
          margin:         '0 auto',
          padding:        '3rem 2.5rem',
          background:     'rgba(13,13,11,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius:   '2px',
        }}
      >
        {/* Label */}
        <p
          style={{
            textAlign:     'center',
            fontFamily:    'var(--font-montserrat), sans-serif',
            fontWeight:    300,
            fontSize:      '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         'rgba(194,155,109,1)',
            marginBottom:  '3rem',
          }}
        >
          03 / CONTACT
        </p>

        {/* Séparateur */}
        <div
          style={{
            width:           '32px',
            height:          '1px',
            backgroundColor: 'rgba(194,155,109,0.3)',
            margin:          '0 auto 3rem',
          }}
        />

        {sent ? (
          <p
            style={{
              textAlign:     'center',
              fontFamily:    'var(--font-montserrat), sans-serif',
              fontWeight:    300,
              fontSize:      '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'rgba(249,249,249,0.4)',
              padding:       '3rem 0',
            }}
          >
            {t.sent}
          </p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
            <input
              type="text"
              required
              placeholder={t.name}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.85)')}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.5)')}
            />
            <input
              type="email"
              required
              placeholder={t.email}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.85)')}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.5)')}
            />
            <textarea
              required
              rows={4}
              placeholder={t.message}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="contact-input"
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.85)')}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.5)')}
            />

            <button
              type="submit"
              style={{
                display:        'block',
                margin:         '3rem auto 0',
                background:     'none',
                border:         'none',
                borderBottom:   '1px solid rgba(194,155,109,0.9)',
                paddingBottom:  '2px',
                color:          '#F9F9F9',
                fontFamily:     'var(--font-montserrat), sans-serif',
                fontWeight:     300,
                fontSize:       '11px',
                letterSpacing:  '0.3em',
                textTransform:  'uppercase',
                cursor:         'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.4)')}
            >
              {t.send}
            </button>
          </form>
        )}

        {/* Footer */}
        <footer style={{ marginTop: '5rem', textAlign: 'center' }}>
          <Image
            src="/logo-white.png"
            alt="ALPSEREN — Private Estate & Lifestyle"
            width={120}
            height={75}
            style={{ width: '120px', height: 'auto', margin: '0 auto', opacity: 0.55 }}
          />
          <p
            style={{
              fontFamily:    'var(--font-montserrat), sans-serif',
              fontWeight:    300,
              fontSize:      '9px',
              color:         'rgba(249,249,249,0.25)',
              letterSpacing: '0.04em',
              marginTop:     '1rem',
            }}
          >
            © 2025 ALPSEREN. Tous droits réservés.
          </p>
          <p
            style={{
              fontFamily:    'var(--font-montserrat), sans-serif',
              fontWeight:    300,
              fontSize:      '9px',
              color:         'rgba(249,249,249,0.25)',
              letterSpacing: '0.04em',
              marginTop:     '0.4rem',
            }}
          >
            Genève, Suisse
          </p>
        </footer>
      </div>
    </section>
  )
}
