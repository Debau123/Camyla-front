// Función helper para interactuar con Strapi
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function syncUserWithStrapi(auth0User) {
  try {
    console.log('🔄 Syncing user with Strapi:', { email: auth0User.email, name: auth0User.name });
    
    // Primero verificar si el usuario ya existe en Strapi
    const checkUrl = `${STRAPI_URL}/api/users?filters[email][$eq]=${auth0User.email}`;
    console.log('🔍 Checking if user exists:', checkUrl);
    
    const existingUserResponse = await fetch(checkUrl, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!existingUserResponse.ok) {
      throw new Error(`Failed to check existing user: ${existingUserResponse.status}`);
    }

    const existingUsers = await existingUserResponse.json();
    const users = Array.isArray(existingUsers) ? existingUsers : (existingUsers.data || []);
    console.log('👥 Found existing users:', users.length);
    
    // Si el usuario ya existe, actualizar información
    if (users.length > 0) {
      const existingUser = users[0];
      console.log('✏️ User exists, updating:', existingUser.id);
      
      const updateResponse = await fetch(
        `${STRAPI_URL}/api/users/${existingUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: auth0User.name || auth0User.email,
            email: auth0User.email,
            picture: auth0User.picture,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error(`Failed to update user: ${updateResponse.status} - ${errorText}`);
        throw new Error(`Failed to update user: ${updateResponse.status} - ${errorText}`);
      }

      const updatedUser = await updateResponse.json();
      console.log('✅ User updated successfully:', updatedUser.id || updatedUser.documentId);
      return updatedUser;
    } 
    // Si el usuario no existe, crear uno nuevo
    else {
      console.log('➕ Creating new user in Strapi');
      
      const createResponse = await fetch(
        `${STRAPI_URL}/api/users`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: auth0User.name || auth0User.email,
            email: auth0User.email,
            password: Math.random().toString(36).substring(2, 15), // Password temporal requerido
            confirmed: true,
            blocked: false,
            provider: 'auth0',
            picture: auth0User.picture,
            role: 1, // Rol por defecto (Authenticated)
          }),
        }
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error(`Failed to create user: ${createResponse.status} - ${errorText}`);
        throw new Error(`Failed to create user: ${createResponse.status} - ${errorText}`);
      }

      const newUser = await createResponse.json();
      console.log('✅ User created successfully:', newUser.id || newUser.documentId);
      return newUser;
    }
  } catch (error) {
    console.error('❌ Error syncing user with Strapi:', error);
    // No lanzamos el error para no interrumpir el flujo de autenticación
    return null;
  }
}
