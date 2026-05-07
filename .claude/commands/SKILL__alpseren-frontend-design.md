---
name: alpseren-frontend-design
description: Interfaces ALPSEREN — conciergerie privée Genève. Next.js 16 + Tailwind v4.
---

## 0. Informations Entreprise Validées

| Élément | Valeur |
|---|---|
| Activité | Conciergerie privée & gestion du quotidien haut de gamme |
| Zone | Canton de Genève, Suisse uniquement |
| Cible | Propriétaires de résidences haut de gamme |
| Fondateur | Solo entrepreneur, entreprise en création |
| Contact | contact@alpseren.com |
| Domaines | alpseren.com · alpseren.ch |
| Baseline logo | PRIVATE ESTATE & LIFESTYLE |
| Langue | Bilingue FR/EN, FR par défaut |
| Structure | One-page uniquement |

## 1. Services Réels

**Estate Management** : Ménage, jardinage, coordination prestataires, intendance, surveillance

**Lifestyle Services** : Soins aux animaux, transport de chevaux, services sur-mesure, coordination quotidien

## 2. Palette Stricte

- `#C29B6D` → logo & accents discrets uniquement
- `#2D2926` → textes & UI (jamais #000000)
- `#F9F9F9` → fond (jamais #ffffff)

## 3. Stack

- Next.js 16 + Tailwind CSS v4 + TypeScript
- GSAP + Lenis pour scroll
- Tailwind config dans globals.css via @theme (pas de tailwind.config.ts)
- /public/logo.png · /public/frames/frame_0001.webp…frame_0241.webp

## 4. Structure One-Page

Header → Hero → Canvas scroll vidéo → Estate Management → Lifestyle Services → Contact → Footer

## 5. Formulaire Contact

Champs : Prénom & Nom / Email / Message / Bouton envoi (style texte ALPSEREN)

## 6. Contenu FR/EN

**FR** : hero "L'Excellence du Quotidien" | s1 "Votre Résidence, Notre Vigilance" | s2 "Chaque Détail, Pris en Charge"

**EN** : hero "Everyday Excellence" | s1 "Your Residence, Our Vigilance" | s2 "Every Detail, Taken Care Of"

## 7. Règles Absolues

- ALPSEREN toujours en MAJUSCULES
- Cinzel pour titres, Montserrat Light (300) pour tout le reste
- Zéro bouton coloré — liens texte uniquement
- Zéro emoji, zéro icône décorative
- Padding minimum py-16 par section
- Animations max 1s
