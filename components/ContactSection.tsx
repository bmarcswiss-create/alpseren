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

  const fieldStyle = {
    fontSize:      '0.8rem',
    color:         '#F9F9F9',
    borderBottom:  '1px solid rgba(249,249,249,0.15)',
    paddingBottom: '0.7rem',
    width:         '100%',
  }

  return (
    <section style={{ position: 'relative', zIndex: 40 }}>

      {/* Séparateur */}
      <div style={{ height: '1px', backgroundColor: 'rgba(194,155,109,0.4)' }} />

      <div className="py-16 px-6">
        <div className="mx-auto" style={{ maxWidth: '440px' }}>

          {/* Label */}
          <p
            className="font-body font-light tracking-ultra uppercase mb-10"
            style={{ fontSize: '0.62rem', color: 'rgba(194,155,109,0.7)' }}
          >
            {t.label}
          </p>

          {sent ? (
            <p
              className="font-body font-light tracking-ultra uppercase py-12 text-center"
              style={{ fontSize: '0.62rem', color: 'rgba(249,249,249,0.4)' }}
            >
              {t.sent}
            </p>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSent(true) }}
              className="flex flex-col"
              style={{ gap: '2rem' }}
            >
              <input
                type="text"
                required
                placeholder={t.name}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="font-body font-light bg-transparent outline-none transition-colors duration-300"
                style={fieldStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.45)')}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.15)')}
              />

              <input
                type="email"
                required
                placeholder={t.email}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="font-body font-light bg-transparent outline-none transition-colors duration-300"
                style={fieldStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.45)')}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.15)')}
              />

              <textarea
                required
                rows={3}
                placeholder={t.message}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="font-body font-light bg-transparent outline-none resize-none transition-colors duration-300"
                style={fieldStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.45)')}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(249,249,249,0.15)')}
              />

              {/* Bouton centré */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="font-body font-light tracking-ultra uppercase transition-colors duration-300"
                  style={{
                    fontSize:      '0.62rem',
                    color:         '#F9F9F9',
                    borderBottom:  '1px solid rgba(194,155,109,0.5)',
                    paddingBottom: '3px',
                    background:    'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.9)')}
                  onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'rgba(194,155,109,0.5)')}
                >
                  {t.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer simplifié */}
      <footer
        className="flex flex-col items-center py-12 px-6"
        style={{ borderTop: '1px solid rgba(249,249,249,0.06)' }}
      >
        <Image
          src="/logo-white.png"
          alt="ALPSEREN — Private Estate & Lifestyle"
          width={160}
          height={100}
          className="mb-5"
          style={{ width: '160px', height: 'auto', opacity: 0.6 }}
        />
        <p
          className="font-body font-light mb-1"
          style={{ fontSize: '10px', color: 'rgba(249,249,249,0.3)', letterSpacing: '0.04em' }}
        >
          © 2025 ALPSEREN. Tous droits réservés.
        </p>
        <p
          className="font-body font-light"
          style={{ fontSize: '10px', color: 'rgba(249,249,249,0.3)', letterSpacing: '0.04em' }}
        >
          Genève, Suisse
        </p>
      </footer>

    </section>
  )
}
