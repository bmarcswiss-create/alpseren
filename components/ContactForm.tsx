'use client'

import { useState } from 'react'
import { translations, type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
}

export default function ContactForm({ lang }: Props) {
  const t = translations[lang].contact
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', timeline: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <p className="font-body font-light text-xs tracking-ultra uppercase text-background/60 text-center">
        {t.sent}
      </p>
    )
  }

  const inputClass = "bg-transparent border-b border-background/20 py-3 font-body font-light text-sm text-background outline-none focus:border-background/60 transition-colors duration-300 w-full"
  const labelClass = "font-body font-light text-xs tracking-ultra uppercase text-background/40"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <p className="font-body font-light text-xs tracking-ultra uppercase text-background/40 mb-2">
        {t.label}
      </p>
      <div className="w-12 h-px bg-icon" />

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.name}</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.email}</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.phone}</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.service}</label>
        <select
          required
          value={form.service}
          onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
          className={inputClass + ' cursor-pointer appearance-none'}
        >
          <option value="" disabled>—</option>
          <option value="Lifestyle Services">Lifestyle Services</option>
          <option value="Estate Management">Estate Management</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.timeline}</label>
        <input
          type="text"
          value={form.timeline}
          onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.message}</label>
        <textarea
          required
          rows={3}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={inputClass + ' resize-none'}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="acceptance"
          required
          className="mt-0.5 accent-icon cursor-pointer"
        />
        <label htmlFor="acceptance" className="font-body font-light text-xs text-background/40 leading-relaxed cursor-pointer">
          {t.acceptancePrefix}{' '}
          <a href="/confidentialite" className="border-b border-background/30 hover:border-background/60 transition-colors duration-300">
            {t.acceptanceLink}
          </a>
        </label>
      </div>

      {error && (
        <p className="font-body font-light text-xs tracking-ultra uppercase text-background/60">
          {lang === 'fr' ? 'Une erreur est survenue, veuillez réessayer.' : 'An error occurred, please try again.'}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="self-start font-body font-light text-xs tracking-ultra uppercase text-icon border-b border-icon/40 hover:border-icon pb-0.5 transition-colors duration-300 disabled:opacity-40"
      >
        {loading ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : t.send}
      </button>
    </form>
  )
}
