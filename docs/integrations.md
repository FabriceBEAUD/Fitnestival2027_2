# Intégrations — FiTN'ESTiVAL 2027

## 1. Vercel (Hébergement)
| Paramètre | Valeur |
|-----------|--------|
| URL production | https://fitnestival2027-2.vercel.app/ |
| Plan | Gratuit (Hobby) |
| Déploiement | Automatique sur push GitHub (branche `main`) |
| Dashboard | https://vercel.com/fabricebeauds-projects/fitnestival2027-2 |

**Variables d'environnement à configurer dans Vercel :**
- `MISTRAL_API_KEY`
- `RESEND_API_KEY` (legacy)

---

## 2. GitHub (Source de vérité)
| Paramètre | Valeur |
|-----------|--------|
| Repo | https://github.com/FabriceBEAUD/Fitnestival2027_2 |
| Branche principale | `main` |
| Connexion Vercel | Automatique (webhook) |

---

## 3. EmailJS (Formulaire de contact)
| Paramètre | Valeur |
|-----------|--------|
| Dashboard | https://dashboard.emailjs.com |
| Compte | Fabrice BEAUD'HUIN |
| Plan | Gratuit (200 emails/mois) |
| Service ID | `service_y3cs3ja` |
| Template ID | `template_mhhezrn` |
| Public Key | `CIbA_WS4IrfxfvLwF` |
| Gmail connecté | fitnestival@gmail.com |
| Destination | fitnestival@gmail.com |

**Intégration :** SDK EmailJS chargé via CDN dans `index.html`, appel côté client.

---

## 4. Mistral AI (Chatbot Marie)
| Paramètre | Valeur |
|-----------|--------|
| Dashboard | https://console.mistral.ai |
| Modèle | `mistral-small-latest` |
| Endpoint | `https://api.mistral.ai/v1/chat/completions` |
| Clé | Variable `MISTRAL_API_KEY` (Vercel) |
| Max tokens | 400 |
| Temperature | 0.7 |

**Intégration :** Serverless function `api/chat.js` sur Vercel.

---

## 5. Google Search Console (SEO)
| Paramètre | Valeur |
|-----------|--------|
| Propriété | https://fitnestival2027-2.vercel.app/ |
| Méthode de validation | Fichier HTML (`googleff9ecf1d68c147e6.html`) |
| Sitemap soumis | `/sitemap.xml` |
| Statut | ✅ Validé |

---

## 6. Google Maps (Adresse)
Lien externe dans la section Plan :
```
https://www.google.com/maps/search/Espace+des+fêtes+Rue+de+Bapaume+59169+Férin
```
Aussi présent dans la section Contact.

---

## 7. Google Fonts (Typographie)
Chargées via CDN dans `<head>` :
- Bebas Neue
- Montserrat (400, 600, 700, 900)

---

## 8. Resend (Legacy — non utilisé)
Ancienne solution d'envoi d'email, remplacée par EmailJS.  
Raison : Resend plan gratuit n'autorise l'envoi que vers l'email du compte propriétaire (`fbeaudhuin@gmail.com`), pas vers `fitnestival@gmail.com`.  
La variable `RESEND_API_KEY` est toujours présente dans Vercel mais n'est plus appelée.
