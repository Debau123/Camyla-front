"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HomeIcon,
  Squares2X2Icon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const nav = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/catalogo", label: "Catálogo", icon: Squares2X2Icon },
  { href: "/sobre", label: "Sobre", icon: InformationCircleIcon },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative px-2 py-1 text-sm text-white/85 hover:text-white transition"
    >
      <span>{label}</span>
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
          active ? "w-6 bg-white/90" : "w-0 bg-transparent group-hover:w-6 group-hover:bg-white/60"
        }`}
      />
    </Link>
  );
}

export default function Navbar({ user }: { user: any | null }) {
  const pathname = usePathname();

  return (
    <>
      {/* TOP NAV */}
      <header className="NavbarRoot sticky top-4 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
            <div className="flex h-12 items-center justify-between px-4">
              {/* Marca */}
              <Link href="/" className="flex items-center gap-3" aria-label="OMLA">
                <Image
                  src="/logo-camyla-white.png"
                  alt="OMLA logo"
                  width={120}
                  height={28}
                  priority
                  className="h-6 w-auto"
                />
                <span className="hidden sm:inline-block font-semibold uppercase tracking-[0.28em] text-transparent bg-clip-text [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] bg-[linear-gradient(90deg,#d4af37_0%,#f4d169_35%,#f8e08e_55%,#f4d169_75%,#d4af37_100%)]" />
              </Link>

              {/* Links desktop */}
              <nav className="hidden md:flex items-center gap-6 group">
                {nav.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </nav>

              {/* Acciones */}
              <div className="flex items-center gap-2">
                <button
                  className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white/90 hover:bg-white/15"
                  title="Buscar (pronto)"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span className="hidden lg:inline">Buscar</span>
                </button>

                <Link
                  href="/carrito"
                  className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white hover:bg-white/15"
                  title="Carrito"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full bg-white/90 px-1 text-[10px] leading-4 text-black">
                    0
                  </span>
                </Link>

                {/* Cuenta / Login-Logout */}
                {!user ? (
                  <a
                    href="/auth/login"  // ⬅️ rutas automáticas del middleware v4
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white/90 hover:bg-white/15"
                    title="Login"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Login</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-sm text-white/80 max-w-[160px] truncate">
                      {user.name || user.email}
                    </span>
                    <a
                      href="/auth/logout" // ⬅️ rutas automáticas del middleware v4
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white/90 hover:bg-white/15"
                      title="Logout"
                    >
                      <UserIcon className="h-5 w-5" />
                      <span className="hidden sm:inline">Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BOTTOM TAB BAR (solo móvil) */}
      <nav className="BottomTab md:hidden fixed bottom-4 inset-x-0 z-50">
        <div className="mx-auto max-w-sm px-4">
          <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-lg px-2 py-1.5">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] text-white/80"
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-white" : "text-white/70"}`} />
                  <span className={active ? "text-white" : "text-white/70"}>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
