"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionEffects() {
  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    gsap.utils.toArray<HTMLElement>(".reveal-word").forEach((word, index) => {
      gsap.fromTo(
        word,
        { opacity: 0.22, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: word,
            start: `top ${84 - (index % 8) * 2}%`,
            end: "top 48%",
            scrub: 0.55
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".media-reveal").forEach((media) => {
      gsap.fromTo(
        media,
        { opacity: 0.42, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: media,
            start: "top 86%",
            end: "bottom 28%",
            scrub: 0.7
          }
        }
      );
    });
  });

  return null;
}
