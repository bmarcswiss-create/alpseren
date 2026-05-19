# ALPSEREN — Instructions pour Claude Code

## Identité du projet
Site web de la marque ALPSEREN — conciergerie privée haut de gamme, Genève.
Stack : Next.js 16 + Tailwind CSS v4 + TypeScript

---

## Référence : charte ALPSEREN synchronisée avec l'app mobile

Cette charte est la **source de vérité unique** pour le site web ET les prototypes
d'application mobile ALPSEREN. Toute modification doit rester cohérente avec les
deux surfaces. En cas de doute, la charte ci-dessous prime sur toute règle antérieure.

---

## Palette de couleurs

```css
/* Fonds */
--night:        #14110e;          /* fond principal — noir chaud */
--night-elev:   #1d1916;          /* surface élevée (cards, modales) */

/* Accent unique */
--beige:        #c29c6d;          /* beige sable — usage parcimonieux */
--beige-soft:   rgba(194,156,109,.10);
--beige-edge:   rgba(194,156,109,.32);

/* Textes */
--cream:        #e8e1d2;          /* texte principal — crème chaude */
--cream-72:     rgba(232,225,210,.72);
--cream-50:     rgba(232,225,210,.50);
--cream-38:     rgba(232,225,210,.38);
--cream-08:     rgba(232,225,210,.08);

/* Séparateurs */
--rule:         rgba(232,225,210,.06);
--rule-edge:    rgba(232,225,210,.12);
```

### Règles absolues sur les couleurs
- Fond toujours `--night` (`#14110e`), jamais `#000000`, jamais `#ffffff`
- Texte principal toujours `--cream` (`#e8e1d2`), jamais `#ffffff`, jamais `#F9F9F9`
- Accent `--beige` réservé aux états actifs, CTA transactionnels, étiquettes or
- Séparateurs toujours `--rule` ou `--rule-edge`, jamais une couleur pleine
- ALPSEREN toujours en majuscules dans tous les textes

---

## Typographies

Quatre polices, rôles stricts — toutes via `next/font/google` :

| Variable CSS | Police | Rôle | Ne jamais utiliser pour |
|---|---|---|---|
| `var(--font-montserrat)` | Montserrat 400/500 | SVG logo mark uniquement (`Logo.tsx`) | HTML, titres, corps, labels |
| `var(--f-display)` | Cinzel 400 | Logotype ALPSEREN en HTML/texte | SVG logo, titres éditoriaux, corps |
| `var(--f-editorial)` | Cormorant Garamond 300/400/500 + italiques | Titres éditoriaux, accroches, texte philo | Interface, labels, formulaires |
| `var(--f-system)` | Inter 300/400/500/600 | Interface, corps, labels, boutons, chiffres | Logo, titres éditoriaux |

> **Note logo :** Le SVG logo officiel (`ALPSEREN_Logo+Nom.svg`) utilise Montserrat.
> Cinzel est réservé au logotype typographique HTML (header, mentions texte).
> Ces deux polices coexistent pour des surfaces différentes — ne pas les intervertir.

### Trackings
```css
--track-logo:   0.34em;   /* Cinzel logotype ALPSEREN HTML */
--track-label:  0.20em;   /* Inter étiquettes UPPERCASE */
--track-tight:  -0.010em; /* Cormorant titres */
```

### Tailles de référence
- Titres section : 26–36px, `var(--f-editorial)` 300, letter-spacing `-0.005em`
- Corps : 13–15px, `var(--f-system)` 300
- Étiquettes `01 /` : 10–11px, `var(--f-system)` 500, UPPERCASE, `0.20em`
- Logotype header HTML : `var(--f-display)`, `0.34em`

---

## Règles typographiques non négociables

1. **Capitales UNIQUEMENT** pour étiquettes, boutons, mentions légales
   — jamais pour les titres éditoriaux
2. **Italique** réservé à Cormorant Garamond (accroches, placeholders)
   — jamais sur Inter
3. **Cinzel** uniquement pour le logotype `ALPSEREN`
   — tout autre titre utilise Cormorant Garamond
4. Numérotation `01 /`, `02 /` pour les sections (style éditorial)
5. Em-dashes ( — ) en début de chaque puce dans les listes
6. Chiffres en `tabular-nums` sur tableaux et listes d'horaires

---

## Composants

### Cards / surfaces
```css
background:    #1d1916  (--night-elev)
border:        1px solid rgba(232,225,210,.12)  (--rule-edge)
border-radius: 10–14px
padding:       20–48px selon contexte
```

### Inputs
```css
background:    rgba(232,225,210,.02)
border:        1px solid rgba(232,225,210,.12)  (--rule-edge)
border-radius: 10px
padding:       12px 14px
color:         #e8e1d2
placeholder:   Cormorant Garamond italique, --cream-38
focus:         border-color rgba(194,156,109,.32)  (--beige-edge)
```

### Séparateurs
```css
height:           1px
background-color: rgba(232,225,210,.06)  (--rule)
```
Préférer les bordures fines aux ombres. Pas de `box-shadow` > 4px de blur.

---

## Règle boutons — SPÉCIFIQUE AU SITE WEB

Le site qualifie, il ne convertit pas par bouton. Par conséquent :

**Règle générale :** zéro bouton coloré — uniquement liens texte avec
`border-bottom` subtil et `letter-spacing` généreux.

**Exception unique documentée :** le bouton submit du formulaire contact
est un pill beige — c'est la seule action transactionnelle de la page :
```css
background:    #c29c6d  (--beige)
color:         #14110e  (--night)
border-radius: 999px
padding:       13px 16px
font:          Inter 500, 11px, UPPERCASE, 0.22em
```

Cette exception ne s'applique pas aux futures sections marketing ou
aux CTA de navigation — ceux-ci restent des liens texte.

---

## Animations

- Max 1s, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- Animations scroll : GSAP + ScrollTrigger (ne pas modifier)
- Smooth scroll : Lenis (ne pas modifier)
- Zéro emoji, zéro icône décorative

---

## Logo

- Fichiers sources officiels : `public/ALPSEREN_Logo+Nom.svg`, `public/ALPSEREN_Complet.svg`, `public/ALPSEREN_Symbole.svg`, `public/ALPSEREN_Nom.svg`, `public/ALPSEREN_Nom+Baseline.svg`
- SVG inline dans `components/Logo.tsx` — paths extraits fidèlement des sources, police Montserrat
- Exports :
  - `LogoNom` (symbole + ALPSEREN) — **version principale**, harmonisée avec le mobile
  - `LogoComplet` (symbole + ALPSEREN + baseline PRIVATE ESTATE & LIFESTYLE)
  - `LogoSymbol` (symbole seul — favicon, icône compacte)
- Variants : `light` (texte `#e8e1d2`) et `dark` (texte `#443f3e`)
- Favicon : `app/icon.svg` (SVG fond sombre, auto-découvert par Next.js)
- Apple touch icon : `app/apple-icon.tsx` (180×180 PNG généré via ImageResponse)
- **Ne jamais modifier les paths SVG** — source de vérité = fichiers `public/ALPSEREN_*.svg`

---

## Ton & copy

- Pas de superlatifs marketing (`inégalé`, `finest`, `unparalleled`)
- Description par actes (ménage, coordination, transport), pas par adjectifs
- Tagline officielle : **« Discreet. Precise. Absolute. »**
- Vouvoiement strict dans tous les textes FR
- Signature concierge : `BENJAMIN · ALPSEREN`
- Numérotation éditoriale : `01 /`, `02 /`, etc.

---

## Contenu bilingue

- Langue par défaut : FR
- Switcher FR · EN dans le header (texte uniquement, sans drapeaux)
- Fichier de traductions : `lib/translations.ts`

---

## Stack technique

- Next.js 16 + Tailwind CSS v4 + TypeScript
- Polices : `next/font/google` → `Cinzel`, `Cormorant_Garamond`, `Inter`
- Animations : `gsap` + `@gsap/ScrollTrigger` + `lenis`
- Email : `resend` (route `/api/contact`)
- Icônes `/public/icons/` : `apple-touch-icon.png` 180×180, `favicon-32x32.png`, `favicon-192x192.png`
