// pages/api/sync-user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { user } = req.body;

  if (!user || !user.email) return res.status(400).json({ error: 'Invalid user data' });

  try {
    const existing = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/usuarios?filters[email][$eq]=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (existing.data?.data?.length) {
      return res.status(200).json({ ok: true, message: 'User already exists' });
    }

    const created = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/usuarios`,
      {
        data: {
          username: user.name || user.email.split('@')[0],
          email: user.email,
          foto: user.picture || '',
          rol: 'cliente',
          provider: 'auth0',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    return res.status(201).json({ ok: true, user: created.data });
  } catch (err: any) {
    console.error('Error saving user in Strapi:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to sync user' });
  }
}
