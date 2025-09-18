"use client";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-20">
        
        {/* Título fijo */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Quién es OMLA
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="space-y-12">
          
          {/* Primera sección */}
          <div className="text-center space-y-6">
            <p className="text-3xl md:text-4xl font-light text-white">
              Ah! Qué gran pregunta.
            </p>
            <p className="text-2xl md:text-3xl text-purple-300 font-medium">
              En este caso, anónimo.
            </p>
          </div>

          {/* Segunda sección */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Esto nace de una idea, de una{" "}
              <span className="text-purple-400 font-semibold">
                inspiración prolongada
              </span>{" "}
              a lo largo de los años, la cuál por fin coge forma y me atrevo a compartir.
            </p>
          </div>

          {/* Tercera sección */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Esta marca consiste en{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                colecciones
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              que tienen un significado, y dentro de esas colecciones el diseño de{" "}
              <span className="text-purple-300 font-semibold">Caras</span>{" "}
              y sus artilugios relacionados.
            </p>
          </div>

          {/* Sección final */}
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md border border-purple-400/30 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Mi finalidad es{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                compartir contigo
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              lo que me gusta, que{" "}
              <span className="text-yellow-300 font-semibold">
                formes parte
              </span>{" "}
              de esto que creo
            </p>
            
            {/* Decoración final */}
            <div className="flex justify-center mt-8 space-x-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}