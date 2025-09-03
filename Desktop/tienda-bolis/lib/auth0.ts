// lib/auth0.ts
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();
/* El SDK cogerá DOMAIN, CLIENT_ID, CLIENT_SECRET, SECRET y APP_BASE_URL
   de tu .env.local automáticamente */
