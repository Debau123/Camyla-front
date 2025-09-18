"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ContactModal from "@/components/ContactModal";

export default function AccesoriosPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const accesorios = [
    {
      id: 1,
      nombre: "Pañuelo La Doña",
      precio: "25€",
      imagen: "/4 etapas/Pañuelo La Doña.png",
      descripcion: "Elegante pañuelo que representa la sabiduría y experiencia de La Doña. Un accesorio sofisticado para cualquier ocasión.",
      coleccion: "4 Etapas"
    },
    {
      id: 2,
      nombre: "Riñonera Bordada",
      precio: "35€",
      imagen: "/La original web/Taza Omla Original.png", // Usando imagen de placeholder hasta tener la real
      descripcion: "Riñonera práctica y elegante con bordados únicos. Perfecta para llevar tus esenciales con estilo.",
      coleccion: "La Original"
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Fondo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/fondo-oscuro-denso.webp"
          alt="Fondo"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/50 to-emerald-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4">
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Título principal - visible inmediatamente */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-wide
                         text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-600 mb-6">
            ACCESORIOS
          </h1>
          
          {/* Descripción - visible inmediatamente */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Complementos únicos que marcan la diferencia
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Pañuelos y riñoneras diseñados con el mismo cuidado artesanal que nuestras camisetas. 
              Cada accesorio es una declaración de estilo y personalidad.
            </p>
          </div>
        </div>
      </section>

      {/* Galería de accesorios */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {accesorios.map((accesorio, index) => (
              <Reveal key={accesorio.id} delay={index * 200}>
                <div className="group">
                  {/* Imagen principal */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border border-emerald-400/20 shadow-2xl mb-6">
                    <Image
                      src={accesorio.imagen}
                      alt={accesorio.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge de colección */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-400/20 backdrop-blur-md border border-emerald-400/30 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                        {accesorio.coleccion}
                      </span>
                    </div>
                    
                    {/* Precio */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-lg font-bold">
                        {accesorio.precio}
                      </span>
                    </div>
                  </div>
                  
                  {/* Información del producto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {accesorio.nombre}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed text-lg">
                      {accesorio.descripcion}
                    </p>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-emerald-400/25"
                      >
                        Encargar Ahora
                      </button>
                      
                      <Link
                        href={`/${accesorio.coleccion.toLowerCase().replace(' ', '-')}`}
                        className="flex-1 border border-emerald-400/30 text-emerald-400 px-6 py-3 rounded-full font-semibold text-lg hover:bg-emerald-400/10 transition-all duration-200 text-center"
                      >
                        Ver Colección
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border-y border-emerald-400/20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Características Especiales
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Cada accesorio está pensado para acompañarte en tu día a día
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icono: "🧵",
                titulo: "Bordado Detallado",
                descripcion: "Cada puntada está cuidadosamente colocada para crear patrones únicos y duraderos"
              },
              {
                icono: "✨", 
                titulo: "Materiales Premium",
                descripcion: "Utilizamos solo los mejores materiales para garantizar comodidad y durabilidad"
              },
              {
                icono: "🎨",
                titulo: "Diseño Exclusivo",
                descripcion: "Cada accesorio es una pieza única que no encontrarás en ningún otro lugar"
              }
            ].map((item, index) => (
              <Reveal key={item.titulo} delay={index * 200}>
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-emerald-400/20">
                  <div className="text-5xl mb-4">{item.icono}</div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">{item.titulo}</h3>
                  <p className="text-white/70 leading-relaxed">{item.descripcion}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de usos */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Versátiles y Funcionales
              </h2>
              <p className="text-xl text-white/70">
                Perfectos para cualquier ocasión
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={200}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border border-emerald-400/20">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">Pañuelos</h3>
                <ul className="space-y-3 text-white/80">
                  <li>• Complemento elegante para cualquier outfit</li>
                  <li>• Protección solar con estilo</li>
                  <li>• Accesorio perfecto para el cabello</li>
                  <li>• Regalo ideal para ocasiones especiales</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 backdrop-blur-md border border-cyan-400/20">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Riñoneras</h3>
                <ul className="space-y-3 text-white/80">
                  <li>• Comodidad y estilo en movimiento</li>
                  <li>• Perfecta para festivales y eventos</li>
                  <li>• Manos libres sin renunciar al estilo</li>
                  <li>• Capacidad ideal para lo esencial</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Completa tu look único
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Descubre cómo nuestros accesorios pueden transformar tu estilo
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-emerald-400/25"
            >
              Explorar Accesorios
            </button>
          </Reveal>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  );
}