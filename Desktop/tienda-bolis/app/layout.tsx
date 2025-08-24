import "./globals.css";
import Navbar from "@/components/Navbar";
import SplashIntro from "@/components/SplashIntro";
import ContentGate from "@/components/ContentGate";
import Footer from "@/components/Footer";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://omla.example"), // ajústalo
  title: {
    template: "OMLA · %s",
    default: "OMLA · Shop",
  },
  description: "Tienda de bolis, camisetas y pegatinas",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "OMLA · Shop",
    description: "Bolis, camisetas y pegatinas con estilo. Calidad premium y envío a tu puerta.",
    url: "/",
    siteName: "OMLA Shop",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "OMLA Shop" }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMLA · Shop",
    description: "Bolis, camisetas y pegatinas con estilo.",
    images: ["/og-cover.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-black">
      <head>
        {/* Preloads básicos */}
        <link rel="preload" as="image" href="/logo-camyla-white.png" />
        {/* Oculta TODO menos el SplashRoot SOLO si aún no se ha visto el splash en esta sesión */}
        <Script id="splash-style" strategy="beforeInteractive">
          {`try{
            if(location.pathname === "/" && !sessionStorage.getItem("omlaSplashSeen")){
              const s = document.createElement("style");
              s.id = "splash-hide";
              s.textContent = "body > *:not(#SplashRoot){opacity:0!important;visibility:hidden!important;pointer-events:none!important}";
              document.head.appendChild(s);
            }
          }catch(e){/* noop */}`}
        </Script>
      </head>

      <body className="min-h-screen text-white selection:bg-amber-400/40 selection:text-black antialiased scroll-smooth">
        {/* Splash (sólo se muestra si no se ha visto en esta sesión) */}
        <SplashIntro />

        {/* Gate: NO renderiza navbar + contenido mientras el splash esté activo por primera vez */}
        <ContentGate>
          <Navbar />
          <div id="AppContent">{children}</div>
          <Footer />
        </ContentGate>

        {/* Limpieza de estilo de ocultación por si quedara colgado en algún edge-case */}
        <Script id="splash-cleanup" strategy="afterInteractive">
          {`try{
            const el = document.getElementById("splash-hide");
            if(el) el.remove();
          }catch(e){/* noop */}`}
        </Script>
      </body>
    </html>
  );
}
