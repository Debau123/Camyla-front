import Link from "next/link";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import HeaderTitle from "@/components/HeaderTitle";
import UspStrip from "@/components/UspStrip";


export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-20">
      
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <HeaderTitle />
          <p className="mt-4 text-white/80 text-lg">
            Bolis, camisetas y pegatinas con estilo. Calidad premium y envío a tu puerta. Hola que tal
          </p>
          

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/catalogo"
              aria-label="Ir al catálogo completo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              <Squares2X2Icon className="h-5 w-5" />
              Ver catálogo
            </Link>
            <Link
              href="#como-funciona"
              aria-label="Bajar a la sección Cómo funciona"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section aria-label="Ventajas de OMLA" className="space-y-4">
        <UspStrip />
      </section>

      {/* DESTACADOS + CARRUSEL */}
      <section id="destacados" className="space-y-6" aria-label="Destacados">
        <div className="mx-auto max-w-3xl text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Descubre lo que viene
          </h2>
          <p className="text-white/70">
            Un adelanto del catálogo: camisetas, bolis y pegatinas con estilo OMLA.
          </p>
        </div>

        {/* Si ShowcaseCarousel es pesado, dentro usa dynamic import con ssr:false */}
        <div className="mx-auto">
          <ShowcaseCarousel />
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="space-y-8" aria-label="Cómo funciona">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">Cómo funciona</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Squares2X2Icon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold">1. Explora</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Descubre categorías y colecciones con diseños actuales.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShoppingBagIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold">2. Elige y añade</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Escoge talla, color o pack y añádelo al carrito en un click.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold">3. Pago seguro</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Checkout protegido. (Integraremos Stripe al final, como acordamos).
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <TruckIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold">4. Producción & envío</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Impresión bajo demanda y envío rápido. (Conectaremos Gelato al final).
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/catalogo"
            aria-label="Ir al catálogo desde Cómo funciona"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
            Ir al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
