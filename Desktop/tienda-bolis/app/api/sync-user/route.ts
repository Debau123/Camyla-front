// app/api/sync-user/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Importar la función desde el archivo JS
const { syncUserWithStrapi } = require('../../../lib/strapi.js');

export async function GET() {
  try {
    // Test de conectividad con Strapi
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
    
    console.log('Testing Strapi connection...');
    console.log('URL:', STRAPI_URL);
    console.log('Token:', STRAPI_TOKEN ? 'present' : 'missing');
    
    const response = await fetch(`${STRAPI_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Strapi connection failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Strapi puede devolver un array directamente o un objeto con data
    const users = Array.isArray(data) ? data : (data.data || []);
    const userCount = Array.isArray(data) ? data.length : (data.meta?.pagination?.total || users.length);
    
    return NextResponse.json({
      success: true,
      message: 'Strapi connection successful',
      userCount: userCount,
      users: users
    });
    
  } catch (error) {
    console.error('Strapi test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user) {
      return NextResponse.json({ error: 'User data required' }, { status: 400 });
    }

    console.log('Manual user sync requested for:', user.email);
    
    const result = await syncUserWithStrapi(user);
    
    return NextResponse.json({
      success: true,
      message: result ? 'User synced successfully' : 'Sync completed with warnings',
      user: result
    });
    
  } catch (error) {
    console.error('Manual user sync failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
