// API de synchronisation PRONO'XP (pronos/index.html)
// Stocke l'état complet du jeu (joueurs, matchs, paris) dans Vercel Blob
// pour que tous les copains voient la même partie depuis leur téléphone.
//
// Le store Blob "pronoxp" est relié au projet : la variable
// BLOB_READ_WRITE_TOKEN est fournie automatiquement par Vercel.
// Sans elle, l'API répond 503 et l'appli fonctionne en mode local.

import { put, list } from '@vercel/blob';

const PATH = 'pronoxp/state.json';
const MAX_BYTES = 200_000; // garde-fou : l'état du jeu reste tout petit

async function readState() {
  const { blobs } = await list({ prefix: PATH });
  const blob = blobs.find((b) => b.pathname === PATH);
  if (!blob) return { v: 0, data: null };
  // paramètre unique pour contourner le cache CDN et lire la dernière version
  const r = await fetch(`${blob.url}?nocache=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(`blob read ${r.status}`);
  return r.json();
}

export default async function handler(req, res) {
  // jamais de cache : chaque lecture doit refléter le dernier pari
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: 'not-configured' });
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(await readState());
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
      const cur = await readState();
      if (v !== cur.v) {
        return res.status(409).json({ error: 'conflict', v: cur.v });
      }
      await put(PATH, payload, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60, // minimum Vercel ; les lectures contournent le cache
      });
      return res.status(200).json({ ok: true, v: v + 1 });
    }

    return res.status(405).json({ error: 'method-not-allowed' });
  } catch (e) {
    return res.status(502).json({ error: 'storage-error' });
  }
}
