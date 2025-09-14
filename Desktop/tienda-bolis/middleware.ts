// middleware.ts
export { auth } from './auth';

export const config = {
  matcher: ['/admin/:path*', '/mi-cuenta/:path*'], // rutas protegidas
};
