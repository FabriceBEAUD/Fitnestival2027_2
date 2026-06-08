# Data Dictionary — FiTN'ESTiVAL 2027

## Formulaire de contact

| Champ | ID HTML | Type | Requis | Description |
|-------|---------|------|--------|-------------|
| Prénom | `f-prenom` | text | ✅ | Prénom de l'utilisateur |
| Nom | `f-nom` | text | ❌ | Nom de famille |
| Email | `f-email` | email | ✅ | Adresse email de contact |
| Intérêt | `f-interet` | select | ✅ | Type de pass ou sujet |
| Message | `f-message` | textarea | ❌ | Message libre |

### Valeurs du champ Intérêt
- Pass Journée (49€)
- Pass Matin (29€)
- Pass Après-midi (29€)
- Pass Visiteur (5€)
- Partenariat / Sponsoring
- Autre question

---

## Pass tarifaires

| Pass | Prix | Horaires | Inclus | Âge minimum |
|------|------|----------|--------|-------------|
| Pass Matin | 29€ | 7h30 → 14h45 | Planning matin + village bien-être | 14 ans |
| Pass Journée | 49€ | Toute la journée | Accès complet + soirée musicale | 14 ans |
| Pass Après-midi | 29€ | Dès 12h30 | Après-midi + soirée musicale | 14 ans |
| Pass Visiteur | 5€ | Toute la journée | Village bien-être + soirée musicale (sans activités sportives) | Tous âges |

**Restauration** : payante sur place pour tous les pass.  
**Réservation** : via HelloAsso uniquement.  
**Aucune réduction / code promo / pass gratuit** n'est prévu.

---

## Chatbot Marie

### Payload envoyé à l'API
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

### Réponse de l'API
```json
{
  "reply": "Réponse de Marie..."
}
```

### Fallback KB (local)
Clés disponibles si l'API Mistral est indisponible :
- `tarif` — informations sur les pass
- `lieu` — adresse du festival
- `date` — date et horaires
- `reserver` — comment réserver
- `activites` — liste des activités
- `happymove` — association Happy Move
- `amener` — quoi apporter
- `parking` — infos parking
- `famille` — infos accompagnants
- `default` — réponse générique

---

## EmailJS

| Paramètre | Valeur |
|-----------|--------|
| Service ID | `service_y3cs3ja` |
| Template ID | `template_mhhezrn` |
| Public Key | `CIbA_WS4IrfxfvLwF` |
| Destinataire | fitnestival@gmail.com |

### Variables du template
| Variable | Source |
|----------|--------|
| `{{name}}` | Prénom + Nom |
| `{{email}}` | Email utilisateur |
| `{{title}}` | Intérêt sélectionné |
| `{{message}}` | Message libre |

---

## Google Search Console

| Élément | Valeur |
|---------|--------|
| Propriété | https://fitnestival2027-2.vercel.app/ |
| Méthode validation | Fichier HTML |
| Fichier validation | `googleff9ecf1d68c147e6.html` |
| Sitemap | `/sitemap.xml` |
