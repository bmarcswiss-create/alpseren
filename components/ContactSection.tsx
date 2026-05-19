'use client'

import { useEffect, useState } from 'react'
import { LogoComplet } from '@/components/Logo'
import { translations, type Lang } from '@/lib/translations'

// Clé publique reCAPTCHA v3 — à renseigner dans .env.local : NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface Props {
  lang: Lang
}

export default function ContactSection({ lang }: Props) {
  const t = translations[lang].contact
  const [form, setForm]       = useState({ name: '', email: '', phone: '', service: '', timeline: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return
    const scriptId = 'recaptcha-v3'
    if (document.getElementById(scriptId)) return
    const script = document.createElement('script')
    script.id  = scriptId
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [])

  const inputStyle: React.CSSProperties = {
    width:          '100%',
    background:     'rgba(232,225,210,.02)',
    border:         '1px solid rgba(232,225,210,.12)',
    borderRadius:   '10px',
    padding:        '12px 14px',
    color:          '#e8e1d2',
    fontFamily:     'var(--f-system)',
    fontWeight:     300,
    fontSize:       '13px',
    letterSpacing:  '0.05em',
    marginBottom:   '1.4rem',
    outline:        'none',
    display:        'block',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor:     'pointer',
    appearance: 'none',
  }

  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(194,156,109,.32)')
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(232,225,210,.12)')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      let recaptchaToken = ''
      if (RECAPTCHA_SITE_KEY && typeof window !== 'undefined' && window.grecaptcha) {
        await new Promise<void>(resolve => window.grecaptcha.ready(resolve))
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
      }
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, recaptchaToken }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
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
          background:     '#1d1916',
          backdropFilter: 'blur(10px)',
          borderRadius:   '12px',
          border:         '1px solid rgba(232,225,210,.12)',
          boxShadow:      '0 0 40px rgba(0,0,0,0.25)',
        }}
      >
        <p
          style={{
            textAlign:     'center',
            fontFamily:    'var(--f-system)',
            fontWeight:    500,
            fontSize:      '11px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color:         'rgba(194,155,109,1)',
            marginBottom:  '3rem',
          }}
        >
          05 / CONTACT
        </p>

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
              fontFamily:    'var(--f-system)',
              fontWeight:    300,
              fontSize:      '13px',
              letterSpacing: '0.05em',
              color:         'rgba(194,155,109,0.8)',
              padding:       '3rem 0',
            }}
          >
            {t.sent}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder={t.name}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
            <input
              type="email"
              required
              placeholder={t.email}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
            <input
              type="tel"
              placeholder={t.phone}
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
            <select
              required
              title={t.service}
              value={form.service}
              onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
              className="contact-input"
              style={selectStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            >
              <option value="" disabled style={{ background: '#1d1916' }}>{t.service}</option>
              <option value="Estate Management" style={{ background: '#1d1916' }}>{t.serviceOptions.estate}</option>
              <option value="Lifestyle Services" style={{ background: '#1d1916' }}>{t.serviceOptions.lifestyle}</option>
            </select>
            <input
              type="text"
              placeholder={t.timeline}
              value={form.timeline}
              onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
              className="contact-input"
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
            <textarea
              required
              rows={4}
              placeholder={t.message}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="contact-input"
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={focusOn}
              onBlur={focusOff}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <input
                type="checkbox"
                id="acceptance"
                required
                style={{ marginTop: '2px', accentColor: '#C29B6D', cursor: 'pointer', flexShrink: 0 }}
              />
              <label
                htmlFor="acceptance"
                style={{
                  fontFamily:    'var(--f-system)',
                  fontWeight:    300,
                  fontSize:      '11px',
                  letterSpacing: '0.04em',
                  color:         'var(--cream-50)',
                  lineHeight:    1.7,
                  cursor:        'pointer',
                }}
              >
                {t.acceptancePrefix}{' '}
                <a
                  href="/confidentialite"
                  style={{ color: 'rgba(194,155,109,0.7)', borderBottom: '1px solid rgba(194,155,109,0.3)' }}
                >
                  {t.acceptanceLink}
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={sending}
              style={{
                display:        'block',
                margin:         '0 auto',
                background:     '#c29c6d',
                border:         'none',
                borderRadius:   '999px',
                padding:        '13px 16px',
                color:          '#14110e',
                fontFamily:     'var(--f-system)',
                fontWeight:     500,
                fontSize:       '11px',
                letterSpacing:  '0.22em',
                textTransform:  'uppercase',
                cursor:         sending ? 'default' : 'pointer',
                opacity:        sending ? 0.5 : 1,
                transition:     'opacity 0.25s ease',
              }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = '0.82' }}
              onMouseLeave={e => { if (!sending) e.currentTarget.style.opacity = '1' }}
            >
              {sending ? '...' : t.send}
            </button>

            {error && (
              <p style={{
                textAlign:     'center',
                marginTop:     '1.5rem',
                fontFamily:    'var(--f-system)',
                fontWeight:    300,
                fontSize:      '12px',
                color:         'var(--cream-50)',
                letterSpacing: '0.02em',
              }}>
                {lang === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.'}
              </p>
            )}
          </form>
        )}

        <footer className="contact-footer" style={{ marginTop: '5rem', textAlign: 'center' }}>
          <LogoComplet
            variant="light"
            className="footer-logo-img"
            style={{ width: '120px', height: 'auto', margin: '0 auto', opacity: 0.55 }}
          />
          <p
            className="footer-text-sm"
            style={{
              fontFamily:    'var(--f-system)',
              fontWeight:    300,
              fontSize:      '9px',
              color:         'var(--cream-38)',
              letterSpacing: '0.04em',
              marginTop:     '1rem',
            }}
          >
            © 2026 ALPSEREN. Tous droits réservés.
          </p>
          <p
            className="footer-text-sm"
            style={{
              fontFamily:    'var(--f-system)',
              fontWeight:    300,
              fontSize:      '9px',
              color:         'var(--cream-38)',
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
