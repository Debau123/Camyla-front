"use client";

import {
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function UspStrip() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <UspItem
        icon={<TruckIcon className="h-5 w-5" />}
        title="Envío 48–72h"
        desc="Producción bajo demanda y entrega a tu puerta."
      />
      <UspItem
        icon={<ShieldCheckIcon className="h-5 w-5" />}
        title="Pago seguro"
        desc="Stripe/Apple Pay/Google Pay (próximamente)."
      />
      <UspItem
        icon={<ArrowPathRoundedSquareIcon className="h-5 w-5" />}
        title="Devoluciones 14 días"
        desc="Sin complicaciones en artículos elegibles."
      />
      <UspItem
        icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
        title="Atención directa"
        desc="Te respondemos rápido por email o IG."
      />
    </div>
  );
}

function UspItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md text-white/90">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          {icon}
        </span>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-white/75">{desc}</p>
        </div>
      </div>
    </div>
  );
}
