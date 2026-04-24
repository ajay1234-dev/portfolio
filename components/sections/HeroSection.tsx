"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  const [vh, setVh] = useState(1000);
  const { scrollY } = useScroll();

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax layers
  const y1 = useTransform(scrollY, (v) => v * 0.12);
  const y2 = useTransform(scrollY, (v) => v * 0.08);
  const y3 = useTransform(scrollY, (v) => v * -0.06);

  const y4 = useTransform(scrollY, (v) => {
    // Base 0.04x speed 
    let base = v * 0.04;
    // Fade out translation at bottom half
    let exitY = 0;
    if (v > vh * 0.5) {
      const p = Math.min(1, (v - vh * 0.5) / (vh * 0.5));
      exitY = p * -60;
    }
    return base + exitY;
  });

  const textOpacity = useTransform(scrollY, [0, vh * 0.8], [1, 0]);
  const gradientScale = useTransform(scrollY, [0, vh], [1, 1.4]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Page load sequence
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.2
    )
      .fromTo(
        line1Ref.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "expo.out" },
        1.0
      )
      .fromTo(
        line2Ref.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "expo.out" },
        1.15
      )
      .fromTo(
        roleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        1.5
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.8
      )
      .fromTo(
        scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.2
      );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero" data-section-name="HERO">
      {/* Background Layers */}
      <div className="hero__noise" />

      <motion.div
        className="hero__gradient"
        style={{ y: y2, scale: gradientScale }}
      />

      <div className="hero__scanlines" />

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: y1,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <ParticleCanvas />
      </motion.div>

      {/* Main Content */}
      <div className="hero__inner container">
        <motion.div
          className="hero__content"
          style={{ y: y4, opacity: textOpacity }}
        >
          <p ref={eyebrowRef} className="hero__eyebrow" style={{ opacity: 0 }}>
            FULL STACK · CLOUD · DEVOPS
          </p>

          <h1 className="hero__name">
            <div
              ref={line1Ref}
              className="hero__name-line"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <span style={{ display: 'inline-block', paddingRight: '0.15em' }}>Ajay</span>
            </div>
            <div
              ref={line2Ref}
              className="hero__name-line hero__name-line--indent"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <span style={{ display: 'inline-block', paddingRight: '0.15em' }}>Singh</span>
            </div>
          </h1>

          <p ref={roleRef} className="hero__role" style={{ opacity: 0 }}>
            Building scalable systems that power products used by millions.
          </p>

          <div ref={ctaRef} className="hero__cta" style={{ opacity: 0 }}>
            <button
              className="btn btn--filled"
              onClick={() => scrollTo("projects")}
              data-cursor="button"
            >
              View Work
            </button>
            <button
              className="btn btn--outline"
              onClick={() => scrollTo("contact")}
              data-cursor="button"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        {/* Decorative section number */}
        <motion.div
          className="hero__decor"
          aria-hidden="true"
          style={{ y: y3 }}
        >
          01
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndRef} className="hero__scroll-indicator" style={{ opacity: 0 }}>
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
