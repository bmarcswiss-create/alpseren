# ALPSEREN — Audit du site web
> Généré le 2026-05-18 · Mode lecture seule · Fichiers analysés : `globals.css`, `layout.tsx`, `page.tsx`, `Header.tsx`, `Hero.tsx`, `VideoPhone.tsx`, `ScrollSections.tsx`, `MobileServices.tsx`, `ContactSection.tsx`, `Logo.tsx`, `lib/translations.ts`

---

## Synthèse

Le site a été conçu selon la charte interne `CLAUDE.md` (Montserrat + Cinzel, fond `#F9F9F9`, texte `#2D2926`) — une grammaire visuelle **radicalement différente** de la charte de référence actuelle (Inter + Cormorant Garamond, fonds sombres `#14110e`, texte crème `#e8e1d2`). Les deux systems ne sont pas incompatibles dans leur esprit *luxe sobre*, mais divergent sur presque tous les tokens concrets. Le ton éditorial est en revanche bien aligné. La mise en conformité est **substantielle** : elle touche les deux polices principales, toute la palette de couleurs de texte, et la refonte de tous les composants interactifs.

---

## Score

| Dimension       | Score  | Note |
|-----------------|--------|------|
| Couleurs        | 11/25  | Accent or quasi-identique ; fond proche ; texte totalement divergent |
| Typographies    | 4/25   | Cinzel sur-utilisé, Montserrat non prévu, Cormorant + Inter absents |
| Composants      | 9/25   | Numérotation et séparateurs corrects ; boutons, cards, inputs divergents |
| Ton & copy      | 19/25  | Structure éditoriale solide ; manque signature et quelques majuscules |
| **Total**       | **43/100** | Site lisible et cohérent en lui-même, mais non conforme à la charte |

---

## Top 5 incohérences les plus visibles

1. **Couleur texte** : le site utilise `#F9F9F9` (blanc neutre froid) partout. La charte impose `--cream #e8e1d2` (crème chaude). L'écart est visible à l'œil nu — le blanc froid cassera la chaleur de la palette sombre.

2. **Montserrat à la place d'Inter** : toute l'interface (labels, corps, formulaire) est en Montserrat 300. La charte spécifie Inter 300/400/500. Ce n'est pas la même géométrie de caractères ; Inter est plus neutre et fonctionnel.

3. **Cinzel utilisé pour les titres de section** : la charte réserve strictement Cinzel au logotype ALPSEREN. Tous les titres (`VOTRE RÉSIDENCE`, `CHAQUE DÉTAIL`) devraient être en Cormorant Garamond 300. Cormorant n'est même pas chargé sur le site.

4. **Titres en MAJUSCULES** : `VOTRE RÉSIDENCE, NOTRE VIGILANCE` — la règle n°1 de la charte interdit les capitales pour les titres éditoriaux (réservé aux étiquettes et boutons). Violation systématique sur les 4 panneaux de la section scroll.

5. **Inputs sans bordure-rayon ni placeholder italique** : le formulaire contact utilise des `border-bottom` à plat et des placeholders en Montserrat 300 upright. La charte attend `border-radius: 10px`, fond `rgba(232,225,210,.02)`, placeholder en italique Cormorant, focus avec `--beige-edge`.

---

## Détail par dimension

### Couleurs

| Élément | Charte attendue | Trouvé dans le code | Verdict |
|---|---|---|---|
| Fond principal (body) | `--night #14110e` | `#1a1814` (body) | ⚠ Proche (+6% de luminosité) mais non conforme |
| Fond surface élevée | `--night-elev #1d1916` | `rgba(13,13,11,0.92)` (contact card) | ⚠ Sémantiquement équivalent, token différent |
| Fond MobileServices | `--night #14110e` | `#1a1814` | ⚠ Léger écart |
| Texte principal | `--cream #e8e1d2` | `#F9F9F9` | ❌ Blanc neutre vs crème chaude — divergence visible |
| Texte atténué | `--cream-72 / --cream-50` | `rgba(249,249,249,0.6)` | ❌ Mauvaise base (249 vs 232) + transparences différentes |
| Accent or | `--beige #c29c6d` | `#C29B6D` | ✅ Quasi-identique (1 unité sur G) |
| Accent rgba | `rgba(194,156,109,…)` | `rgba(194,155,109,…)` | ✅ Quasi-identique (1 unité sur G) |
| Séparateurs | `--rule rgba(232,225,210,.06)` | `rgba(194,155,109,0.4)` (trait) / `rgba(255,255,255,0.06)` (border) | ❌ Base incorrecte — devrait être crème, pas or ni blanc |
| Overlay sombre (Hero) | Non spécifié | `rgba(45,41,38,0.52)` | ❓ Non prévu dans la charte ; effet fonctionnel correct |
| `--beige-soft / --beige-edge` | Définis, usage sur focus | Non implémentés | ❌ Absents |
| `--green / --urgent / --danger` | États applicatifs | Non pertinents sur ce site | — |
| Fond CLAUDE.md `#F9F9F9` | Non prévu dans charte | Défini comme `--color-background` | ❌ Ce token ne correspond à aucun rôle de la charte |
| Anthracite `#2D2926` | Non prévu | Utilisé pour overlay Header logo | ❌ Couleur orpheline par rapport à la charte |

**Bilan couleurs** : la teinte or est parfaitement alignée. Les fonds sombres sont proches mais légo-décalés. La vraie rupture est sur le texte (`#F9F9F9` vs `#e8e1d2`) et l'absence totale du système crème gradué de la charte.

---

### Typographies

| Élément | Charte attendue | Trouvé dans le code | Verdict |
|---|---|---|---|
| Police logotype | Cinzel 400, `--track-logo 0.34em` | Cinzel, `tracking-luxury 0.15em` | ⚠ Bonne police, tracking trop serré (0.15em vs 0.34em) |
| Police titres éditoriaux | Cormorant Garamond 300 | **Non chargée** | ❌ Absente |
| Police interface / corps | Inter 300/400/500 | **Non chargée** | ❌ Absente |
| Police utilisée pour les titres | Cormorant 300 | Cinzel 400 | ❌ Mauvaise police, mauvais poids |
| Police utilisée pour le corps | Inter 300/400 | Montserrat 300/400 | ❌ Montserrat non prévu dans la charte |
| Titres de section | Cormorant 300, 28-36px, casse normale | Cinzel, UPPERCASE, 32px | ❌ Double violation : police + casse |
| Étiquettes `01 /` | Inter 500 UPPERCASE, `track-label 0.20em` | Montserrat 300, `letter-spacing 0.3em` | ⚠ Format correct, police/poids/tracking différents |
| Corps texte | Inter 400, 14-17px | Montserrat 300, 14px | ⚠ Taille correcte, police différente |
| Placeholder | Cormorant italique, `--cream-38` | Montserrat 300 upright, `rgba(249,249,249,0.7)` | ❌ Ni la police ni le style |
| Héros éditorial | Cormorant 300, 36-96px | Cinzel (via LogoComplet SVG text, taille relative) | ❌ Police logo réutilisée pour accroche |
| Chiffres tabulaires | Inter `tnum` sur listes/tableaux | Non applicable (pas de tableaux) | — |

**Bilan typo** : la charte introduit une hiérarchie à 3 niveaux (Cinzel → Cormorant → Inter) ; le site en a une à 2 niveaux (Cinzel → Montserrat) avec des rôles différents. Cinzel est massivement sur-utilisé. Cormorant et Inter sont à ajouter.

---

### Composants

| Composant | Charte attendue | Trouvé | Verdict |
|---|---|---|---|
| **Boutons primaires** | Fond `--beige`, pill `999px`, Inter 500 11px UPPERCASE 0.22em | Aucun bouton coloré — liens texte avec underline uniquement | ❌ Design philosophy différente (CLAUDE.md interdit les boutons colorés) |
| **Bouton submit** | Pill --beige | Lien texte `border-bottom`, Montserrat 300, UPPERCASE | ⚠ Fonctionnel mais non conforme |
| **Étiquettes section** | Inter 500 10-11px UPPERCASE 0.20em, `--cream-50` ou `--beige` | Montserrat 300 11px UPPERCASE 0.3em, `rgba(194,155,109,0.8)` | ⚠ Format correct, police/poids/tracking divergent |
| **Numérotation `01 /`** | Présente, style éditorial | ✅ Présente : `01 / Estate Management` | ✅ |
| **Titres de section** | Cormorant 300, 28-36px, casse normale, 1 mot possible en italique `--beige` | Cinzel UPPERCASE, 32px | ❌ |
| **Cards / surfaces** | `--night-elev`, border 1px `--rule-edge`, `border-radius 10-14px`, padding 14-20px | Contact card: `rgba(13,13,11,0.92)`, border `rgba(255,255,255,0.06)`, `border-radius 2px`, padding 3rem | ❌ Radius trop petit, couleurs différentes |
| **Inputs** | Fond `rgba(232,225,210,.02)`, border 1px `--rule-edge`, `border-radius 10px`, placeholder Cormorant italique `--cream-38` | Fond transparent, `border-bottom` uniquement (pas de box), pas de radius, placeholder Montserrat upright | ❌ Divergence totale de conception |
| **Focus inputs** | `border --beige-edge` | `borderBottomColor rgba(249,249,249,0.85)` | ❌ Mauvaise couleur et mauvaise propriété |
| **Séparateurs** | 1px `--rule` (crème 6%) | Div 1px or `rgba(194,155,109,0.4)` | ⚠ Concept correct, couleur différente (or vs crème) |
| **iPhone mockup** | Non spécifié (composant propre au site) | Présent, fonctionnel | ✅ Hors charte |
| **Em-dashes dans listes** | `—` en début de puce | ✅ Utilisé dans VideoPhone et MobileServices | ✅ |
| **Smooth scroll / GSAP** | Non spécifié | Lenis + GSAP ScrollTrigger | ✅ Hors charte |
| **Logo SVG inline** | Non spécifié | Paths SVG inline dans Logo.tsx | ✅ Bonne pratique |

---

### Ton & copy

| Critère | Charte attendue | Trouvé | Verdict |
|---|---|---|---|
| Superlatifs marketing | Aucun | Aucun (`L'Excellence du Quotidien` — limite acceptable) | ✅ |
| Description par actes | Oui | ✅ « Ménage, jardinage, coordination », « Soins aux animaux, transport de chevaux » | ✅ |
| Tagline officielle | « Discreet. Precise. Absolute. » | `og:description` : « Alpine Excellence. Discreet. Precise. Absolute. » | ⚠ Tagline présente mais précédée de « Alpine Excellence » non prévu |
| Vouvoiement | Strict | ✅ « Votre Résidence », « Votre quotidien » | ✅ |
| Signature | « Benjamin · ALPSEREN » | Absente de toute page | ❌ |
| Numérotation `01 /` | Présente | ✅ Systématique sur les 4 services + contact | ✅ |
| Em-dashes listes | `—` avant chaque puce | ✅ Présents dans les deux composants de liste | ✅ |
| Capitales titres éditoriaux | Interdites (réservé étiquettes) | ❌ `VOTRE RÉSIDENCE`, `CHAQUE DÉTAIL`, `NOTRE VIGILANCE` — tous en majuscules | ❌ |
| Italique éditorial | Cormorant en italique pour focus/citations | Aucun italique nulle part | ❌ (impossible sans Cormorant) |
| Copyright footer | Non spécifié | `© 2026 ALPSEREN. Tous droits réservés.` | ✅ Correct |
| Mentions langue | FR par défaut, switcher FR · EN | ✅ Présent dans Header, texte uniquement sans drapeaux | ✅ |

---

## Recommandations priorisées

### Quick wins (< 1h chacun)

1. **Corriger le tracking du logo ALPSEREN** dans Header.tsx : passer de `tracking-luxury` (0.15em) à 0.34em (`--track-logo`). Une ligne.

2. **Mettre les titres de section en casse normale** : `Votre Résidence, Notre Vigilance` au lieu de `VOTRE RÉSIDENCE, NOTRE VIGILANCE`. Modifier `translations.ts` seulement.

3. **Aligner la tagline OG** : retirer `Alpine Excellence.` de la `description` OpenGraph dans `layout.tsx` pour coller exactement à `Discreet. Precise. Absolute.`

4. **Corriger les séparateurs** : remplacer la couleur or `rgba(194,155,109,0.4)` par la crème `rgba(232,225,210,0.06)` dans VideoPhone et MobileServices. Les traits deviennent quasi-invisibles mais conformes à la charte.

5. **Ajouter la signature Benjamin** : dans le footer de ContactSection, ajouter `Benjamin · ALPSEREN` en Inter 500 (ou Montserrat 500 provisoire) 10px, `--cream-38`.

### Moyens (1-4h chacun)

6. **Substituer le texte `#F9F9F9` par `#e8e1d2`** : chercher-remplacer tous les tokens `#F9F9F9` et `rgba(249,249,249,…)` par `#e8e1d2` et `rgba(232,225,210,…)`. Vérifier le contraste sur les fonds sombres (WCAG AA garanti avec --cream sur --night).

7. **Charger Cormorant Garamond** dans `layout.tsx` et l'appliquer aux titres éditoriaux (les `h2` dans les panneaux et blocs mobile). Remplacer Cinzel par Cormorant 300 + supprimer les UPPERCASE sur ces titres.

8. **Ajouter Inter** et migrer les labels et corps de texte depuis Montserrat. Ajustement du tracking labels de 0.3em → 0.20em en même temps.

9. **Inputs du formulaire** : ajouter `border-radius: 10px`, changer `border-bottom` en `border` complet, passer le fond à `rgba(232,225,210,.02)`, changer le focus color vers `rgba(194,156,109,.32)` (`--beige-edge`).

### Refonte plus lourde (> 4h)

10. **Refonte des cards** : le formulaire contact et les éventuelles futures cards doivent passer à `border-radius 10-14px`, fond `#1d1916` (`--night-elev`), border `rgba(232,225,210,.12)` (`--rule-edge`). Impacte ContactSection entièrement.

11. **Palette fonds** : remplacer `#1a1814` (body, MobileServices) par `#14110e` (`--night`) et vérifier les effets en cascade sur tous les gradients et overlays.

12. **Bouton submit** : décider si le site adopte les pill-buttons `--beige` de la charte (ce qui contredit `CLAUDE.md` actuel), ou si une exception documentée est maintenue pour le site web. Cette décision impacte aussi le design system global.

---

## Conclusion

Le site web peut être **partiellement harmonisé** sans refonte complète : les quick wins et les items moyens suffiraient à atteindre ~70/100. La divergence la plus profonde est la palette de polices (Montserrat + Cinzel sur-utilisé vs Inter + Cormorant Garamond), qui demande un travail de migration systématique mais réalisable en une demi-journée. La refonte des fonds et du texte (couleurs crème vs blanc) est la modification à plus fort impact visuel immédiat pour ~2h de travail. Une **refonte complète n'est pas nécessaire** : la structure, l'architecture de scroll, le ton éditorial et la numérotation sont solides et conformes à l'esprit de la charte.
