// lib/auth0.ts
import { getSession, withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export const auth0 = {
  getSession,
  withApiAuthRequired,
  getAccessToken,
};

