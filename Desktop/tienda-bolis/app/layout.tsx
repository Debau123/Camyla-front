// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import SplashIntro from "@/components/SplashIntro";
import ContentGate from "@/components/ContentGate";
import Footer from "@/components/Footer";
import Script from "next/script";
import type { Metadata } from "next";
import { auth0 } from "@/lib/auth0"; // ⬅️ usamos el cliente server

// (Deja aquí tu metadata actual)
export const metadata: Metadata = {};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth0.getSession();   // ⬅️ v4: obtiene la sesión en servidor
  const user = session?.user ?? null;

  return (
    <html lang="es" className="bg-black">
      <head>
        <link rel="preload" as="image" href="/logo-camyla-white.png" />
        <Script id="splash-style" strategy="beforeInteractive">
          {`try{
            if(location.pathname === "/" && !sessionStorage.getItem("omlaSplashSeen")){
              const s=document.createElement("style"); s.id="splash-hide";
              s.textContent="body > *:not(#SplashRoot){opacity:0!important;visibility:hidden!important;pointer-events:none!important}";
              document.head.appendChild(s);
            }
          }catch(e){}`}
        </Script>
      </head>

      <body className="min-h-screen text-white selection:bg-amber-400/40 selection:text-black antialiased scroll-smooth">
        <SplashIntro />
        <ContentGate>
          <Navbar user={user} />   {/* ⬅️ pasamos el usuario al navbar */}
          <div id="AppContent">{children}</div>
          <Footer />
        </ContentGate>

        <Script id="splash-cleanup" strategy="afterInteractive">
          {`try{const el=document.getElementById("splash-hide"); if(el) el.remove();}catch(e){}`}
        </Script>
      </body>
    </html>
  );
}
