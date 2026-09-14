# AREA PADEL — refonte du site vitrine

Refonte du site [area-padel.fr](https://www.area-padel.fr) (deux clubs : Caen-Verson &amp; Deauville).
Même base technique que les autres sites (Padel Sporting Club, Éclat Auto Centre, MBSR Auto…) :
HTML / CSS / JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Direction : « Deux clubs, deux ambiances »

AREA PADEL a deux visages bien distincts — un complexe indoor moderne à Verson (Caen), un
club outdoor sur les planches de Deauville, face à la mer — et toute la direction artistique
part de ce contraste plutôt que de le lisser.

**v2 (DA corrigée) :** la vraie identité du site actuel est noir/blanc/gris, portée par la
photo et la vidéo, pas par de la couleur — une première version avait dérivé vers un fond
crème + vert pin + ocre (erreur d'échantillonnage : les couleurs relevées venaient en réalité
du bandeau cookies tiers, pas de la marque). Le site utilise désormais fond blanc / chrome noir
`#0a0a0a`, un seul accent très restreint (vert-gris sourd `#7f9587`, puisé dans le verre des
terrains, pour les libellés et survols), boutons pilule blancs, et la vraie vidéo du hero
(`assets/img/hero-video.mp4`, reprise du site actuel) plus de vraies photos des deux clubs à la
place de l'illustration SVG de la v1. Typo ronde **Comfortaa** reprise de l'identité de marque
existante (logo, wordmark), body en **Work Sans**.

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
- `assets/img/hero-video.mp4` — vraie vidéo de hero du site actuel (terrain indoor, ~31 Mo, reprise telle quelle — à recompresser côté client si besoin de réduire le poids)
- `assets/img/clubhouse-caen.jpg`, `caen-club-1.webp` — photos réelles du club house de Verson
- `assets/img/deauville-club-1.webp` — photo réelle d'un terrain outdoor de Deauville (vue mer)
- `assets/img/caen-installations.webp`, `caen-explosion-padel.webp` — photos d'ambiance (raquette, balles)
- `assets/img/favicon.svg` — monogramme à points, noir sur blanc
- Aucune dépendance externe en prod (hors Google Fonts), pas de framework, pas de build.

## Contenu

Tous les textes (présentation, tarifs, privatisation, adresses, horaires) sont repris et
reformulés à partir du site actuel — aucun prix ni aucune prestation n'a été inventé.

## À personnaliser / compléter

| Élément | État actuel | À faire |
|---|---|---|
| **Mentions légales** | 6 champs à compléter (encadrés jaunes) | Renseigner forme juridique, capital, RCS, SIRET, TVA, directeur de publication, médiateur de la consommation |
| E-mail de contact | `contact@area-padel.fr` (placeholder, non confirmé) | Confirmer l'adresse e-mail réelle du club |
| Formulaire de contact | `mailto:` pré-rempli, pas de backend | Brancher Formspree ou Web3Forms pour un envoi réel sans ouvrir la messagerie du visiteur |
| Vidéo hero | `hero-video.mp4` réutilisée telle quelle du site actuel (~31 Mo, non recompressée) | Recompresser (ex. `ffmpeg`, cible ~5-8 Mo) si le poids pose problème en prod |
| Photos club Caen indoor | Photos de club house + ambiance disponibles, pas de plan large des 6 pistes panoramiques | Récupérer une vraie photo large des pistes indoor auprès du client |
| Liens réseaux sociaux | Placeholders (`#`) | Brancher les vrais liens Instagram / Facebook / TikTok |
| Réservation | Caen-Verson → `areapadelcaen.doinsport.club` (lien du site actuel) ; Deauville → téléphone uniquement (pas de réservation en ligne côté client actuel) | Confirmer si ces liens/process restent valables |
| Domaine | `area-padel-vercel.app` (placeholder) | Chercher/remplacer dans les 7 pages HTML + `sitemap.xml` + `robots.txt` une fois le domaine branché |

## Déploiement

Fichiers statiques → Vercel. `vercel.json` : `cleanUrls`, cache adapté aux images.
Prévisualisation locale : `npx serve .`
