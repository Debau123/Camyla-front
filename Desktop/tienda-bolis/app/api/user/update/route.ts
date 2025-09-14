import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    // Obtener usuario de Auth0 desde las cookies
    const userCookie = request.cookies.get('auth0_user');
    if (!userCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const auth0User = JSON.parse(userCookie.value);
    const updateData = await request.json();
    
    // Buscar el usuario en Strapi primero
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
    
    const findResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${auth0User.email}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!findResponse.ok) {
      throw new Error(`Failed to find user in Strapi: ${findResponse.status}`);
    }

    const findData = await findResponse.json();
    const users = Array.isArray(findData) ? findData : (findData.data || []);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found in Strapi' }, { status: 404 });
    }

    const strapiUser = users[0];

    // Actualizar el usuario en Strapi
    const updateResponse = await fetch(
      `${STRAPI_URL}/api/users/${strapiUser.id}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: updateData.username,
          picture: updateData.picture,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(`Failed to update user in Strapi: ${updateResponse.status} - ${errorText}`);
    }

    const updatedUser = await updateResponse.json();

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
