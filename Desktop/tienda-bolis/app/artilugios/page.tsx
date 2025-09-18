"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ContactModal from "@/components/ContactModal";

export default function ArtilugiiosPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const artilugios = [
    {
      id: 1,
      nombre: "Taza OMLA Original",
      precio: "15€",
      imagen: "/La original web/Copia de Taza Omla Original.png",
      descripcion: "Taza cerámica con diseño bordado único. Perfecta para disfrutar de tu bebida favorita con estilo OMLA.",
      coleccion: "La Original"
    },
    {
      id: 2,
      nombre: "Libreta Bordada",
      precio: "20€",
      imagen: "/La original web/Taza Omla Original.png", // Usando imagen de placeholder hasta tener la real
      descripcion: "Libreta artesanal con cubierta bordada. Ideal para plasmar tus ideas y pensamientos más creativos.",
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
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-black/50 to-red-900/20" />
      </div>

      {/* Hero Section */}
            {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4">
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Título principal - visible inmediatamente */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-wide
                         text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-300 to-orange-600 mb-6">
            ARTILUGIOS
          </h1>
          
          {/* Descripción - visible inmediatamente */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Objetos únicos para el día a día
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Tazas y libretas que transforman lo cotidiano en extraordinario. 
              Cada artilugio está diseñado para acompañarte en tus momentos especiales.
            </p>
          </div>
        </div>
      </section>

      {/* Galería de artilugios */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {artilugios.map((artilugio, index) => (
              <Reveal key={artilugio.id} delay={index * 200}>
                <div className="group">
                  {/* Imagen principal */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-md border border-orange-400/20 shadow-2xl mb-6">
                    <Image
                      src={artilugio.imagen}
                      alt={artilugio.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge de colección */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-400/20 backdrop-blur-md border border-orange-400/30 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                        {artilugio.coleccion}
                      </span>
                    </div>
                    
                    {/* Precio */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-lg font-bold">
                        {artilugio.precio}
                      </span>
                    </div>
                  </div>
                  
                  {/* Información del producto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {artilugio.nombre}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed text-lg">
                      {artilugio.descripcion}
                    </p>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-black px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-orange-400/25"
                      >
                        Encargar Ahora
                      </button>
                      
                      <Link
                        href={`/${artilugio.coleccion.toLowerCase().replace(' ', '-')}`}
                        className="flex-1 border border-orange-400/30 text-orange-400 px-6 py-3 rounded-full font-semibold text-lg hover:bg-orange-400/10 transition-all duration-200 text-center"
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

      {/* Sección de detalles técnicos */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-md border-y border-orange-400/20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Detalles que Importan
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Cada artilugio está creado con atención a los detalles más pequeños
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={200}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-md border border-orange-400/20">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Tazas</h3>
                <div className="space-y-4 text-white/80">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="text-orange-400">Cerámica premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacidad:</span>
                    <span className="text-orange-400">350ml</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diseño:</span>
                    <span className="text-orange-400">Bordado aplicado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuidado:</span>
                    <span className="text-orange-400">Apto lavavajillas</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-md border border-red-400/20">
                <h3 className="text-2xl font-bold text-red-400 mb-6">Libretas</h3>
                <div className="space-y-4 text-white/80">
                  <div className="flex justify-between">
                    <span>Páginas:</span>
                    <span className="text-red-400">120 hojas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Papel:</span>
                    <span className="text-red-400">Premium 90gr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Encuadernación:</span>
                    <span className="text-red-400">Cosido artesanal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamaño:</span>
                    <span className="text-red-400">A5 (14x21cm)</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sección de inspiración */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Inspira tu Rutina Diaria
              </h2>
              <p className="text-xl text-white/70">
                Encuentra el artilugio perfecto para cada momento
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                momento: "Mañana",
                icono: "☀️",
                descripcion: "Comienza el día con tu taza OMLA y tu café favorito",
                color: "from-yellow-400 to-orange-500"
              },
              {
                momento: "Trabajo",
                icono: "✍️", 
                descripcion: "Plasma tus ideas más brillantes en tu libreta bordada",
                color: "from-orange-400 to-red-500"
              },
              {
                momento: "Descanso",
                icono: "🌙",
                descripcion: "Reflexiona y planifica en momentos de tranquilidad",
                color: "from-red-400 to-purple-500"
              }
            ].map((item, index) => (
              <Reveal key={item.momento} delay={index * 200}>
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-orange-400/20">
                  <div className="text-5xl mb-4">{item.icono}</div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                    {item.momento}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{item.descripcion}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Haz especial lo cotidiano
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Descubre cómo nuestros artilugios pueden transformar tu día a día
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-black px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-orange-400/25"
            >
              Descubrir Artilugios
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