export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-8">
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 text-center">
        <h1 className="text-2xl font-semibold text-white">Página no encontrada</h1>
        <p className="mt-2 text-white/70">La URL que has abierto no existe.</p>
        <a href="/" className="mt-4 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/15">
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
