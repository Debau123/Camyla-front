"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO_PRIMARY = "/logo-camyla-white.png";
const LOGO_FALLBACK = "/logo-camyla-white.webp";

export default function SplashIntro() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState(LOGO_PRIMARY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    // ¿Ya se mostró esta sesión?
    const seen = typeof window !== "undefined" && sessionStorage.getItem("omlaSplashSeen");
    if (seen) {
      // Por si quedó el estilo inyectado de alguna recarga anterior:
      const s = document.getElementById("splash-hide"); if (s) s.remove();
      return;
    }

    setShow(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const duration = prefersReduced ? 0 : 2500;
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("omlaSplashSeen", "1"); // marca como visto
    }, duration);

    const close = () => {
      setShow(false);
      sessionStorage.setItem("omlaSplashSeen", "1");
    };
    window.addEventListener("keydown", close);
    window.addEventListener("click", close);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", close);
      window.removeEventListener("click", close);
    };
  }, [pathname]);

  // Al ocultarse el splash, quita el <style> que ocultaba la app
  useEffect(() => {
    if (!show) {
      const s = document.getElementById("splash-hide");
      if (s) s.remove();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      id="SplashRoot"
      style={{
        position: "fixed",
        inset: 0 as any,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* Overlay transparente: se ve tu fondo animado */}
      <div
        style={{
          position: "absolute",
          inset: 0 as any,
          background: "transparent", // pon 'rgba(0,0,0,.55)' si quieres un velo
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Logo + fallback */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        {!loaded && (
          <div
            style={{
              fontSize: "clamp(40px, 8vw, 84px)",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              background:
                "linear-gradient(90deg,#d4af37 0%,#f4d169 35%,#f8e08e 55%,#f4d169 75%,#d4af37 100%)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,.6))",
              paddingInline: 16,
              userSelect: "none",
            }}
          >
            OMLA
          </div>
        )}

        <img
          src={src}
          alt="OMLA"
          width={800}
          height={200}
          style={{
            display: "block",
            width: "min(640px, 80vw)",
            height: "auto",
            marginInline: "auto",
            filter: "drop-shadow(0 10px 28px rgba(0,0,0,.6))",
            opacity: loaded ? 1 : 0,
            transition: "opacity .2s ease",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (src !== LOGO_FALLBACK) {
              setSrc(LOGO_FALLBACK);
              setLoaded(false);
            }
          }}
        />
      </div>
    </div>
  );
}
