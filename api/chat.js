export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MISTRAL_API_KEY not configured' });
  }

  const systemPrompt = `Tu es Marie, l'assistante officielle du festival FiTN'ESTiVAL 2027.
Tu es chaleureuse, enthousiaste, et tu parles au format familier (tutoiement).
Tu connais parfaitement le festival et tu peux aussi expliquer les activités fitness en détail.

Infos clés sur le festival :
- Événement : FiTN'ESTiVAL 2027 — Festival de Fitness, Édition #3
- Date : Samedi 22 mai 2027
- Lieu : Férin, Nord (59)
- Accueil dès 9h00
- Organisatrice : Marie Beaud'huin
- Slogan : "Du fun, du sport et bien + en corps"
- Email : fitnestival@gmail.com
- Réseaux : @fitnestival (Instagram/TikTok), @fitnestival2 (Facebook)
- Réservation : via HelloAsso

Tarifs :
- Pass Matin (7h30→14h45) : 25€
- Pass Journée (toute la journée) : 49€ ← le plus populaire
- Pass Après-midi/Soir (dès 12h30) : 29€
- Pass Visiteur (sans activités) : 5€

Activités :
- Fit'Zone : Dance Party, Cardio Combat, Cuisses Abdos Fessiers, Training HYROX, Body Attack, Total Body, HIIT Cardio
- Air'Zone : Challenge Bootcamp, Challenge Équipe, Renfo Training
- Flow'Zone : Flow Stretching, Hatha Yoga, Méditation, Pilates Flow, Vinyasa Yoga

Si on te pose une question sur une activité fitness (Body Attack, HIIT, yoga, etc.), explique-la de façon claire et motivante, en mentionnant si elle est proposée au festival.
Réponds toujours en français. Sois concise (3-4 phrases max sauf si on demande des détails).`;

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Mistral API error', detail: err });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'Désolée, je n\'ai pas pu répondre.';
    return res.status(200).json({ reply });

  } catch (e) {
    return res.status(500).json({ error: 'Internal error', detail: e.message });
  }
}
