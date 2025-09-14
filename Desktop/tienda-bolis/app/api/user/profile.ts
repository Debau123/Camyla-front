import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Obtener usuario logueado desde cookie
  const userCookie = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith('auth0_user='));
  if (!userCookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));

  // Primero, crear o encontrar el usuario en Strapi para obtener el JWT
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  
  // Usar las credenciales de Auth0 para autenticarse en Strapi
  try {
    // Intentar autenticar en Strapi con email/password (crear si no existe)
    const authResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: user.email,
        password: 'temp_password_123' // Password temporal
      }),
    });

    let strapiJwt;
    
    if (!authResponse.ok) {
      // Si no existe, registrar el usuario en Strapi
      const registerResponse = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.name || user.email.split('@')[0],
          email: user.email,
          password: 'temp_password_123'
        }),
      });

      if (!registerResponse.ok) {
        throw new Error('Failed to register user in Strapi');
      }

      const registerData = await registerResponse.json();
      strapiJwt = registerData.jwt;
    } else {
      const authData = await authResponse.json();
      strapiJwt = authData.jwt;
    }

    // Buscar el customer usando el JWT de usuario autenticado
    const customerResponse = await fetch(`${STRAPI_URL}/api/customers?filters[email][$eq]=${user.email}`, {
      headers: {
        'Authorization': `Bearer ${strapiJwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!customerResponse.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const customerData = await customerResponse.json();
    
    if (customerData.data && customerData.data.length > 0) {
      return NextResponse.json({ 
        user: { ...customerData.data[0].attributes, id: customerData.data[0].id },
        jwt: strapiJwt 
      });
    } else {
      // Crear customer si no existe
      const createCustomerResponse = await fetch(`${STRAPI_URL}/api/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strapiJwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email: user.email,
            name: user.name,
            picture: user.picture,
            auth0Id: user.sub,
          }
        }),
      });

      if (!createCustomerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const newCustomerData = await createCustomerResponse.json();
      return NextResponse.json({ 
        user: { ...newCustomerData.data.attributes, id: newCustomerData.data.id },
        jwt: strapiJwt 
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
