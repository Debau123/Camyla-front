import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4 text-white/90">
          
          {/* Marca y descripción */}
          <div className="space-y-4">
            <div className="text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 bg-clip-text text-transparent">OMLA</span> SHOP
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Descubre el mundo de OMLA.<br />
              Cada diseño cuenta una historia.
            </p>
          </div>

          {/* Productos */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Productos</h4>
            <ul className="space-y-2 text-white/75 text-sm">
              <li><Link href="/camisetas" className="hover:text-yellow-400 transition-colors">Camisetas</Link></li>
              <li><Link href="/accesorios" className="hover:text-yellow-400 transition-colors">Accesorios</Link></li>
              <li><Link href="/artilugios" className="hover:text-yellow-400 transition-colors">Artilugios</Link></li>
            </ul>
          </div>

          {/* Colecciones */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Colecciones</h4>
            <ul className="space-y-2 text-white/75 text-sm">
              <li><Link href="/la-original" className="hover:text-yellow-400 transition-colors">La Original</Link></li>
              <li><Link href="/4-etapas" className="hover:text-yellow-400 transition-colors">4 Etapas</Link></li>
              <li><Link href="/sobre" className="hover:text-yellow-400 transition-colors">Quién es OMLA</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-3 text-white/75 text-sm">
              <div>
                <span className="text-white/90 font-medium">Email:</span><br />
                <a href="mailto:omlasoporte@gmail.com" className="hover:text-yellow-400 transition-colors">
                  omlasoporte@gmail.com
                </a>
              </div>
              
              <div>
                <a 
                  href="https://www.instagram.com/__omla__/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @__omla__
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} OMLA SHOP — Cada pieza cuenta una historia.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="text-white/50">Hecho con ❤️ para compartir arte</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
