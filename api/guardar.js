import { neon } from '@neondatabase/serverless';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO respuestas_form (datos)
      VALUES (${JSON.stringify(body)}::jsonb)
    `;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al guardar en BD' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}