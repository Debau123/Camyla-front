"use client";

import { useState } from "react";
import Link from "next/link";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import ContactModal from "@/components/ContactModal";
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import HeaderTitle from "@/components/HeaderTitle";
import UspStrip from "@/components/UspStrip";


export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-20">
      
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <HeaderTitle />
          <p className="mt-4 text-white/80 text-lg">
            Descubre el mundo de OMLA.<br />
            Cada diseño cuenta una historia.
          </p>
          

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsContactModalOpen(true)}
              aria-label="Hacer un pedido personalizado"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Hacer pedido
            </button>
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
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-white">Cómo funciona</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Squares2X2Icon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold text-white">1. Explora</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Descubre nuestra colección y las 4 etapas de nuestro proceso artesanal.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold text-white">2. Contacta</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Escríbenos por WhatsApp o email para conversar sobre tu idea personalizada.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold text-white">3. Diseñamos</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Creamos un diseño único para ti con técnicas artesanales tradicionales.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <TruckIcon className="h-6 w-6 text-white/90" />
              <h3 className="font-semibold text-white">4. Entregamos</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Tu pieza única terminada y lista para contar su historia especial.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={() => setIsContactModalOpen(true)}
            aria-label="Hacer un pedido desde Cómo funciona"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
            <EnvelopeIcon className="h-5 w-5" />
            Empezar mi pedido
          </button>
        </div>
      </section>

      {/* Modal de contacto */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  );
}
