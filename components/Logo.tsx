'use client'

import { SVGAttributes } from 'react'

// variant='light'  → texte blanc sur fond sombre (hero, overlay)
// variant='dark'   → texte anthracite sur fond clair (défaut)
type Variant = 'light' | 'dark'

interface LogoProps extends Omit<SVGAttributes<SVGSVGElement>, 'viewBox'> {
  variant?: Variant
}

const GOLD       = '#C29B6D'
const OFF_WHITE  = '#fefefe'

// Paths du symbole montagne — extraits de ALPSEREN_Complet.svg
const P1 = "M2749.93,748.97c-25.9-5.98-67.3,15.68-89.65,28.39l-184.15,313.46c-29.9,20.83-56.89-11.93-84.58-18.72-61.32-15.04-90.25,27.42-118.49,72.04-53.59,84.67-133.47,212.65-174.86,301.14-29.4,62.84-15.04,128.78,61.12,139.05,55.42,7.47,197.72,6.47,254.47.54,55.48-5.79,96.68-36.37,126.58-81.42,49.35-86.43,33.48-94.82,139.91-94.09,17.8-6.81,35.98-12.86,54.53-18.15,16.05-19.8-8.86-26.21-26.44-28.56-18.6.02-33.29-3.08-44.08-9.28-6.69-7.93-18.27-10.6-34.73-8l54.76-114.03-.02-17.97-2.57-6.34c18-33.99-1.71-61.9-33.43-37.66-52.23,103.87-110.14,205.18-159.21,310.79-17.06,25.84-52.1,46.06-82.83,49.17-53.96,5.45-182.64,6.06-236.04.15-9.28-1.03-19.08-4.75-26.21-10.79,0,0-2.65-5.14-3.37-6.92-.81-2.01-2.65-8.25-2.65-8.25v-8.1l2.55-7.77,199.79-344.27c28.11-35.11,51.14-3.68,81.77,6.19,67.98,21.91,99.31-23.18,130.91-73.51,18.38-29.28,147.71-267.48,147.31-266.69,8.42-32.32,23.68-33.79,54.97-31.99,29.61-6.75,20.68-22.4-5.31-28.4Z"
const P2 = "M2845.73,815.26c-34.1-79.35-128.06-110.94-185.45-37.89,37.83-1.24,63.24-33.47,103.99-15.94,11.1,11.61-32.98,7.52-37.72,8.19-15.05,2.13-27.09,11.57-29.68,26.98-1.49,8.83,3.41,11.99,3.42,12.77,32.76-25.01,64.68-27.85,91.3,6.7l438.7,769.3h58c-145.71-254.62-293.59-524.74-442.55-770.11Z"
const P3 = "M2887.7,1251.94l-139.48-274.57c-8.26-1.72-9.26,4.07-12.73,9.21-32.06,47.42-60.08,128.81-87.22,182.78l30.17-.2c5.6,10.71-.11,21.42-1.04,31.41-.72,7.7-5.72,14.7,6.88,12.79l13.61-9.26,44.92-85.52c9.71,1.05,81.54,149.77,89.65,173.08,18.32,52.63-32.84,57.34-72.58,55.84l-88.42-2.01-7.18,7.87c-.23,12.16,5.67,10.08,13.92,12.09,17.61,4.28,36.82,4.53,54.07,11.97,1.62,10.21-.88,6.21-5.6,8.33-12.9,5.81-43.52,7.58-46.39,23.61,52.41-1.38,126.91,10.08,172.07-13.93,55.35-29.42,58.04-90.25,35.35-143.49Z"
const P4 = "M3056.28,1585.37h-62l-93.45-178.69c10.67-18.9,26.85-35.2,31.5-57.3l123.95,235.99Z"
const PW = "M2664.28,1353.37c-15.81-.22-32.52,1.82-47.97-1.97,41.87-74.22,71.85-155.39,115.32-228.69,2.63-4.39,8.79-19.95,14.6-17.31,25.93,55.27,68.37,114.1,89.53,170.5,12.93,34.46,13.39,69.14-30.44,76.52-36.3,6.11-101.63,1.5-141.04.96Z"

function Symbol() {
  return (
    <g>
      <path fill={GOLD} d={P1} />
      <path fill={GOLD} d={P2} />
      <path fill={GOLD} d={P3} />
      <path fill={GOLD} d={P4} />
      <path fill={OFF_WHITE} d={PW} />
    </g>
  )
}

// Logo complet : symbole + ALPSEREN + baseline PRIVATE ESTATE & LIFESTYLE
// viewBox calibré sur le contenu effectif du SVG (crop du canvas 5632×3072)
export function LogoComplet({ variant = 'dark', className, ...rest }: LogoProps) {
  const nameColor     = variant === 'light' ? OFF_WHITE : '#443f3e'
  const baselineColor = variant === 'light' ? 'rgba(254,254,254,0.72)' : '#6e6664'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1100 600 2850 1820"
      className={className}
      aria-label="ALPSEREN — Private Estate & Lifestyle"
      role="img"
      {...rest}
    >
      <Symbol />
      <text
        fill={nameColor}
        transform="translate(1305.21 2038.85)"
        fontFamily="Montserrat, sans-serif"
        fontSize="430"
        fontWeight="400"
        letterSpacing=".13em"
      >
        <tspan x="0" y="0">ALPSEREN</tspan>
      </text>
      <text
        fill={baselineColor}
        transform="translate(1547.83 2296.47)"
        fontFamily="Montserrat, sans-serif"
        fontSize="155"
        fontWeight="500"
      >
        <tspan letterSpacing="-.02em" x="0" y="0">P</tspan>
        <tspan letterSpacing="0em" x="108.81" y="0">R</tspan>
        <tspan letterSpacing="-.03em" x="219.94" y="0">I</tspan>
        <tspan letterSpacing="-.05em" x="264.12" y="0">V</tspan>
        <tspan letterSpacing="-.04em" x="367.19" y="0">A</tspan>
        <tspan letterSpacing="0em" x="473.68" y="0">TE E</tspan>
        <tspan letterSpacing="-.02em" x="807.86" y="0">S</tspan>
        <tspan letterSpacing="-.04em" x="901.01" y="0">TA</tspan>
        <tspan letterSpacing="0em" x="1091.51" y="0">TE &amp; LIFE</tspan>
        <tspan letterSpacing="-.02em" x="1804.5" y="0">S</tspan>
        <tspan letterSpacing="-.02em" x="1897.65" y="0">T</tspan>
        <tspan letterSpacing="-.03em" x="1985.85" y="0">Y</tspan>
        <tspan letterSpacing="0em" x="2082.25" y="0">LE</tspan>
      </text>
    </svg>
  )
}

// Logo + Nom : symbole + ALPSEREN (sans baseline)
export function LogoNom({ variant = 'dark', className, ...rest }: LogoProps) {
  const nameColor = variant === 'light' ? OFF_WHITE : '#443f3e'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1100 600 2850 1560"
      className={className}
      aria-label="ALPSEREN"
      role="img"
      {...rest}
    >
      <Symbol />
      <text
        fill={nameColor}
        transform="translate(1305.21 2038.85)"
        fontFamily="Montserrat, sans-serif"
        fontSize="430"
        fontWeight="400"
        letterSpacing=".13em"
      >
        <tspan x="0" y="0">ALPSEREN</tspan>
      </text>
    </svg>
  )
}

// Symbole seul (favicon, icône compacte)
export function LogoSymbol({ className, ...rest }: Omit<LogoProps, 'variant'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2150 680 980 980"
      className={className}
      aria-label="ALPSEREN"
      role="img"
      {...rest}
    >
      <Symbol />
    </svg>
  )
}
