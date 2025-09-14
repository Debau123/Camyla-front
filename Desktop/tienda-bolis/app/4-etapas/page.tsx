import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

export default function CuatroEtapasPage() {
  const productos = [
    {
      id: 1,
      nombre: "Camiseta 4 Stages",
      imagen: "/4 etapas /Camiseta 4 stages_.png",
      etapa: "Infancia",
      descripcion: "El comienzo de todo, la inocencia en su máxima expresión",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      nombre: "Taza 4 Stages",
      imagen: "/4 etapas /Copia de Taza 4 stages.jpg",
      etapa: "Adolescencia", 
      descripcion: "La búsqueda de identidad, la rebeldía y el descubrimiento",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      nombre: "Taza 4 Stages",
      imagen: "/4 etapas /Copia de Taza 4 stages(1).jpg",
      etapa: "Madurez",
      descripcion: "La sabiduría adquirida, la estabilidad y el propósito claro",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      nombre: "Taza Il Bambino",
      imagen: "/4 etapas /Copia de Taza Il Bambino.png",
      etapa: "Il Bambino",
      descripcion: "La pureza del niño interior que nunca debemos perder",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      nombre: "Pañuelo La Doña",
      imagen: "/4 etapas /Pañuelo La Doña ( vejez).png",
      etapa: "Vejez",
      descripcion: "La elegancia del tiempo, la experiencia convertida en arte",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      nombre: "Riñonera Not Found",
      imagen: "/4 etapas /Riñonera Not Found ( adolescencia).png",
      etapa: "Adolescencia",
      descripcion: "Cuando aún no te has encontrado a ti mismo",
      color: "from-red-500 to-pink-500"
    }
  ];

  const etapasVida = [
    {
      numero: "01",
      titulo: "Il Bambino",
      subtitulo: "Infancia",
      descripcion: "La pureza, la curiosidad infinita y la capacidad de asombro que define los primeros años de vida.",
      icono: "👶",
      color: "from-blue-400 to-cyan-400"
    },
    {
      numero: "02", 
      titulo: "Not Found",
      subtitulo: "Adolescencia",
      descripcion: "La búsqueda de identidad, las preguntas sin respuesta y el descubrimiento del mundo y de uno mismo.",
      icono: "🔍",
      color: "from-purple-400 to-pink-400"
    },
    {
      numero: "03",
      titulo: "The Serious",
      subtitulo: "Madurez", 
      descripcion: "La responsabilidad, la claridad de propósito y la construcción de un legado propio.",
      icono: "💼",
      color: "from-green-400 to-emerald-400"
    },
    {
      numero: "04",
      titulo: "La Doña",
      subtitulo: "Vejez",
      descripcion: "La sabiduría acumulada, la elegancia del tiempo y la tranquilidad de quien ha vivido plenamente.",
      icono: "👑",
      color: "from-yellow-400 to-orange-400"
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Fondo con la imagen del archivo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/4 etapas /Copia de Fondo web.jpg"
          alt="Fondo web"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <SplitText
                text="4 ETAPAS"
                className="gradient-text text-6xl md:text-8xl font-extrabold text-center tracking-wide
                           text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 mb-6"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
              />
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-6 font-light">
                  El viaje de la vida en cada diseño
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Cuatro momentos únicos, cuatro etapas fundamentales del ser humano. 
                  Cada diseño cuenta una historia, cada pieza representa una fase 
                  del extraordinario viaje que es vivir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galería de productos */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
              La Colección
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {productos.map((producto, index) => (
                <div key={producto.id} className="group">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <div className={`inline-block px-4 py-2 bg-gradient-to-r ${producto.color} text-white text-sm font-bold rounded-full mb-3 shadow-lg`}>
                            {producto.etapa}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {producto.nombre}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {producto.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Las 4 etapas de la vida */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Las Etapas de la Vida
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Cada etapa tiene su propia magia, sus propios desafíos y su propia belleza. 
                Nuestros diseños capturan la esencia de cada momento.
              </p>
            </div>
          </Reveal>

          <div className="space-y-16">
            {etapasVida.map((etapa, index) => (
              <Reveal key={index}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Contenido */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${etapa.color} flex items-center justify-center text-white font-bold text-2xl shadow-2xl`}>
                        {etapa.numero}
                      </div>
                      <div className="text-6xl">{etapa.icono}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {etapa.titulo}
                      </h3>
                      <p className={`text-xl font-semibold bg-gradient-to-r ${etapa.color} bg-clip-text text-transparent mb-4`}>
                        {etapa.subtitulo}
                      </p>
                    </div>
                    
                    <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                      {etapa.descripcion}
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 max-w-md">
                    <div className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${etapa.color} shadow-2xl`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-8xl mb-6">{etapa.icono}</div>
                          <div className="text-3xl font-bold mb-3">{etapa.titulo}</div>
                          <div className="text-xl opacity-80">{etapa.subtitulo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sección filosófica */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              Un Viaje Universal
            </h2>
            <div className="space-y-8 text-lg text-white/80 leading-relaxed">
              <p>
                Las <strong className="text-yellow-400">4 Etapas</strong> no son solo diseños, 
                son un reflejo de la experiencia humana universal. Cada uno de nosotros 
                recorre este camino, cada uno con su propia velocidad, con sus propias historias.
              </p>
              <p>
                Desde <strong className="text-blue-400">Il Bambino</strong>, que representa 
                la inocencia y la curiosidad infinita, hasta <strong className="text-yellow-400">La Doña</strong>, 
                que encarna la sabiduría y la elegancia del tiempo vivido.
              </p>
              <p>
                Pasando por <strong className="text-purple-400">Not Found</strong>, esos años 
                de búsqueda y autodescubrimiento, y <strong className="text-green-400">The Serious</strong>, 
                donde encontramos nuestro propósito y construimos nuestro legado.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
                <div className="text-sm text-white/70">Infinita curiosidad</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">?</div>
                <div className="text-sm text-white/70">Búsqueda constante</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">✓</div>
                <div className="text-sm text-white/70">Propósito claro</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">♕</div>
                <div className="text-sm text-white/70">Sabiduría eterna</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
