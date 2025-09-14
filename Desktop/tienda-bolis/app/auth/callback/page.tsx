"use client";

import { useEffect, useState } from "react";

export default function StrapiCallbackPage() {
  const [msg, setMsg] = useState("Procesando login con Strapi…");

  useEffect(() => {
    (async () => {
      try {
        const url = new URL(window.location.href);
        const qs = url.searchParams;

        // Strapi puede enviar el token como 'access_token' o 'jwt'
        const token =
          qs.get("access_token") || qs.get("jwt") || qs.get("token");

        if (!token) {
          setMsg("No llegó ningún token desde Strapi.");
          return;
        }

        // Guarda el JWT de Strapi para tus llamadas al CMS
        localStorage.setItem("strapi_jwt", token);

        // (Opcional) Trae el usuario de Strapi para guardarlo
        try {
          const base = process.env.NEXT_PUBLIC_STRAPI_URL || "https://best-bat-ac6680208e.strapiapp.com";
          const meRes = await fetch(`${base}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (meRes.ok) {
            const me = await meRes.json();
            localStorage.setItem("strapi_user", JSON.stringify(me));
          }
        } catch {
          // no pasa nada si falla: siempre puedes pedirlo más tarde
        }

        setMsg("¡Listo! Redirigiendo…");

        // Redirige al inicio o donde quieras
        window.location.replace("/");
      } catch (e) {
        setMsg("Hubo un problema procesando el callback.");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>{msg}</h1>
      <p>Si esto tarda, recarga la página.</p>
    </div>
  );
}
