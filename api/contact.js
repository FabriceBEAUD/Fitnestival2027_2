export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prenom, nom, email, interet, message } = req.body;

  if (!prenom || !email) {
    return res.status(400).json({ error: 'Prénom et email requis' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY non configurée' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'FiTN\'ESTiVAL <onboarding@resend.dev>',
        to: ['fbeaudhuin@gmail.com'],
        reply_to: email,
        subject: `📩 Nouveau message de ${prenom} ${nom} — ${interet}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #5a0bb7, #d01dd7); padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">💌 Nouveau message FiTN'ESTiVAL</h1>
            </div>
            <div style="background: #f7f2fb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2d4f5;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #5a3a7a; font-weight: bold; width: 140px;">Prénom / Nom</td>
                  <td style="padding: 8px 0; color: #1d1030;">${prenom} ${nom}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5a3a7a; font-weight: bold;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #5a0bb7;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5a3a7a; font-weight: bold;">Intérêt</td>
                  <td style="padding: 8px 0; color: #1d1030;">${interet}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding: 8px 0; color: #5a3a7a; font-weight: bold; vertical-align: top;">Message</td>
                  <td style="padding: 8px 0; color: #1d1030;">${message.replace(/\n/g, '<br>')}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 20px; padding: 12px; background: #fff; border-radius: 8px; border-left: 4px solid #5a0bb7;">
                <p style="margin: 0; color: #9b7ec8; font-size: 13px;">
                  📅 Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Erreur Resend', detail: err });
    }

    return res.status(200).json({ success: true });

  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur', detail: e.message });
  }
}
