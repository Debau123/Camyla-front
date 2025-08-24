"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ContentGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(true); // por defecto: listo

  useEffect(() => {
    if (pathname !== "/") {
      setReady(true);
      return;
    }
    const seen = sessionStorage.getItem("omlaSplashSeen") === "1";
    if (seen) {
      setReady(true); // ya se mostró: no bloqueamos
      return;
    }
    setReady(false); // primera vez → espera un poco más que el splash
    const t = setTimeout(() => setReady(true), 2600);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!ready) return null;
  return <>{children}</>;
}
