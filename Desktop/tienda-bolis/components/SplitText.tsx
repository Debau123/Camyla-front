"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type Easing = string | ((progress: number, start?: number, change?: number, duration?: number) => number);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: Easing;
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const callbackRef = useRef(onLetterAnimationComplete); // <— estabiliza el callback
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    callbackRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter: GSAPSplitText | null = null;

    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        // @ts-ignore propiedad del plugin
        absolute: absoluteLines,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char", // <— importante para el gradiente
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets: HTMLElement[] = [];
    if (splitType === "lines") targets = splitter.lines as unknown as HTMLElement[];
    else if (splitType === "words") targets = splitter.words as unknown as HTMLElement[];
    else targets = splitter.chars as unknown as HTMLElement[];

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => (t.style.willChange = "transform, opacity"));

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const margin =
      marginValue === 0
        ? ""
        : `${marginValue >= 0 ? "+=" : "-="}${Math.abs(marginValue)}${marginUnit}`;
    const start = `top ${startPct}%${margin}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self as unknown as ScrollTrigger;
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: "willChange", immediateRender: true });
        callbackRef.current?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      scrollTriggerRef.current?.kill();
      gsap.killTweensOf(targets);
      splitter?.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    // ojo: NO dependemos de onLetterAnimationComplete (usamos ref)
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
