# AREA PADEL — refonte du site vitrine

Refonte du site [area-padel.fr](https://www.area-padel.fr) (deux clubs : Caen-Verson &amp; Deauville).
Même base technique que les autres sites (Padel Sporting Club, Éclat Auto Centre, MBSR Auto…) :
HTML / CSS / JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Direction : « Deux clubs, deux ambiances »

AREA PADEL a deux visages bien distincts — un complexe indoor moderne à Verson (Caen), un
club outdoor sur les planches de Deauville, face à la mer — et toute la direction artistique
part de ce contraste plutôt que de le lisser. Fond papier crème `#fbf7ee`, vert pin `#173a2b`
(Caen, indoor), ocre `#d8af30` et bleu mer `#2c5a68` (Deauville, outdoor). Typo ronde
**Comfortaa** reprise de l'identité de marque existante (logo, wordmark), body en **Work Sans**.
Motif de points repris du logo, illustration de court en SVG plutôt que de la photo de stock.

Volontairement **différent** de la refonte Padel Sporting Club Évreux (fond marine `#0c0f1f`,
jaune électrique, Anton condensé, bento/glass) : même famille de sport, même exercice, deux
clients différents, donc deux identités visuelles qui ne se ressemblent pas.

- Typo : **Comfortaa** (titres, rond) / **Work Sans** (texte)
- Animations : reveals au scroll, compteurs animés (stats padel en France), accordéon FAQ,
  nav mobile plein écran. Tout se coupe avec `prefers-reduced-motion`.

## Stack

- `index.html` — accueil : Hero / Stats / Deux clubs / Ambiance club house / Tarifs (aperçu) /
  Privatisation / Partenaires / FAQ / CTA
- `caen.html` — club de Caen-Verson (indoor, 6 pistes panoramiques, club house, séminaire)
- `deauville.html` — club de Deauville (outdoor, 5 pistes ocre, vue mer, Café Court)
- `tarifs.html` — tous les tarifs (Caen + Deauville + location de matériel)
- `privatisation.html` — événements entreprises, séminaires, team building
- `contact.html` — formulaire de contact + coordonnées des deux clubs + carte
- `mentions-legales.html` — obligation légale ; **contient des champs à compléter** (encadrés jaunes)
- `robots.txt` / `sitemap.xml`
- `assets/styles.css` — tokens &amp; reset partagés (couleurs, typo, `.skip-link`, `::selection`)
- `assets/site.css` — design system « Deux clubs, deux ambiances » (chargé par toutes les pages)
- `assets/site.js` — nav mobile, reveals au scroll, compteurs animés, accordéon FAQ, header sticky
- `assets/img/logo-area-padel.webp` — logo réel du club (repris du site actuel)
- `assets/img/clubhouse-caen.jpg` — photo réelle du club house de Verson (reprise du site actuel)
- `assets/img/favicon.svg` — monogramme à points, vert pin sur fond pin
- Aucune dépendance externe en prod (hors Google Fonts), pas de framework, pas de build.

## Contenu

Tous les textes (présentation, tarifs, privatisation, adresses, horaires) sont repris et
reformulés à partir du site actuel — aucun prix ni aucune prestation n'a été inventé.

## Ce qui a été volontairement simplifié en v1

Le site actuel n'a que **deux photos exploitables directement** en tant qu'assets statiques
(logo + une photo de club house) : le reste des visuels (hero, terrains Caen, terrains Deauville
face à mer) est en carrousel/CSS de fond, pas simple à réextraire proprement. Le hero et les
sections utilisent donc une illustration de court en SVG (lignes, points, coins arrondis façon
vitres de padel) plutôt que de la photo. **À remplacer avant mise en ligne** par de vraies photos :
hero (terrain indoor Caen), section « Nos centres » (1 photo Caen + 1 photo Deauville vue mer).

## À personnaliser / compléter

| Élément | État actuel | À faire |
|---|---|---|
| **Mentions légales** | 6 champs à compléter (encadrés jaunes) | Renseigner forme juridique, capital, RCS, SIRET, TVA, directeur de publication, médiateur de la consommation |
| E-mail de contact | `contact@area-padel.fr` (placeholder, non confirmé) | Confirmer l'adresse e-mail réelle du club |
| Formulaire de contact | `mailto:` pré-rempli, pas de backend | Brancher Formspree ou Web3Forms pour un envoi réel sans ouvrir la messagerie du visiteur |
| Photos | Logo + 1 photo club house repris du site actuel, reste en SVG | Récupérer les photos haute résolution des deux clubs (terrains Caen, terrains Deauville vue mer, ambiance Café Court) auprès du client |
| Liens réseaux sociaux | Placeholders (`#`) | Brancher les vrais liens Instagram / Facebook / TikTok |
| Réservation | Caen-Verson → `areapadelcaen.doinsport.club` (lien du site actuel) ; Deauville → téléphone uniquement (pas de réservation en ligne côté client actuel) | Confirmer si ces liens/process restent valables |
| Domaine | `area-padel-vercel.app` (placeholder) | Chercher/remplacer dans les 7 pages HTML + `sitemap.xml` + `robots.txt` une fois le domaine branché |

## Déploiement

Fichiers statiques → Vercel. `vercel.json` : `cleanUrls`, cache adapté aux images.
Prévisualisation locale : `npx serve .`
