"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Slide = {
  title: string;
  subtitle?: string;
  image: string; // ruta en /public
  cta?: string;
  href?: string;
};

// ⚠️ Ajusta a tus imágenes reales
const slides: Slide[] = [
  { title: "Camisetas", subtitle: "Diseños premium", image: "/slides/foto1.png" },
  { title: "Bolis", subtitle: "Tinta suave", image: "/slides/foto2.png" },
  { title: "Pegatinas", subtitle: "Vinilo HQ", image: "/slides/foto3.png" },
  { title: "Packs", subtitle: "Combos con descuento", image: "/slides/foto4.png" },
];

export default function ShowcaseCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      dragFree: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Diferencia circular para “coverflow” 3D suave
  const diff = (i: number) => {
    const n = slides.length;
    const raw = (i - selectedIndex + n) % n;
    return raw > n / 2 ? raw - n : raw; // -2..+2
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      {/* Flecha izquierda (dorada) */}
      <button
        aria-label="Anterior"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-white/5 backdrop-blur p-2 md:p-2.5 hover:bg-white/10"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="omlaGoldLeft" x1="0" x2="1">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f4d169" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="url(#omlaGoldLeft)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Flecha derecha (dorada) */}
      <button
        aria-label="Siguiente"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-white/5 backdrop-blur p-2 md:p-2.5 hover:bg-white/10"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="omlaGoldRight" x1="0" x2="1">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f4d169" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="url(#omlaGoldRight)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Carrusel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        style={{ perspective: "1200px" }} // para el efecto 3D suave
      >
        <div className="flex gap-4">
          {slides.map((s, i) => {
            const d = diff(i); // -2..+2 aprox.
            // Efecto “coverflow” ligero: giro y profundidad según cercanía al centro
            const rotateY = d * -10; // grados
            const translateZ = -Math.abs(d) * 60; // px
            const scale = d === 0 ? 1 : 0.92;
            const zIndex = 10 - Math.abs(d);

            return (
              <div
                key={i}
                className="shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl transition-transform duration-300 will-change-transform"
                  style={{
                    transform: `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                  }}
                >
                  {/* Imagen */}
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Vignette + glass overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,.25) 100%)",
                    }}
                  />

                  {/* Texto centrado */}
                  <div className="absolute bottom-0 left-0 right-0 m-2 rounded-xl border border-white/15 bg-white/10 p-3 text-white/90 backdrop-blur-md text-center">
                    <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                    {s.subtitle && (
                      <p className="text-xs text-white/80">{s.subtitle}</p>
                    )}
                    {s.cta && s.href && (
                      <a
                        href={s.href}
                        className="mt-2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
                      >
                        {s.cta}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
