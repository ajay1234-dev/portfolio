"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMagneticText } from "@/hooks/useMagneticText";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useMagneticText();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const noiseRef = useRef<HTMLDivElement>(null);
  const subWrapRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLButtonElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const EMAIL = "alex.torres@dev.io";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // We use IntersectionObserver to guarantee triggering at ~20% visibility
    // instead of ScrollTrigger, as requested for this specific feel.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          const tl = gsap.timeline();

          // 0.0s: Background noise grain intensifies briefly
          tl.fromTo(noiseRef.current, { opacity: 0.035 }, { opacity: 0.07, duration: 0.5, ease: "power2.inOut" }, 0)
            .to(noiseRef.current, { opacity: 0.035, duration: 0.5, ease: "power2.inOut" }, 0.5);

          // 0.2s: "Let's Build" unmasked
          const line1Words = headingRef.current?.querySelectorAll(".contact__heading-line:first-child .contact__word");
          if (line1Words) {
            tl.fromTo(line1Words, 
              { clipPath: "inset(100% 0 0 0)", y: 40 }, 
              { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out" }, 
              0.2
            );
          }

          // 0.6s: "Something Great." unmasked
          const line2Words = headingRef.current?.querySelectorAll(".contact__heading-line--indent .contact__word");
          if (line2Words) {
            tl.fromTo(line2Words, 
              { clipPath: "inset(100% 0 0 0)", y: 40 }, 
              { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out" }, 
              0.6
            );
          }

          // 1.1s: Subtext fades
          tl.fromTo(subWrapRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.1);

          // 1.5s: Email block slides up
          tl.fromTo(emailRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.5);

          // 1.8s: Social row scales in
          const socials = socialsRef.current?.querySelectorAll('.btn-glass');
          if (socials) {
            tl.fromTo(socials, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.5)" }, 1.8);
          }

          // 2.2s: Contact form slides up
          tl.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2.2);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSubmitted(true);
    formRef.current?.reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="contact section" ref={sectionRef} data-section-name="CONTACT" style={{ position: "relative" }}>
      <div ref={noiseRef} className="contact__noise" style={{ opacity: 0.035, position: "absolute", inset: 0, pointerEvents: "none" }} />
      
      <div className="container contact__inner" style={{ position: "relative", zIndex: 1 }}>
        <div ref={magneticRef}>
          <div ref={headingRef} className="contact__heading-wrap">
            <div className="contact__heading-line">
              {["Let's", "Build"].map((word) => (
                <span key={word} data-magnetic data-cursor="contact" className="contact__word" style={{ clipPath: "inset(100% 0 0 0)" }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="contact__heading-line contact__heading-line--indent">
              {["Something", "Great."].map((word) => (
                <span key={word} data-magnetic data-cursor="contact" className="contact__word" style={{ clipPath: "inset(100% 0 0 0)" }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p ref={subWrapRef} className="contact__sub" style={{ opacity: 0 }}>
          Open to full-time roles, freelance, and cloud consulting.
        </p>

        <button
          ref={emailRef}
          className={`contact__email ${copied ? "contact__email--copied" : ""}`}
          onClick={copyEmail}
          data-cursor="button"
          style={{ opacity: 0 }}
        >
          {copied ? "Copied ✓" : EMAIL}
        </button>

        <div ref={socialsRef} className="contact__socials">
          {[
            { label: "GitHub", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Twitter", href: "#" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="btn-glass" data-cursor="button" style={{ opacity: 0 }}>
              {label}
            </a>
          ))}
        </div>

        <form ref={formRef} className="contact__form glass" onSubmit={handleSubmit} style={{ opacity: 0 }}>
          <div className="form-group">
            <input type="text" id="contact-name" name="name" placeholder="Your Name" required className="form-input" />
          </div>
          <div className="form-group">
            <input type="email" id="contact-email" name="email" placeholder="Your Email" required className="form-input" />
          </div>
          <div className="form-group">
            <textarea id="contact-message" name="message" placeholder="Your Message" required rows={5} className="form-input form-textarea" />
          </div>
          <button type="submit" className={`btn btn--filled btn--full ${submitted ? "btn--sent" : ""}`} disabled={sending || submitted} data-cursor="button">
            {sent(sending, submitted)}
          </button>
        </form>

        <footer className="contact__footer">
          Alex Torres · 2025 · Built with Next.js, GSAP &amp; Canvas API
        </footer>
      </div>
    </section>
  );
}

function sent(sending: boolean, submitted: boolean) {
  if (submitted) return "Sent ✓";
  if (sending) return "Sending…";
  return "Send Message →";
}
