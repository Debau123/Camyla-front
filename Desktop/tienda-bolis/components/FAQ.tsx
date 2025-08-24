"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "¿Puedo subir mi propio diseño?",
    a: "Sí. Trabajamos con archivos PNG/SVG de alta resolución. También podemos ayudarte a adaptarlo.",
  },
  {
    q: "¿Hay pedido mínimo?",
    a: "No. Producción bajo demanda: pides lo que necesitas cuando lo necesitas.",
  },
  {
    q: "¿Cuánto tardan los envíos?",
    a: "Normalmente 3–7 días laborables según producto y destino.",
  },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20">
      <Reveal>
        <h2 className="text-xl md:text-2xl font-semibold text-white text-center mb-6">
          Preguntas frecuentes
        </h2>
      </Reveal>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
            <Disclosure>
              {({ open }) => (
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
                  <Disclosure.Button className="w-full px-4 py-3 text-left text-white/90 flex items-center justify-between">
                    <span>{item.q}</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-150 ease-out"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-100 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Disclosure.Panel className="px-4 pb-4 text-white/75">
                      {item.a}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
