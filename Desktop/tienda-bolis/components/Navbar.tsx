"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  HomeIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  StarIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

// Textos que van rotando para "Sobre"
const sobreTexts = ["Quién soy", "Qué hacemos", "Qué pretendemos"];

const nav = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { 
    label: "Productos", 
    icon: ShoppingBagIcon,
    dropdown: [
      { href: "/camisetas", label: "Camisetas" },
      { href: "/accesorios", label: "Accesorios" },
      { href: "/artilugios", label: "Artilugios" },
    ]
  },
  { 
    label: "Colecciones", 
    icon: Squares2X2Icon,
    dropdown: [
      { href: "/la-original", label: "La Original" },
      { href: "/4-etapas", label: "4 Etapas" },
    ]
  },
  { href: "/sobre", label: "Sobre", icon: InformationCircleIcon, dynamic: true },
];

const colecciones = [
  { href: "/la-original", label: "La Original" },
  { href: "/4-etapas", label: "4 Etapas" },
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

function MobileDropdown({ icon: Icon, label, items, pathname }: { 
  icon: any; 
  label: string; 
  items: { href: string; label: string }[];
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Verificar si alguna de las opciones del dropdown está activa
  const isActive = items.some(item => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex flex-col items-center gap-1 px-3 py-2 text-[10px] ${isActive ? 'text-white' : 'text-white/70'}`}
      >
        <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-white/70'}`} />
        <span className={isActive ? 'text-white' : 'text-white/70'}>{label}</span>
      </button>
      
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
            {items.map((item) => {
              const itemActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-xs transition-all duration-200 ${
                    itemActive
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function DynamicMobileText() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % sobreTexts.length);
        setIsAnimating(false);
      }, 200);
      
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`transition-all duration-200 ease-in-out transform ${
      isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {sobreTexts[currentTextIndex]}
    </span>
  );
}

function DynamicNavLink({ href }: { href: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Pequeño delay para la animación de salida
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % sobreTexts.length);
        setIsAnimating(false);
      }, 300); // Tiempo de la animación de salida
      
    }, 5000); // Cambia cada 5 segundos (más lento)

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative px-2 py-1 text-sm text-white/85 hover:text-white transition"
    >
      <span className={`inline-block transition-all duration-300 ease-in-out transform ${
        isAnimating ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        {sobreTexts[currentTextIndex]}
      </span>
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
          active ? "w-6 bg-white/90" : "w-0 bg-transparent group-hover:w-6 group-hover:bg-white/60"
        }`}
      />
    </Link>
  );
}

function DropdownMenu({ label, icon: Icon, items }: { 
  label: string; 
  icon: any; 
  items: { href: string; label: string }[] 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Verificar si alguna de las opciones del dropdown está activa
  const isActive = items.some(item => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));

  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Espera 300ms antes de cerrar
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`relative px-2 py-1 text-sm text-white/85 hover:text-white transition flex items-center gap-1`}
      >
        <span>{label}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span
          className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
            isActive ? "w-6 bg-white/90" : "w-0 bg-transparent group-hover:w-6 group-hover:bg-white/60"
          }`}
        />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-40 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) => {
            const itemActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm transition-all duration-200 ${
                  itemActive
                    ? "bg-yellow-400/20 text-yellow-400"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
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
              </Link>

              {/* Links desktop */}
              <nav className="hidden md:flex items-center gap-6 group">
                {nav.map((item) => (
                  item.dropdown ? (
                    <DropdownMenu 
                      key={item.label} 
                      label={item.label} 
                      icon={item.icon} 
                      items={item.dropdown} 
                    />
                  ) : item.dynamic ? (
                    <DynamicNavLink key={item.href} href={item.href!} />
                  ) : (
                    <NavLink key={item.href} href={item.href!} label={item.label} />
                  )
                ))}
              </nav>

              {/* Espacio vacío para mantener el balance visual */}
              <div className="w-20"></div>
            </div>
          </div>
        </div>
      </header>

      {/* BOTTOM TAB BAR (solo móvil) */}
      <nav className="BottomTab md:hidden fixed bottom-4 inset-x-0 z-50">
        <div className="mx-auto max-w-sm px-4">
          <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-lg px-3 py-2">
            
            {/* Inicio */}
            <Link
              href="/"
              className="flex flex-col items-center gap-1 px-3 py-2 text-[10px] text-white/80"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <HomeIcon className={`h-4 w-4 ${pathname === "/" ? "text-white" : "text-white/70"}`} />
              <span className={pathname === "/" ? "text-white" : "text-white/70"}>Inicio</span>
            </Link>

            {/* Productos - Dropdown móvil */}
            <MobileDropdown 
              icon={ShoppingBagIcon}
              label="Productos"
              items={[
                { href: "/camisetas", label: "Camisetas" },
                { href: "/accesorios", label: "Accesorios" },
                { href: "/artilugios", label: "Artilugios" },
              ]}
              pathname={pathname}
            />

            {/* Colecciones - Dropdown móvil */}
            <MobileDropdown 
              icon={Squares2X2Icon}
              label="Colecciones"
              items={[
                { href: "/la-original", label: "La Original" },
                { href: "/4-etapas", label: "4 Etapas" },
              ]}
              pathname={pathname}
            />

            {/* Sobre - Dinámico */}
            <Link
              href="/sobre"
              className="flex flex-col items-center gap-1 px-3 py-2 text-[10px] text-white/80"
              aria-current={pathname === "/sobre" ? "page" : undefined}
            >
              <InformationCircleIcon className={`h-4 w-4 ${pathname === "/sobre" ? "text-white" : "text-white/70"}`} />
              <DynamicMobileText />
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}
