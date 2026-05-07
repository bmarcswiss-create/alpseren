'use client'

import { type Lang } from '@/lib/translations'

interface Props {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Header({ lang, setLang }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-7">
      <span className="font-display text-xs tracking-luxury text-brand/30 uppercase">
        ALPSEREN
      </span>
      <div className="flex items-center gap-3 font-body font-light text-xs tracking-ultra uppercase">
        <button
          onClick={() => setLang('fr')}
          className={`transition-colors duration-300 ${
            lang === 'fr' ? 'text-brand' : 'text-brand/30 hover:text-brand/60'
          }`}
        >
          FR
        </button>
        <span className="text-brand/20">·</span>
        <button
          onClick={() => setLang('en')}
          className={`transition-colors duration-300 ${
            lang === 'en' ? 'text-brand' : 'text-brand/30 hover:text-brand/60'
          }`}
        >
          EN
        </button>
      </div>
    </header>
  )
}
