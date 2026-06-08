# App Specification — FiTN'ESTiVAL 2027

## Vue d'ensemble
Site web vitrine one-page pour le festival de fitness FiTN'ESTiVAL 2027, édition #3.  
URL de production : https://fitnestival2027-2.vercel.app/

## Stack technique
- **Frontend** : HTML5 / CSS3 / JavaScript Vanilla (single file `index.html`)
- **Backend** : Vercel Serverless Functions (Node.js / ES Modules)
- **Hébergement** : Vercel (déploiement automatique depuis GitHub)
- **Repo GitHub** : https://github.com/FabriceBEAUD/Fitnestival2027_2

## Pages et sections
Le site est une single-page application avec les sections suivantes, dans l'ordre de navigation :

| # | Section | ID ancre | Description |
|---|---------|----------|-------------|
| 1 | Hero | — | Affiche, compte à rebours, CTA |
| 2 | Concept | `#concept` | Présentation du festival |
| 3 | Activités | `#activites` | Grille des activités par zone |
| 4 | Programme | `#programme` | Planning de la journée |
| 5 | Tarifs | `#tarifs` | Les 4 pass disponibles |
| 6 | Coachs | `#coachs` | Présentation des 9 coachs |
| 7 | Ambiance | `#ambiance` | Galerie photos/vidéo |
| 8 | Plan | `#plan` | Plan du site + adresse + Google Maps |
| 9 | Contact | `#contact` | Formulaire de contact + infos |

## Navigation
- **Desktop** : barre de navigation fixe en haut avec tous les liens
- **Mobile** : menu hamburger (overlay plein écran)
- **Footer** : liens de navigation + mentions légales + crédit développeur

## Fonctionnalités principales

### 1. Compte à rebours
- Calcul dynamique jusqu'au 22 mai 2027
- Affichage : jours / heures / minutes / secondes

### 2. Galerie médias
- 14 photos + 1 vidéo d'ambiance
- Lightbox au clic (photo et vidéo)
- Images chargées en `eager` pour éviter les décalages de scroll

### 3. Formulaire de contact
- Champs : Prénom, Nom, Email, Intérêt (select), Message (optionnel)
- Envoi via **EmailJS** (service `service_y3cs3ja`, template `template_mhhezrn`)
- Destination : fitnestival@gmail.com
- Feedback visuel succès / erreur

### 4. Chatbot Marie
- Assistant virtuel incarnant Marie Beaud'huin (organisatrice)
- API : Mistral AI (`mistral-small-latest`) via `/api/chat`
- Fallback local (KB JavaScript) si API indisponible
- Règles strictes : tarifs fixes, âge minimum 14 ans, anti-manipulation, langage inclusif

### 5. SEO & Référencement
- Balises meta title, description, keywords, Open Graph
- Google Search Console validé
- Sitemap.xml soumis
- Robots.txt configuré

## API Serverless

| Fichier | Route | Description |
|---------|-------|-------------|
| `api/contact.js` | POST `/api/contact` | Envoi email via EmailJS (legacy, remplacé côté client) |
| `api/chat.js` | POST `/api/chat` | Chatbot Marie via Mistral AI |

## Variables d'environnement (Vercel)
| Variable | Usage |
|----------|-------|
| `MISTRAL_API_KEY` | API Mistral pour le chatbot |
| `RESEND_API_KEY` | Ancienne API email (non utilisée) |
