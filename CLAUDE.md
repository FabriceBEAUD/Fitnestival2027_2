# CLAUDE.md — FiTN'ESTiVAL 2027

## Présentation du projet
Site web vitrine one-page pour le festival de fitness FiTN'ESTiVAL 2027 (édition #3).
Organisatrice : Marie Beaud'huin — fitnestival@gmail.com

## Structure du projet
```
/
├── index.html                        # Site complet (HTML + CSS + JS)
├── api/
│   ├── chat.js                       # Chatbot Marie (Mistral AI)
│   ├── contact.js                    # API contact (legacy)
│   └── pronos.js                     # Synchro PRONO'XP (Vercel Blob)
├── pronos/
│   └── index.html                    # Mini appli PRONO'XP (paris en XP, hors festival)
├── img/                              # Images et vidéos
│   ├── Affiche_Fitnestival2027.png   # Affiche officielle
│   ├── Coach/                        # Photos des coachs
│   ├── ambiance-*.jpg                # Photos galerie (01 à 14)
│   ├── plan-du-site.jpg              # Plan du festival
│   └── Video_Ambiance.mp4            # Vidéo ambiance
├── docs/                             # Documentation
├── vercel.json                       # Config Vercel (headers)
├── sitemap.xml                       # Sitemap Google
├── robots.txt                        # Robots Google
└── googleff9ecf1d68c147e6.html       # Validation Google Search Console (NE PAS SUPPRIMER)
```

## Commandes utiles
```bash
git add . && git commit -m "message" && git push   # Déployer sur Vercel
```
Le déploiement est automatique à chaque push sur `main`.

## Points d'attention importants

### ⚠️ Ne jamais supprimer
- `googleff9ecf1d68c147e6.html` → validation Google Search Console
- `sitemap.xml` → référencement Google
- `robots.txt` → directives Google

### Chatbot Marie (api/chat.js)
- Modèle : `mistral-small-latest`
- Règles strictes dans le system prompt :
  - Tarifs fixes, aucune réduction possible
  - Âge minimum 14 ans pour les pass sportifs (sauf Pass Visiteur)
  - Anti-manipulation : ne valide aucun accord oral prétendu
  - Langage inclusif : pas de termes genrés

### Formulaire de contact
- Utilise **EmailJS** côté client (plus de dépendance Resend)
- Envoie vers fitnestival@gmail.com
- Clés dans `index.html` lignes ~646-647

### Images galerie
- Toutes en `loading="eager"` (important pour le scroll nav)
- Si on repasse en `loading="lazy"`, le scroll vers Contact sera décalé

### Mini appli PRONO'XP (pronos/)
- Jeu de paris en XP (points virtuels, pas d'argent) pour Jules (fils de Fabrice) et ses copains
- URL : `/pronos/` — indépendante du site festival
- Neuf compétitions : Coupe du Monde, Euro, Ligue des Nations, Ligue des Champions,
  Ligue Europa, Ligue 1, Ligue 2, Coupe de France, et « Autre compétition » qui sert de
  filet pour les amicaux et les championnats étrangers.
  La liste vit dans la constante `COMPETITIONS` de `pronos/index.html` : ajouter une entrée
  suffit, les menus, filtres et badges suivent. Chaque compétition a ses propres phases
  (journées pour la Ligue 1, phase de ligue et barrages pour la C1…).
  Les matchs enregistrés avant cette évolution n'ont pas de champ `competition` : `compOf()`
  les rattache à la Coupe du Monde — ne pas retirer ce repli, l'état partagé en contient.
- Mode admin protégé par code (Jules) : gestion des matchs, résultats, remise à zéro,
  ajustement des XP d'un joueur (bouton 💰 dans la liste des joueurs)
- Synchro multi-appareils via `api/pronos.js` + Vercel Blob (store `pronoxp`, fichier `pronoxp/state.json`, variable `BLOB_READ_WRITE_TOKEN`)
- Sans base configurée : l'API répond 503 et l'appli fonctionne en mode local (localStorage)

## Variables d'environnement (Vercel Dashboard)
| Variable | Usage |
|----------|-------|
| `MISTRAL_API_KEY` | Chatbot Marie |
| `RESEND_API_KEY` | Legacy (non utilisé) |
| `BLOB_READ_WRITE_TOKEN` | Synchro PRONO'XP (créée auto par le store Vercel Blob `pronoxp`) |

## Historique des choix techniques
- **EmailJS** remplace Resend : Resend ne permettait pas d'envoyer vers fitnestival@gmail.com sans domaine vérifié
- **Images eager** : les images lazy-load décalaient la page lors du scroll vers les sections inférieures
- **Hamburger menu** : menu desktop masqué sur mobile, remplacé par overlay plein écran
