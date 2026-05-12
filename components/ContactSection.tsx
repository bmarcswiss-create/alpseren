'use client'

import { useState } from 'react'
import { LogoComplet } from '@/components/Logo'
import { translations, type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
}

export default function ContactSection({ lang }: Props) {
  const t = translations[lang].contact
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState(false)

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
        className="contact-card"
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
          05 / CONTACT
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
              fontSize:      '13px',
              letterSpacing: '0.05em',
              color:         'rgba(194,155,109,0.8)',
              padding:       '3rem 0',
            }}
          >
            Votre message a été envoyé.
          </p>
        ) : (
          <form onSubmit={async e => {
            e.preventDefault()
            setSending(true)
            setError(false)
            try {
              const res = await fetch('/api/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(form),
              })
              if (!res.ok) throw new Error()
              setSent(true)
            } catch {
              setError(true)
            } finally {
              setSending(false)
            }
          }}>
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
              disabled={sending}
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
                cursor:         sending ? 'default' : 'pointer',
                opacity:        sending ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.85)' }}
              onMouseLeave={e => { if (!sending) e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.4)' }}
            >
              {sending ? '...' : t.send}
            </button>

            {error && (
              <p style={{
                textAlign:   'center',
                marginTop:   '1.5rem',
                fontFamily:  'var(--font-montserrat), sans-serif',
                fontWeight:  300,
                fontSize:    '12px',
                color:       'rgba(249,249,249,0.5)',
                letterSpacing: '0.02em',
              }}>
                Une erreur est survenue.
              </p>
            )}
          </form>
        )}

        {/* Footer */}
        <footer className="contact-footer" style={{ marginTop: '5rem', textAlign: 'center' }}>
          <LogoComplet
            variant="light"
            className="footer-logo-img"
            style={{ width: '120px', height: 'auto', margin: '0 auto', opacity: 0.55 }}
          />
          <p
            className="footer-text-sm"
            style={{
              fontFamily:    'var(--font-montserrat), sans-serif',
              fontWeight:    300,
              fontSize:      '9px',
              color:         'rgba(249,249,249,0.25)',
              letterSpacing: '0.04em',
              marginTop:     '1rem',
            }}
          >
            © 2026 ALPSEREN. Tous droits réservés.
          </p>
          <p
            className="footer-text-sm"
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
