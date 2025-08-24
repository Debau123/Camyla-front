"use client";

import { useRef, useEffect, useMemo, CSSProperties } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(Draggable);

interface StickerPeelProps {
  imageSrc: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: "center" | "random" | { x: number; y: number };
  peelDirection?: number;
  className?: string;
}

interface CSSVars extends CSSProperties {
  "--sticker-rotate"?: string;
  "--sticker-p"?: string;
  "--sticker-peelback-hover"?: string;
  "--sticker-peelback-active"?: string;
  "--sticker-peel-easing"?: string;
  "--sticker-peel-hover-easing"?: string;
  "--sticker-width"?: string;
  "--sticker-shadow-opacity"?: number;
  "--sticker-lighting-constant"?: number;
  "--peel-direction"?: string;
}

const StickerPeel: React.FC<StickerPeelProps> = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);

  const defaultPadding = 10;

  // Posición inicial
  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    let startX = 0,
      startY = 0;

    if (initialPosition !== "center" && typeof initialPosition === "object") {
      startX = initialPosition.x;
      startY = initialPosition.y;
    }

    gsap.set(target, { x: startX, y: startY });
  }, [initialPosition]);

  // Drag
  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    const boundsEl = (target.parentNode as HTMLElement) ?? document.body;

    const [instance] = Draggable.create(target, {
      type: "x,y",
      bounds: boundsEl,
      inertia: false, // ⚠️ ponlo a true solo si registras InertiaPlugin
      onDrag: function (this: any) {
        const rot = gsap.utils.clamp(-24, 24, (this?.deltaX ?? 0) * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onDragEnd: function () {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: "power2.out" });
      },
    });

    const handleResize = () => {
      instance?.update?.();
      const currentX = (gsap.getProperty(target, "x") as number) || 0;
      const currentY = (gsap.getProperty(target, "y") as number) || 0;

      const boundsRect = boundsEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const maxX = Math.max(0, boundsRect.width - targetRect.width);
      const maxY = Math.max(0, boundsRect.height - targetRect.height);

      const newX = Math.min(Math.max(0, currentX), maxX);
      const newY = Math.min(Math.max(0, currentY), maxY);

      if (newX !== currentX || newY !== currentY) {
        gsap.to(target, { x: newX, y: newY, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      instance?.kill?.();
    };
  }, []);

  // Luces
  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (pointLightRef.current) gsap.set(pointLightRef.current, { attr: { x, y } });
      if (pointLightFlippedRef.current) gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", updateLight);
      return () => container.removeEventListener("mousemove", updateLight);
    }
  }, []);

  const cssVars: CSSVars = useMemo(
    () => ({
      "--sticker-rotate": `${rotate}deg`,
      "--sticker-p": `${defaultPadding}px`,
      "--sticker-peelback-hover": `${peelBackHoverPct}%`,
      "--sticker-peelback-active": `${peelBackActivePct}%`,
      "--sticker-peel-easing": peelEasing,
      "--sticker-peel-hover-easing": peelHoverEasing,
      "--sticker-width": `${width}px`,
      "--sticker-shadow-opacity": shadowIntensity,
      "--sticker-lighting-constant": lightingIntensity,
      "--peel-direction": `${peelDirection}deg`,
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
    ]
  );

  return (
    <div ref={dragTargetRef} className={`draggable ${className}`} style={cssVars}>
      {/* Filtros SVG */}
      <svg width="0" height="0">
        <defs>
          <filter id="pointLight">
            <feSpecularLighting
              result="spec"
              in="SourceGraphic"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
          </filter>

          <filter id="pointLightFlipped">
            <feSpecularLighting
              result="spec"
              in="SourceGraphic"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
          </filter>

          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img src={imageSrc} alt="sticker" className="sticker-image" draggable={false} />
          </div>
        </div>
        <div className="flap">
          <div className="flap-lighting">
            <img src={imageSrc} alt="sticker flap" className="flap-image" draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;
