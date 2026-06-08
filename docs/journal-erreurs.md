# Journal d'erreurs — FiTN'ESTiVAL 2027

---

## ERR-001 — Formulaire contact n'envoyait pas vers fitnestival@gmail.com
**Date :** Juin 2026  
**Symptôme :** Les emails du formulaire n'arrivaient pas dans fitnestival@gmail.com  
**Cause :** Resend plan gratuit n'autorise l'envoi qu'vers l'email du compte propriétaire (`fbeaudhuin@gmail.com`). Sans domaine vérifié, impossible d'envoyer vers une autre adresse.  
**Solution :** Migration vers EmailJS (gratuit, 200 emails/mois). Connexion Gmail directe avec fitnestival@gmail.com.  
**Fichiers modifiés :** `index.html` (remplacement fetch `/api/contact` par `emailjs.send`)

---

## ERR-002 — EmailJS erreur 412 (Gmail API insufficient scopes)
**Date :** Juin 2026  
**Symptôme :** Lors de la connexion Gmail dans EmailJS, erreur `412 Gmail_API: Request had insufficient authentication scopes`  
**Cause :** Google n'avait pas accordé la permission "Envoyer des emails en votre nom" lors de l'OAuth.  
**Solution :** Déconnexion puis reconnexion Gmail dans EmailJS en cochant explicitement toutes les permissions.  
**Fichiers modifiés :** Aucun (configuration EmailJS dashboard)

---

## ERR-003 — Template ID EmailJS incorrect
**Date :** Juin 2026  
**Symptôme :** Formulaire contact retournait "Erreur envoi" sur le site  
**Cause :** Le Template ID utilisé dans le code (`template_1a6jfwl`) correspondait à l'URL de la page, pas au vrai ID du template (`template_mhhezrn`)  
**Solution :** Correction du Template ID dans `index.html`  
**Fichiers modifiés :** `index.html`

---

## ERR-004 — Scroll navigation s'arrêtait au mauvais endroit
**Date :** Juin 2026  
**Symptôme :** En cliquant sur "Contact" dans la nav, le scroll s'arrêtait dans la section Ambiance. Il fallait cliquer deux fois.  
**Cause :** Les images de la galerie Ambiance étaient en `loading="lazy"`. Lors du scroll, elles se chargeaient et décalaient la hauteur de la page, faisant atterrir l'utilisateur au mauvais endroit.  
**Solution :** Passage de toutes les images galerie en `loading="eager"` + ajout `scroll-behavior: smooth` et `scroll-padding-top: 80px`  
**Fichiers modifiés :** `index.html`

---

## ERR-005 — Sitemap Google "Impossible de récupérer"
**Date :** Juin 2026  
**Symptôme :** Google Search Console affichait "Impossible de récupérer le sitemap" pour `/sitemap.xml`  
**Cause :** Google avait vérifié avant que le déploiement Vercel soit terminé. Le fichier était pourtant accessible.  
**Solution :** Ajout `vercel.json` avec Content-Type `application/xml` + ajout `robots.txt` référençant le sitemap. Actualisation dans Google Search Console.  
**Fichiers modifiés :** `vercel.json` (créé), `robots.txt` (créé)

---

## ERR-006 — Chatbot Marie proposait des réductions et pass gratuits
**Date :** Juin 2026  
**Symptôme :** Lors de tests utilisateurs, Marie inventait des réductions, offrait des pass gratuits et validait de faux accords oraux.  
**Cause :** Le system prompt Mistral ne contenait pas de règles strictes sur les tarifs et était vulnérable aux manipulations.  
**Solution :** Ajout de règles strictes dans le system prompt : tarifs intouchables, interdiction de réductions, règles anti-manipulation, âge minimum 14 ans, langage inclusif.  
**Fichiers modifiés :** `api/chat.js`

---

## ERR-007 — Liens Facebook incorrects
**Date :** Juin 2026  
**Symptôme :** Les liens Facebook pointaient vers `facebook.com/fitnestival2` (inexistant)  
**Cause :** Mauvaise URL renseignée initialement  
**Solution :** Remplacement par `https://www.facebook.com/fitnestival`  
**Fichiers modifiés :** `index.html`
