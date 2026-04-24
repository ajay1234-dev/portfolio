'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectMockup from '@/components/ProjectMockup';

/**
 * FEATURED PROJECT ROW
 */
const FeaturedProject = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  // Staggered cinematic entrance logic
  const mockupVariants = {
    hidden: { opacity: 0, x: isEven ? -60 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as any } }
  };
  const textVariants = {
    hidden: { opacity: 0, x: isEven ? 60 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] as any } }
  };
  const wipeVariants = {
    hidden: { scaleX: 0, transformOrigin: 'left' },
    visible: { scaleX: [0, 1, 0], transformOrigin: ['left', 'left', 'right'], transition: { duration: 0.5, ease: 'easeInOut' as any } }
  };

  const mockupSide = (
    <motion.div
      variants={mockupVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        position: 'relative',
        cursor: 'pointer',
      }}
      className="project-featured-mockup"
    >
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ position: 'relative', boxShadow: `0 24px 80px ${project.color}22`, borderRadius: '12px' }}>
        <ProjectMockup type={project.type} color={project.color} image={project.image} />
        
        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '-12px', right: '-12px', background: 'rgba(242,244,255,0.03)', border: '1px solid rgba(242,244,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '99px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--green)', zIndex: 10 }}>
          ● {project.status}
        </div>
        <div style={{ position: 'absolute', bottom: '-12px', left: '16px', background: 'rgba(242,244,255,0.03)', border: '1px solid rgba(242,244,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '99px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.color, zIndex: 10 }}>
          {project.region}
        </div>
      </motion.div>
    </motion.div>
  );

  const textSide = (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ position: 'relative' }}
    >
      {/* Background Depth Number */}
      <div style={{ position: 'absolute', top: -40, [isEven ? 'right' : 'left']: 0, fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '80px', color: project.color, opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
        {project.id}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(242,244,255,0.35)', letterSpacing: '0.1em' }}>
          {project.id} — {project.region}
        </p>

        <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,44px)', color: '#F2F4FF', letterSpacing: '-0.02em', margin: '8px 0 12px' }}>
          {project.name}
        </h3>

        <p style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '18px', color: project.color, marginBottom: '20px' }}>
          {project.tagline}
        </p>

        <p style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, fontSize: '15px', color: 'rgba(242,244,255,0.6)', lineHeight: 1.75, marginBottom: '28px' }}>
          {project.description}
        </p>

        {/* METRICS ROW */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {project.metrics.map((m: any, i: number) => (
            <div key={i} style={{ borderLeft: `2px solid ${project.color}`, paddingLeft: '12px' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '24px', color: '#F2F4FF' }}>{m.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(242,244,255,0.4)', letterSpacing: '0.08em' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* TECH PILLS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tech.map((tech: string) => {
            const tColor = project.techColors[tech] || '#F2F4FF';
            return (
              <motion.div
                key={tech}
                whileHover={{ borderColor: `${tColor}80`, backgroundColor: `${tColor}14`, color: tColor }}
                style={{ background: 'rgba(242,244,255,0.04)', border: '1px solid rgba(242,244,255,0.10)', borderRadius: '99px', padding: '5px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F2F4FF', transition: 'colors 0.2s' }}
              >
                {tech}
              </motion.div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <motion.a whileHover={{ borderColor: project.color, color: project.color }} href={project.github} target="_blank" rel="noreferrer" style={{ background: 'rgba(242,244,255,0.03)', border: '1px solid rgba(242,244,255,0.08)', borderRadius: '99px', padding: '10px 24px', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '14px', color: '#F2F4FF', transition: 'colors 0.2s' }}>
            GitHub ↗
          </motion.a>
          <motion.a whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${project.color}40` }} href={project.live} target="_blank" rel="noreferrer" style={{ background: project.color, borderRadius: '99px', padding: '10px 24px', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '14px', color: '#060608', transition: 'colors 0.2s' }}>
            Live Demo ↗
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className="project-featured-row" style={{ position: 'relative', padding: '80px clamp(24px,5vw,80px)', borderBottom: '1px solid rgba(242,244,255,0.06)' }}>
      {/* Wipe element */}
      <motion.div
        variants={wipeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ position: 'absolute', inset: 0, background: project.color, zIndex: 50, pointerEvents: 'none' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {isEven ? <>{mockupSide}{textSide}</> : <>{textSide}{mockupSide}</>}
      </div>
    </div>
  );
};

/**
 * COMPACT PROJECT ROW
 */
const CompactProject = ({ project }: { project: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const wipeVariants = {
    hidden: { scaleX: 0, transformOrigin: 'left' },
    visible: { scaleX: [0, 1, 0], transformOrigin: ['left', 'left', 'right'], transition: { duration: 0.5, ease: 'easeInOut' as any } }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="project-compact-row"
      style={{ position: 'relative', borderBottom: '1px solid rgba(242,244,255,0.06)' }}
    >
      <motion.div
        variants={wipeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ position: 'absolute', inset: 0, background: project.color, zIndex: 50, pointerEvents: 'none' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', padding: '40px clamp(24px,5vw,80px)', maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }}>
        
        {/* Mockup Container */}
        <div style={{ width: '280px', flexShrink: 0 }} className="project-compact-mockup">
          <ProjectMockup type={project.type} color={project.color} image={project.image} />
        </div>

        {/* Text Container */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '24px', color: 'rgba(242,244,255,0.3)' }}>{project.id}</span>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '24px', color: '#F2F4FF' }}>{project.name}</h4>
          </div>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, fontSize: '14px', color: 'rgba(242,244,255,0.5)', margin: '8px 0 16px' }}>{project.tagline}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tech.slice(0, 4).map((tech: string) => (
              <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(242,244,255,0.4)', background: 'rgba(242,244,255,0.03)', padding: '2px 8px', borderRadius: '4px' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* End Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.color }}>{project.region}</div>
          <div style={{ fontSize: '24px', color: 'rgba(242,244,255,0.3)' }}>→</div>
        </div>

      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const compact = projects.filter((p) => !p.featured);

  return (
    <section id="projects" data-section-name="03 — PROJECTS" style={{ background: '#060608', position: 'relative' }}>
      
      {/* SECTION HEADER */}
      <div style={{ padding: '80px clamp(24px,5vw,80px) 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '16px', textTransform: 'uppercase' }}>
            03 — SELECTED WORK
          </p>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(40px,5vw,64px)', color: '#F2F4FF', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            What I've Built
          </h2>
        </div>
        <div className="hidden md:block" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, fontSize: '14px', color: 'rgba(242,244,255,0.4)', paddingBottom: '8px' }}>
          8 projects · All live in production
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {featured.map((p, i) => (
          <FeaturedProject key={p.id} project={p} index={i} />
        ))}
      </div>

      <div style={{ width: '100%' }}>
        {compact.map((p) => (
          <CompactProject key={p.id} project={p} />
        ))}
      </div>

      {/* Global CSS fixes specifically applied dynamically for proper grid swapping on mobile */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1024px) {
          .project-featured-row > div {
            display: flex !important;
            flex-direction: column;
          }
          .project-featured-mockup {
            order: -1;
            width: 100%;
          }
        }
        .project-compact-row:hover {
          background: rgba(242,244,255,0.02);
        }
        .project-compact-row:hover .project-compact-mockup {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `}} />

    </section>
  );
}
