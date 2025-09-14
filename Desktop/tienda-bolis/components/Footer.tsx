import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3 text-white/90">
          <div className="space-y-3">
            <div className="text-2xl font-extrabold tracking-wide">
              <span className="text-amber-400">OMLA</span> SHOP
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Bordados artesanales únicos y personalizados. Cada pieza cuenta una historia especial.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-white/75">
              <li><Link href="/la-original" className="hover:text-white">La Original</Link></li>
              <li><Link href="/4-etapas" className="hover:text-white">4 Etapas</Link></li>
              <li><Link href="/sobre" className="hover:text-white">Sobre nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <div className="space-y-3 text-white/75">
              <p className="text-sm">
                <span className="text-white/90">Email:</span><br />
                <a href="mailto:omlasoporte@gmail.com" className="hover:text-white transition-colors">
                  omlasoporte@gmail.com
                </a>
              </p>
              
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/__omla__/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @__omla__
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} OMLA SHOP — Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <Link href="/legal/privacidad" className="hover:text-white">Privacidad</Link>
            <span className="opacity-30">•</span>
            <Link href="/legal/cookies" className="hover:text-white">Cookies</Link>
            <span className="opacity-30">•</span>
            <Link href="/legal/aviso-legal" className="hover:text-white">Aviso legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
