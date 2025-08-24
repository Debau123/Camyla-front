"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus("loading");
      // TODO: llama a tu endpoint /api/newsletter o a tu provider (Mailchimp, etc.)
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mt-3 flex gap-2" onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Suscribirme"}
      </button>
    </form>
  );
}
