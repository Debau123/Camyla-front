"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ContactModal from "@/components/ContactModal";

export default function CamisetasPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const camisetas = [
    {
      id: 1,
      nombre: "Camiseta OMLA The Original",
      precio: "28€",
      imagen: "/La original web/Camiseta Omla The original ( 28€).png",
      descripcion: "Camiseta con diseño original bordado a mano. Una pieza única que representa la esencia de OMLA.",
      coleccion: "La Original"
    },
    {
      id: 2,
      nombre: "Camiseta 4 Stages",
      precio: "30€",
      imagen: "/4 etapas/Camiseta 4 Stages.png",
      descripcion: "Las cuatro etapas de la vida plasmadas en una prenda. Cada etapa cuenta su propia historia.",
      coleccion: "4 Etapas"
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/20 to-black/50" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4">
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Título principal - visible inmediatamente */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-wide
                         text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 mb-6">
            CAMISETAS
          </h1>
          
          {/* Descripción - visible inmediatamente */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Diseños únicos bordados a mano
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Cada camiseta OMLA es una obra de arte portable. Bordados tradicionales que cuentan historias únicas, 
              creadas con técnicas artesanales y materiales de la más alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Galería de camisetas */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {camisetas.map((camiseta, index) => (
              <Reveal key={camiseta.id} delay={index * 200}>
                <div className="group">
                  {/* Imagen principal */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 shadow-2xl mb-6">
                    <Image
                      src={camiseta.imagen}
                      alt={camiseta.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge de colección */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                        {camiseta.coleccion}
                      </span>
                    </div>
                    
                    {/* Precio */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-lg font-bold">
                        {camiseta.precio}
                      </span>
                    </div>
                  </div>
                  
                  {/* Información del producto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {camiseta.nombre}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed text-lg">
                      {camiseta.descripcion}
                    </p>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-yellow-400/25"
                      >
                        Encargar Ahora
                      </button>
                      
                      <Link
                        href={`/${camiseta.coleccion.toLowerCase().replace(' ', '-')}`}
                        className="flex-1 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-200 text-center"
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

      {/* Sección de proceso */}
      <section className="py-12 px-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Nuestro Proceso Artesanal
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Cada camiseta pasa por un proceso meticuloso de creación
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                paso: "01",
                titulo: "Diseño Único",
                descripcion: "Cada diseño nace de una inspiración auténtica, creado especialmente para contar una historia"
              },
              {
                paso: "02", 
                titulo: "Bordado Artesanal",
                descripcion: "Nuestros artesanos bordan cada pieza a mano con técnicas tradicionales y materiales premium"
              },
              {
                paso: "03",
                titulo: "Control de Calidad",
                descripcion: "Cada camiseta es inspeccionada minuciosamente para garantizar la perfección en cada detalle"
              }
            ].map((item, index) => (
              <Reveal key={item.paso} delay={index * 200}>
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <div className="text-5xl font-bold text-yellow-400 mb-4">{item.paso}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.titulo}</h3>
                  <p className="text-white/70 leading-relaxed">{item.descripcion}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              ¿Listo para tu camiseta única?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Contacta con nosotros y comencemos a crear tu pieza personalizada
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-yellow-400/25"
            >
              Contactar Ahora
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