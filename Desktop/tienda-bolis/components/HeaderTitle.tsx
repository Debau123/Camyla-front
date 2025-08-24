"use client";

import SplitText from "@/components/SplitText";

export default function HeaderTitle() {
  const handleAnimationComplete = () => {
    console.log("Animación del título completada ✅");
  };

  return (
   <SplitText
  text="OMLA SHOP"
  className="gradient-text text-6xl md:text-7xl font-extrabold text-center tracking-wide
             text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
/>


  );
}
