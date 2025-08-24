import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4 text-white/90">
          <div className="space-y-3">
            <div className="text-2xl font-extrabold tracking-wide">
              <span className="text-amber-400">OMLA</span> SHOP
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Diseños con actitud. Bolígrafos, camisetas y pegatinas con ese toque que buscas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tienda</h4>
            <ul className="space-y-2 text-white/75">
              <li><Link href="/catalogo" className="hover:text-white">Catálogo</Link></li>
              <li><Link href="/colecciones" className="hover:text-white">Colecciones</Link></li>
              <li><Link href="/ofertas" className="hover:text-white">Ofertas</Link></li>
              <li><Link href="/faq" className="hover:text-white">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Soporte</h4>
            <ul className="space-y-2 text-white/75">
              <li><Link href="/envios" className="hover:text-white">Envíos y plazos</Link></li>
              <li><Link href="/devoluciones" className="hover:text-white">Devoluciones</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Novedades</h4>
            <p className="text-white/70 text-sm">
              Suscríbete para enterarte de lanzamientos y drops.
            </p>

            {/* Client Component – evita el error */}
            <NewsletterForm />

            <p className="mt-2 text-xs text-white/50">Sin SPAM. Cancela cuando quieras.</p>
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
