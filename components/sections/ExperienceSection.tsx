"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!section || !track || !pin) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + (isMobile ? 40 : 80));

      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => isMobile ? "+=300%" : "+=500%",
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate cards as they enter
      const cards = track.querySelectorAll<HTMLElement>("[data-exp-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.93, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.65,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 85%",
              once: true,
            },
          }
        );
      });

      // Animate connectors
      const connectors = track.querySelectorAll<HTMLElement>(".experience__connector");
      connectors.forEach((conn) => {
        const line = conn.querySelector(".experience__connector-line");
        const year = conn.querySelector(".experience__connector-year");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: conn,
            containerAnimation: scrollTween,
            start: "left 85%",
            once: true,
          }
        });

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left" }
          );
        }
        
        if (year) {
          tl.fromTo(
            year,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.25 // fade in at midpoint of connector drawing
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience section--no-pad" data-section-name="EXPERIENCE">
      <div className="experience__noise" />

      {/* Header outside pin */}
      <div className="container" style={{ paddingTop: 140, paddingBottom: 60 }}>
        <span className="section-label">05 — UPTIME LOG</span>
        <h2 className="section-heading" style={{ marginTop: 16 }}>
          Experience
        </h2>
      </div>

      {/* Pinned horizontal scroll wrapper */}
      <div ref={pinRef} className="experience__pin" style={{ perspective: "1000px" }}>
        <div ref={trackRef} className="experience__track">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="experience__item">
              {/* Connector between cards */}
              {idx > 0 && (
                <div className="experience__connector" aria-hidden="true" style={{ position: "relative" }}>
                  <div className="experience__connector-line" style={{ transform: "scaleX(0)" }} />
                  <span className="experience__connector-year" style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", opacity: 0, fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--white-dim)" }}>
                    {exp.years.split('-')[0].trim()}
                  </span>
                </div>
              )}

              <div data-exp-card className="exp-card glass" style={{ opacity: 0, transformStyle: "preserve-3d" }}>
                <span className="exp-card__years">{exp.years}</span>
                <div className="exp-card__divider" />
                <h3 className="exp-card__role">{exp.role}</h3>
                <p className="exp-card__company">{exp.company}</p>
                <p className="exp-card__desc">{exp.description}</p>
                <ul className="exp-card__wins">
                  {exp.wins.map((win, i) => (
                    <li key={i}>
                      <span className="exp-card__check">✓</span>
                      {win}
                    </li>
                  ))}
                </ul>
                <div className="exp-card__tech">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
