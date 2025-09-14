// lib/strapi.ts
export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  name?: string;
  auth0Id: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  username: string;
  email: string;
  name?: string;
  auth0Id: string;
  picture?: string;
}

class StrapiAPI {
  private baseURL: string;
  private apiToken: string;

  constructor() {
    this.baseURL = process.env.STRAPI_URL || '';
    this.apiToken = process.env.STRAPI_API_TOKEN || '';
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`,
        ...options.headers,
      },
    };

    try {
      console.log(`Strapi API: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Strapi API Error:', response.status, error);
        throw new Error(`Strapi API Error: ${response.status} - ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Strapi request failed:', error);
      throw error;
    }
  }

  // Buscar usuario por auth0Id
  async findUserByAuth0Id(auth0Id: string): Promise<StrapiUser | null> {
    try {
      const response = await this.request(`/users?filters[auth0Id][$eq]=${encodeURIComponent(auth0Id)}`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error finding user by Auth0 ID:', error);
      return null;
    }
  }

  // Buscar usuario por email
  async findUserByEmail(email: string): Promise<StrapiUser | null> {
    try {
      const response = await this.request(`/users?filters[email][$eq]=${encodeURIComponent(email)}`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  // Crear nuevo usuario
  async createUser(userData: CreateUserData): Promise<StrapiUser | null> {
    try {
      const response = await this.request('/users', {
        method: 'POST',
        body: JSON.stringify({
          data: userData
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  // Actualizar usuario existente
  async updateUser(id: number, userData: Partial<CreateUserData>): Promise<StrapiUser | null> {
    try {
      const response = await this.request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          data: userData
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  // Sincronizar usuario desde Auth0
  async syncUserFromAuth0(auth0User: any): Promise<StrapiUser | null> {
    try {
      console.log('Syncing user from Auth0:', auth0User.email);

      // Primero buscar por auth0Id
      let strapiUser = await this.findUserByAuth0Id(auth0User.sub);
      
      // Si no existe, buscar por email
      if (!strapiUser) {
        strapiUser = await this.findUserByEmail(auth0User.email);
      }

      // Datos del usuario para crear/actualizar
      const userData: CreateUserData = {
        username: auth0User.email, // Usar email como username
        email: auth0User.email,
        name: auth0User.name,
        auth0Id: auth0User.sub,
        picture: auth0User.picture,
      };

      if (strapiUser) {
        // Usuario existe, actualizar datos
        console.log('User exists in Strapi, updating...');
        
        // Solo actualizar auth0Id si no lo tenía
        const updateData: Partial<CreateUserData> = {};
        if (strapiUser.auth0Id !== auth0User.sub) {
          updateData.auth0Id = auth0User.sub;
        }
        if (strapiUser.name !== auth0User.name) {
          updateData.name = auth0User.name;
        }
        if (strapiUser.picture !== auth0User.picture) {
          updateData.picture = auth0User.picture;
        }

        // Solo actualizar si hay cambios
        if (Object.keys(updateData).length > 0) {
          strapiUser = await this.updateUser(strapiUser.id, updateData);
        }
      } else {
        // Usuario no existe, crear nuevo
        console.log('User does not exist in Strapi, creating...');
        strapiUser = await this.createUser(userData);
      }

      if (strapiUser) {
        console.log('User synced successfully:', strapiUser.email);
      }

      return strapiUser;
    } catch (error) {
      console.error('Error syncing user from Auth0:', error);
      return null;
    }
  }
}

export const strapiAPI = new StrapiAPI();
