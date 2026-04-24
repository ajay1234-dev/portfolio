"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLDivElement>("[data-project-row]");

    rows.forEach((row) => {
      const wipe = row.querySelector<HTMLDivElement>("[data-wipe]");
      const numberEl = row.querySelector<HTMLSpanElement>(".project-row__number");
      const techPills = row.querySelectorAll<HTMLSpanElement>(".tech-pill");
      const nameAndArrow = row.querySelectorAll<HTMLElement>(".project-row__name, .project-row__region, .project-row__arrow");

      ScrollTrigger.create({
        trigger: row,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          
          // Step 1: Wipe in
          tl.fromTo(
            wipe,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.35, ease: "expo.out", transformOrigin: "left" }
          );

          // Step 2: Row content opacity fade
          tl.fromTo(
            nameAndArrow,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
            0.3
          );

          // Step 3: Wipe out to the right
          tl.to(wipe, {
            scaleX: 0,
            duration: 0.28,
            ease: "expo.in",
            transformOrigin: "right",
          }, 0.38);

          // Step 4: Number count up (0 -> 01)
          if (numberEl) {
            const targetNum = parseInt(numberEl.innerText, 10);
            const obj = { val: 0 };
            tl.to(obj, {
              val: targetNum,
              duration: 0.4,
              ease: "power2.out",
              onUpdate: () => {
                numberEl.innerText = Math.round(obj.val).toString().padStart(2, '0');
              }
            }, 0.5);
            
            // Fading it in slightly before count finishes
            tl.fromTo(numberEl, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5);
          }

          // Step 5: Tech pills stagger scale in
          if (techPills.length > 0) {
            tl.fromTo(
              techPills,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: "back.out(1.5)" },
              0.55
            );
          }
        },
      });
    });
  }, []);

  const handleToggle = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const row = e.currentTarget;
    const expandArea = row.querySelector('.project-row__expand') as HTMLElement;
    const desc = row.querySelector('.project-row__desc') as HTMLElement;
    const actions = row.querySelectorAll('.btn-glass');

    const isExpanding = expandedId !== id;
    
    if (isExpanding) {
      setExpandedId(id);
      gsap.to(expandArea, { height: "auto", duration: 0.4, ease: "power2.inOut" });
      gsap.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(actions, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, delay: 0.2, duration: 0.3, ease: "back.out(1.5)" });
    } else {
      setExpandedId(null);
      gsap.to(expandArea, { height: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to([desc, actions], { opacity: 0, duration: 0.2 });
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="projects section" data-section-name="PROJECTS">
      <div className="container">
        {/* Header */}
        <div className="projects__header">
          <span className="section-label">03 — SELECTED WORK</span>
          <span className="projects__count">8 projects</span>
        </div>

        {/* Project Rows */}
        <div className="projects__list">
          {projects.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            const isAlt = idx % 2 === 1;

            return (
              <div
                key={project.id}
                data-project-row
                data-cursor="project"
                className={`project-row ${isAlt ? "project-row--alt" : ""} ${isExpanded ? "project-row--expanded" : ""}`}
                onClick={(e) => handleToggle(project.id, e)}
              >
                {/* Cinematic wipe overlay */}
                <div
                  data-wipe
                  className="project-row__wipe"
                  style={{ scaleX: 0 }}
                />

                <div className="project-row__main">
                  {/* Left */}
                  <div className="project-row__left">
                    <span className="project-row__number">{project.number}</span>
                    <h3 className="project-row__name">{project.name}</h3>
                  </div>

                  {/* Center — tech pills */}
                  <div className="project-row__tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Right */}
                  <div className="project-row__right">
                    <span className="project-row__region">{project.region}</span>
                    <span
                      className={`project-row__arrow ${isExpanded ? "project-row__arrow--up" : ""}`}
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Expanded content */}
                <div className="project-row__expand" style={{ height: 0, overflow: "hidden" }}>
                  <p className="project-row__desc" style={{ opacity: 0 }}>{project.description}</p>
                  <p className="project-row__metrics" style={{ opacity: 0 }}>{project.metrics}</p>
                  <div className="project-row__actions">
                    <a
                      href={project.github}
                      className="btn-glass"
                      style={{ opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="button"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={project.demo}
                      className="btn-glass"
                      style={{ opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="button"
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
