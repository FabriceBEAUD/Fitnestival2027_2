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
│   └── contact.js                    # API contact (legacy)
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

## Variables d'environnement (Vercel Dashboard)
| Variable | Usage |
|----------|-------|
| `MISTRAL_API_KEY` | Chatbot Marie |
| `RESEND_API_KEY` | Legacy (non utilisé) |

## Historique des choix techniques
- **EmailJS** remplace Resend : Resend ne permettait pas d'envoyer vers fitnestival@gmail.com sans domaine vérifié
- **Images eager** : les images lazy-load décalaient la page lors du scroll vers les sections inférieures
- **Hamburger menu** : menu desktop masqué sur mobile, remplacé par overlay plein écran
