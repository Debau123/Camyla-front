// components/auth/LoginButton.tsx
"use client";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  if (isLoading || isAuthenticated) return null;

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="px-4 py-2 rounded bg-black text-white"
    >
      Iniciar sesión
    </button>
  );
}
