import { NextResponse } from 'next/server';
import { syncUserWithStrapi } from '../../../../lib/strapi.js';

export async function GET(request, { params }) {
  const path = params.auth0?.[0];
  console.log('Auth0 route called:', path, 'params:', params);
  
  if (!path) {
    return NextResponse.json({ error: 'Path not specified' }, { status: 400 });
  }
  
  try {
    switch (path) {
      case 'login': {
        const baseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';
        const authUrl = `https://${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
          `client_id=${process.env.AUTH0_CLIENT_ID}&` +
          `redirect_uri=${encodeURIComponent(baseUrl + '/api/auth/callback')}&` +
          `response_type=code&` +
          `scope=${encodeURIComponent('openid profile email')}`;
        
        console.log('Redirecting to Auth0:', authUrl);
        return NextResponse.redirect(authUrl);
      }
      
      case 'logout': {
        const baseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';
        const logoutUrl = `https://${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
          `client_id=${process.env.AUTH0_CLIENT_ID}&` +
          `returnTo=${encodeURIComponent(baseUrl)}`;
        
        console.log('Redirecting to logout:', logoutUrl);
        
        // Crear respuesta con redirección y limpiar cookies
        const response = NextResponse.redirect(logoutUrl);
        response.cookies.delete('auth0_user');
        response.cookies.delete('auth0_access_token');
        
        return response;
      }
      
      case 'me': {
        // Endpoint para obtener el usuario actual
        const userCookie = request.cookies.get('auth0_user');
        if (!userCookie) {
          return NextResponse.json({ user: null }, { status: 200 });
        }
        
        try {
          const user = JSON.parse(userCookie.value);
          return NextResponse.json({ user }, { status: 200 });
        } catch (error) {
          console.error('Failed to parse user cookie:', error);
          return NextResponse.json({ user: null }, { status: 200 });
        }
      }
      
      case 'callback': {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        console.log('Auth callback - code:', code, 'state:', state);
        
        if (!code) {
          console.error('No authorization code received');
          return NextResponse.json({ error: 'No authorization code' }, { status: 400 });
        }

        try {
          // Intercambiar el código por tokens
          const tokenResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: process.env.AUTH0_CLIENT_ID,
              client_secret: process.env.AUTH0_CLIENT_SECRET,
              code: code,
              redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
            }),
          });

          if (!tokenResponse.ok) {
            const error = await tokenResponse.text();
            console.error('Token exchange failed:', error);
            return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
          }

          const tokens = await tokenResponse.json();
          console.log('Tokens received:', { 
            access_token: tokens.access_token ? 'present' : 'missing',
            id_token: tokens.id_token ? 'present' : 'missing',
          });

          // Obtener información del usuario
          const userResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
            },
          });

          if (!userResponse.ok) {
            console.error('Failed to get user info');
            return NextResponse.json({ error: 'Failed to get user info' }, { status: 500 });
          }

          const user = await userResponse.json();
          console.log('User info:', { sub: user.sub, email: user.email, name: user.name });

          // Sincronizar usuario con Strapi
          console.log('🔄 Starting Strapi sync for user:', user.email);
          try {
            const syncResult = await syncUserWithStrapi(user);
            console.log('✅ Strapi sync result:', syncResult ? 'Success' : 'Warning');
          } catch (syncError) {
            console.error('❌ Strapi sync error:', syncError);
          }

          // Crear respuesta con redirección y cookies para la sesión
          const baseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';
          const response = NextResponse.redirect(baseUrl);
          
          // Establecer cookies de sesión (simplificado)
          response.cookies.set('auth0_user', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 días
          });
          
          response.cookies.set('auth0_access_token', tokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 día
          });

          return response;

        } catch (error) {
          console.error('Callback error:', error);
          return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
        }
      }
      
      default:
        return NextResponse.json({ error: `Unknown path: ${path}` }, { status: 404 });
    }
  } catch (error) {
    console.error('Auth0 route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request, context) {
  return GET(request, context);
}
