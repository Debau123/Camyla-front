"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { PRODUCTS } from "@/data/products";

export default function Showcase() {
  const items = PRODUCTS.slice(0, 6); // muestra 6
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <Reveal>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Colección destacada</h2>
          <Link
            href="/catalogo"
            className="text-sm text-white/85 hover:text-white underline underline-offset-4"
          >
            Ver todo
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={0.05 * i}>
            <Link
              href={`/producto/${p.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/15 bg-white/10 transition hover:bg-white/15 backdrop-blur-md"
            >
              {/* Bloque visual (usa imagen si existe; si no, fallback) */}
              <div
                className="relative aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5"
                style={
                  p.image
                    ? {
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }
                    : undefined
                }
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{p.name}</h3>
                  <span className="text-white/85">{(p.price / 100).toFixed(2)} €</span>
                </div>
                <p className="mt-1 text-sm text-white/70 line-clamp-1">
                  Personalizable · Alta calidad
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
