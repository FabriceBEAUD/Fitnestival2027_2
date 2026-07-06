// API de synchronisation PRONO'XP (pronos/index.html)
// Stocke l'état complet du jeu (joueurs, matchs, paris) dans Upstash Redis
// pour que tous les copains voient la même partie depuis leur téléphone.
//
// Configuration requise (Vercel Dashboard → Storage → Upstash Redis) :
// les variables UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// (ou KV_REST_API_URL / KV_REST_API_TOKEN) sont créées automatiquement.
// Sans elles, l'API répond 503 et l'appli fonctionne en mode local.

const KEY = 'pronoxp:cdm2026';
const MAX_BYTES = 200_000; // garde-fou : l'état du jeu reste tout petit

export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return res.status(503).json({ error: 'not-configured' });
  }

  const redis = async (cmd) => {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
    });
    if (!r.ok) throw new Error(`redis ${r.status}`);
    return r.json();
  };

  try {
    if (req.method === 'GET') {
      const { result } = await redis(['GET', KEY]);
      return res.status(200).json(result ? JSON.parse(result) : { v: 0, data: null });
    }

    if (req.method === 'POST') {
      const { v, data } = req.body || {};
      if (typeof v !== 'number' || !data || typeof data !== 'object') {
        return res.status(400).json({ error: 'bad-request' });
      }
      const payload = JSON.stringify({ v: v + 1, data });
      if (payload.length > MAX_BYTES) {
        return res.status(413).json({ error: 'too-large' });
      }
      // Contrôle de version optimiste : si quelqu'un a écrit entre-temps,
      // on refuse pour que le client récupère la version la plus récente.
      const cur = await redis(['GET', KEY]);
      const curV = cur.result ? JSON.parse(cur.result).v : 0;
      if (v !== curV) {
        return res.status(409).json({ error: 'conflict', v: curV });
      }
      await redis(['SET', KEY, payload]);
      return res.status(200).json({ ok: true, v: v + 1 });
    }

    return res.status(405).json({ error: 'method-not-allowed' });
  } catch (e) {
    return res.status(502).json({ error: 'storage-error' });
  }
}
