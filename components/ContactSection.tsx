'use client'

import { useState } from 'react'
import { LogoComplet } from '@/components/Logo'
import { translations, type Lang } from '@/lib/translations'

interface Props { lang: Lang }

export default function ContactSection({ lang }: Props) {
  const t = translations[lang].contact

  const [form, setForm] = useState({
    civility:   '',
    firstName:  '',
    lastName:   '',
    email:      '',
    indicatif:  '+41',
    phone:      '',
    address:    '',
    npa:        '',
    localite:   '',
    clientType: '',
    service:    '',
    timeline:   '',
    message:    '',
  })
  const [consent,  setConsent]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const [sending,  setSending]  = useState(false)
  const [error,    setError]    = useState(false)

  // ── Styles ──────────────────────────────────────────────────────────────
  const base: React.CSSProperties = {
    background:    'rgba(232,225,210,.02)',
    border:        '1px solid rgba(232,225,210,.12)',
    borderRadius:  '10px',
    padding:       '12px 14px',
    color:         '#e8e1d2',
    fontFamily:    'var(--f-system)',
    fontWeight:    300,
    fontSize:      '13px',
    letterSpacing: '0.05em',
    outline:       'none',
    display:       'block',
    boxSizing:     'border-box',
  }
  const sInp: React.CSSProperties  = { ...base, width: '100%' }
  const sSel: React.CSSProperties  = { ...base, width: '100%', cursor: 'pointer', appearance: 'none' }
  const sRow: React.CSSProperties  = { ...base, flex: 1 }
  const sNpa: React.CSSProperties  = { ...base, width: '80px', flexShrink: 0 }
  const optS: React.CSSProperties  = { background: '#1d1916' }
  const mb:   React.CSSProperties  = { marginBottom: '1.2rem' }
  const row:  React.CSSProperties  = { display: 'flex', gap: '12px', marginBottom: '1.2rem' }

  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(194,156,109,.32)')
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(232,225,210,.12)')

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...form,
          phone: `${form.indicatif} ${form.phone}`,
          consent,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      style={{
        position:       'relative',
        zIndex:         40,
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingTop:     '6rem',
        paddingBottom:  '4rem',
      }}
    >
      <div
        className="contact-card"
        style={{
          maxWidth:       '560px',
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
        <p style={{
          textAlign:     'center',
          fontFamily:    'var(--f-system)',
          fontWeight:    500,
          fontSize:      '11px',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color:         'rgba(194,155,109,1)',
          marginBottom:  '3rem',
        }}>
          05 / CONTACT
        </p>

        <div style={{
          width:           '32px',
          height:          '1px',
          backgroundColor: 'rgba(194,155,109,0.3)',
          margin:          '0 auto 3rem',
        }} />

        {sent ? (
          <p style={{
            textAlign:     'center',
            fontFamily:    'var(--f-system)',
            fontWeight:    300,
            fontSize:      '13px',
            letterSpacing: '0.05em',
            color:         'rgba(194,155,109,0.8)',
            padding:       '3rem 0',
          }}>
            {t.sent}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Civilité */}
            <div style={mb}>
              <select value={form.civility} onChange={set('civility')}
                className="contact-input" style={sSel}
                onFocus={focusOn} onBlur={focusOff}>
                <option value="" style={optS}>{t.civility}</option>
                <option value="Madame"   style={optS}>{t.civOptions.madame}</option>
                <option value="Monsieur" style={optS}>{t.civOptions.monsieur}</option>
                <option value="Autre"    style={optS}>{t.civOptions.autre}</option>
              </select>
            </div>

            {/* Prénom / Nom */}
            <div style={row}>
              <input type="text" required placeholder={t.firstName}
                value={form.firstName} onChange={set('firstName')}
                className="contact-input" style={sRow}
                onFocus={focusOn} onBlur={focusOff} />
              <input type="text" required placeholder={t.lastName}
                value={form.lastName} onChange={set('lastName')}
                className="contact-input" style={sRow}
                onFocus={focusOn} onBlur={focusOff} />
            </div>

            {/* Email */}
            <div style={mb}>
              <input type="email" required placeholder={t.email}
                value={form.email} onChange={set('email')}
                className="contact-input" style={sInp}
                onFocus={focusOn} onBlur={focusOff} />
            </div>

            {/* Téléphone */}
            <div style={row}>
              <select value={form.indicatif}
                onChange={e => setForm(f => ({ ...f, indicatif: e.target.value }))}
                className="contact-input"
                style={{ ...sSel, width: '90px', flexShrink: 0 }}
                onFocus={focusOn} onBlur={focusOff}>
                <option value="+41"  style={optS}>🇨🇭 +41</option>
                <option value="+33"  style={optS}>🇫🇷 +33</option>
                <option value="+352" style={optS}>🇱🇺 +352</option>
                <option value="+32"  style={optS}>🇧🇪 +32</option>
                <option value="+44"  style={optS}>🇬🇧 +44</option>
                <option value="+49"  style={optS}>🇩🇪 +49</option>
                <option value="+39"  style={optS}>🇮🇹 +39</option>
                <option value="+34"  style={optS}>🇪🇸 +34</option>
                <option value="+1"   style={optS}>🇺🇸 +1</option>
                <option value="+971" style={optS}>🇦🇪 +971</option>
              </select>
              <input type="tel" required placeholder={t.phone}
                value={form.phone} onChange={set('phone')}
                className="contact-input" style={sRow}
                onFocus={focusOn} onBlur={focusOff} />
            </div>

            {/* Adresse */}
            <div style={mb}>
              <input type="text" placeholder={t.address}
                value={form.address} onChange={set('address')}
                className="contact-input" style={sInp}
                onFocus={focusOn} onBlur={focusOff} />
            </div>

            {/* NPA / Localité */}
            <div style={row}>
              <input type="text" placeholder={t.npa}
                value={form.npa} onChange={set('npa')}
                className="contact-input" style={sNpa}
                onFocus={focusOn} onBlur={focusOff} />
              <input type="text" placeholder={t.localite}
                value={form.localite} onChange={set('localite')}
                className="contact-input" style={{ ...sRow }}
                onFocus={focusOn} onBlur={focusOff} />
            </div>


            {/* Type de client */}
            <div style={mb}>
              <select value={form.clientType} onChange={set('clientType')}
                className="contact-input" style={sSel}
                onFocus={focusOn} onBlur={focusOff}>
                <option value="" style={optS}>{t.clientType}</option>
                <option value="Particulier" style={optS}>{t.clientTypeOptions.particulier}</option>
                <option value="Régie"       style={optS}>{t.clientTypeOptions.regie}</option>
                <option value="Entreprise"  style={optS}>{t.clientTypeOptions.entreprise}</option>
                <option value="Autre"       style={optS}>{t.clientTypeOptions.autre}</option>
              </select>
            </div>

            {/* Service demandé ★ */}
            <div style={mb}>
              <select required value={form.service} onChange={set('service')}
                className="contact-input" style={sSel}
                onFocus={focusOn} onBlur={focusOff}>
                <option value="" disabled style={optS}>{t.service}</option>
                <option value="Estate Management" style={optS}>{t.serviceOptions.estate}</option>
                <option value="Lifestyle Services" style={optS}>{t.serviceOptions.lifestyle}</option>
              </select>
            </div>

            {/* Délai souhaité */}
            <div style={mb}>
              <select value={form.timeline} onChange={set('timeline')}
                className="contact-input" style={sSel}
                onFocus={focusOn} onBlur={focusOff}>
                <option value="" style={optS}>{t.timeline}</option>
                <option value="Dès que possible" style={optS}>{t.timelineOptions.asap}</option>
                <option value="Sous 1 semaine"   style={optS}>{t.timelineOptions.semaine}</option>
                <option value="Sous 1 mois"      style={optS}>{t.timelineOptions.mois}</option>
                <option value="Flexible"         style={optS}>{t.timelineOptions.flexible}</option>
                <option value="À planifier"      style={optS}>{t.timelineOptions.planifier}</option>
              </select>
            </div>

            {/* Message ★ */}
            <div style={mb}>
              <textarea required rows={4} placeholder={t.message}
                value={form.message} onChange={set('message')}
                className="contact-input"
                style={{ ...sInp, resize: 'none' }}
                onFocus={focusOn} onBlur={focusOff} />
            </div>

            {/* Consentement LPD/RGPD ★ */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <input
                type="checkbox"
                id="acceptance"
                required
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: '2px', accentColor: '#C29B6D', cursor: 'pointer', flexShrink: 0 }}
              />
              <label htmlFor="acceptance" style={{
                fontFamily:    'var(--f-system)',
                fontWeight:    300,
                fontSize:      '11px',
                letterSpacing: '0.04em',
                color:         'var(--cream-50)',
                lineHeight:    1.7,
                cursor:        'pointer',
              }}>
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
                display:       'block',
                margin:        '0 auto',
                background:    '#c29c6d',
                border:        'none',
                borderRadius:  '999px',
                padding:       '13px 16px',
                color:         '#14110e',
                fontFamily:    'var(--f-system)',
                fontWeight:    500,
                fontSize:      '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor:        sending ? 'default' : 'pointer',
                opacity:       sending ? 0.5 : 1,
                transition:    'opacity 0.25s ease',
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
          <p className="footer-text-sm" style={{
            fontFamily:    'var(--f-system)',
            fontWeight:    300,
            fontSize:      '9px',
            color:         'var(--cream-38)',
            letterSpacing: '0.04em',
            marginTop:     '1rem',
          }}>
            © 2026 ALPSEREN. Tous droits réservés.
          </p>
          <p className="footer-text-sm" style={{
            fontFamily:    'var(--f-system)',
            fontWeight:    300,
            fontSize:      '9px',
            color:         'var(--cream-38)',
            letterSpacing: '0.04em',
            marginTop:     '0.4rem',
          }}>
            Genève, Suisse
          </p>
        </footer>
      </div>
    </section>
  )
}
