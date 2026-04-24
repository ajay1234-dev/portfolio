"use client";
import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { useScrollSection } from "@/hooks/useScrollSection";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const activeSection = useScrollSection();
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      if (!navRef.current) return;
      if (y > 80) {
        navRef.current.style.transform = "translateY(0)";
        navRef.current.style.opacity = "1";
      } else {
        navRef.current.style.transform = "translateY(-100%)";
        navRef.current.style.opacity = "0";
      }
    });
    return () => unsub();
  }, [scrollY]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="navbar"
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <span className="navbar__name">Ajay Singh I</span>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setIsMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "var(--white)",
            fontSize: "24px",
            display: "none", // Controlled in CSS
            cursor: "pointer",
          }}
        >
          Menu
        </button>

        <div className="navbar__status">
          <span className="status-dot" />
          Available for Work
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
