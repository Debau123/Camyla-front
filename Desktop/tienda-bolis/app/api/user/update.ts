import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body = await request.json();
  const userCookie = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith('auth0_user='));
  if (!userCookie) {
    return NextResponse.json({ error: 'No user' }, { status: 401 });
  }
  const user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  
  try {
    // Autenticar en Strapi
    const authResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: user.email,
        password: 'temp_password_123'
      }),
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with Strapi');
    }

    const authData = await authResponse.json();
    const strapiJwt = authData.jwt;

    // Buscar el customer
    const customerResponse = await fetch(`${STRAPI_URL}/api/customers?filters[email][$eq]=${user.email}`, {
      headers: {
        'Authorization': `Bearer ${strapiJwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!customerResponse.ok) {
      throw new Error('Failed to find customer');
    }

    const customerData = await customerResponse.json();
    
    if (!customerData.data || customerData.data.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customerId = customerData.data[0].id;

    // Actualizar el customer
    const updateResponse = await fetch(`${STRAPI_URL}/api/customers/${customerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${strapiJwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: body }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update customer');
    }

    const updateData = await updateResponse.json();
    return NextResponse.json({ user: { ...updateData.data.attributes, id: updateData.data.id } });
    
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
