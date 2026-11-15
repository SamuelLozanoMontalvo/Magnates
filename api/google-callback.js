export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.status(400).json({ error: `Autorización cancelada o fallida: ${error}` });
  }

  if (!code) {
    return res.status(400).json({ error: 'No se recibió el código de autorización de Google' });
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(400).json({ error: 'Error al obtener tokens', details: tokens });
    }

    return res.status(200).json({
      mensaje: 'Conexión exitosa con Google Business Profile',
      tiene_access_token: Boolean(tokens.access_token),
      tiene_refresh_token: Boolean(tokens.refresh_token),
      expira_en_segundos: tokens.expires_in
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
}