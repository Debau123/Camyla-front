import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

export default function LaOriginalPage() {
  const productos = [
    {
      id: 1,
      nombre: "Camiseta OMLA The Original",
      precio: "28€",
      imagen: "/La original web/Camiseta Omla The original ( 28€).png",
      descripcion: "Camiseta con diseño original bordado a mano",
      categoria: "Camisetas"
    },
    {
      id: 2,
      nombre: "Taza OMLA Original",
      precio: "15€",
      imagen: "/La original web/Copia de Taza Omla Original.png",
      descripcion: "Taza cerámica con diseño personalizado",
      categoria: "Tazas"
    },
    {
      id: 3,
      nombre: "Taza OMLA Original",
      precio: "15€",
      imagen: "/La original web/Copia de Taza Omla original_.png",
      descripcion: "Taza cerámica con diseño artesanal",
      categoria: "Tazas"
    },
    {
      id: 4,
      nombre: "Pegatina OMLA",
      precio: "5€",
      imagen: "/La original web/Pegatina Omla.png",
      descripcion: "Pegatina resistente al agua con diseño único",
      categoria: "Pegatinas"
    },
    {
      id: 5,
      nombre: "Taza OMLA Original",
      precio: "15€",
      imagen: "/La original web/Copia de Taza Omla originla.png",
      descripcion: "Taza con acabado premium",
      categoria: "Tazas"
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Fondo con overlay */}
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
      <section className="relative pt-20 pb-16 px-4">
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <SplitText
                text="LA ORIGINAL"
                className="gradient-text text-6xl md:text-7xl font-extrabold text-center tracking-wide
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
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                  Nuestra colección fundacional
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Cada pieza de La Original representa la esencia de OMLA: bordados únicos, 
                  diseños atemporales y la pasión por el arte artesanal que nos define.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galería de productos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {productos.map((producto, index) => (
                <div key={producto.id} className="group">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 shadow-2xl">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-block px-3 py-1 bg-yellow-400/90 text-black text-xs font-semibold rounded-full mb-2">
                            {producto.categoria}
                          </span>
                          <p className="text-white/90 text-sm leading-relaxed">
                            {producto.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Información del producto */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {producto.nombre}
                    </h3>
                    <p className="text-2xl font-bold text-yellow-400 mb-3">
                      {producto.precio}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {producto.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sección de historia */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                El origen de todo
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  <strong className="text-yellow-400">La Original</strong> no es solo una colección, 
                  es donde todo comenzó. Cada diseño aquí representa los primeros trazos de nuestra visión: 
                  crear piezas únicas que cuenten historias.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Desde la primera camiseta bordada hasta la última pegatina diseñada, 
                  cada elemento de esta colección lleva en su esencia la autenticidad y 
                  la pasión que nos impulsa a seguir creando.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-3">Diseño Original</h3>
                <p className="text-white/70">
                  Cada pieza nace de la creatividad pura, sin compromisos ni tendencias pasajeras.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl mb-4">✋</div>
                <h3 className="text-xl font-bold text-white mb-3">Hecho a Mano</h3>
                <p className="text-white/70">
                  Técnicas artesanales tradicionales que garantizan la calidad y unicidad.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="text-xl font-bold text-white mb-3">Auténtico</h3>
                <p className="text-white/70">
                  Sin imitaciones ni copias. Solo piezas originales con alma propia.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
