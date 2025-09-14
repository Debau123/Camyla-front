import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Obtener usuario de Auth0 desde las cookies
    const userCookie = request.cookies.get('auth0_user');
    if (!userCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const auth0User = JSON.parse(userCookie.value);
    
    // Buscar el usuario en Strapi
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
    
    const response = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${auth0User.email}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user from Strapi: ${response.status}`);
    }

    const data = await response.json();
    const users = Array.isArray(data) ? data : (data.data || []);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found in Strapi' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
