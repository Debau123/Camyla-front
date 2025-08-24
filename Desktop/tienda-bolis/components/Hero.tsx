
"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 pb-16 text-center">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Personaliza. Nosotros lo fabricamos.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Bolígrafos, camisetas y pegatinas con tu marca. Diseño propio y producción bajo demanda.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/catalogo"
            className="rounded-full border border-white/20 bg-white/15 px-5 py-2.5 text-white hover:bg-white/20 backdrop-blur-md transition"
          >
            Ver catálogo
          </Link>
          <Link
            href="/sobre"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white/90 hover:bg-white/15 backdrop-blur-md transition"
          >
            Cómo funciona
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
