'use client'

import { useState } from 'react'
import { type Lang } from '@/lib/translations'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import VideoPhone from '@/components/VideoPhone'
import ScrollSections from '@/components/ScrollSections'
import MobileServices from '@/components/MobileServices'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr')

  return (
    <>
      {/* ── Couches fixes pilotées par le scroll ── */}
      <VideoPhone lang={lang} />          {/* z-5  — fond transparent + iPhone + 4 sections */}
      <Hero lang={lang} />                {/* z-10 — overlay sombre, se dissout à 8% */}
      <ScrollSections lang={lang} />      {/* z-20 — Philosophie · CTA */}
      <Header lang={lang} setLang={setLang} />{/* z-50 */}

      {/* ── Driver scroll : 600 vh ≈ 2.5 vh / frame ── */}
      <div id="scroll-container" style={{ height: '600vh' }} />

      {/* ── Blocs mobile — visibles uniquement après le scroll vidéo sur mobile ── */}
      <MobileServices lang={lang} />

      {/* ── Section statique ── */}
      <ContactSection lang={lang} />
    </>
  )
}
