"use client";

export default function AnimatedImageBg({ src }: { src: string }) {
  return (
    <div
      className="bg-animated"
      style={
        { } as React.CSSProperties
      }
      /* Nota: ponemos el background en el ::before vía CSS inline abajo */
    >
      <style jsx>{`
        .bg-animated::before {
          background-image: url("${src}");
        }
      `}</style>
    </div>
  );
}
