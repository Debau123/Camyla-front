"use client";

import { TruckIcon, SparklesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Reveal from "./Reveal";

const items = [
  {
    title: "Calidad pro",
    desc: "Impresión nítida y materiales duraderos para tu marca.",
    Icon: SparklesIcon,
  },
  {
    title: "Producción bajo demanda",
    desc: "Fabricamos cuando lo pides. Sin stocks, sin complicaciones.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Envío ágil",
    desc: "Logística optimizada para que llegue rápido y seguro.",
    Icon: TruckIcon,
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ title, desc, Icon }, i) => (
          <Reveal key={title} delay={i * 0.05}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition hover:bg-white/15">
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition">
                <div className="pointer-events-none absolute -inset-1 bg-[radial-gradient(600px_circle_at_var(--x,50%)_0%,rgba(255,255,255,.12),transparent_60%)]" />
              </div>
              <Icon className="h-7 w-7 text-white/90" />
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/75">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
