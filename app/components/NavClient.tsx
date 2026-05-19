"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Lessons", href: "#lessons" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function NavClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false); // controls DOM presence for exit anim
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const touchStartY = useRef(0);

  const openMenu = () => {
    setMenuMounted(true);
    setMenuClosing(false);
    setMenuOpen(true);
    history.pushState({ menu: true }, "");
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setMenuOpen(false);
    setTimeout(() => {
      setMenuMounted(false);
      setMenuClosing(false);
    }, 230);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.15, rootMargin: "-10% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Android back button
  useEffect(() => {
    if (!menuOpen) return;
    const onPopState = () => closeMenu();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [menuOpen]);

  return (
    <>
      {/* Nav bar — always above overlay */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        menuOpen
          ? "bg-[#1C2B2B]"
          : scrolled
          ? "bg-[#FAFAF5]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2 flex items-center justify-between">
          <a href="#" className="flex items-center flex-shrink-0">
            <div className="w-[64px] h-[64px] rounded-full bg-[#F4E2C0] flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo-transparent.png"
                alt="Surf With Tee"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link transition-colors ${
                  scrolled ? "text-[#1C2B2B]" : "text-white"
                } ${
                  activeSection === l.href.slice(1) ? "opacity-100" : activeSection ? "opacity-55" : "opacity-100"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 ${
                scrolled
                  ? "border-[#0A7075] text-[#0A7075] hover:bg-[#0A7075] hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-[#1C2B2B]"
              }`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => menuOpen ? closeMenu() : openMenu()}
            className={`md:hidden p-2 transition-colors ${
              menuOpen ? "text-white" : scrolled ? "text-[#1C2B2B]" : "text-white"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <path d="M6 6l12 12M6 18L18 6" />
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      {menuMounted && (
        <div
          className={`md:hidden fixed inset-0 z-40 bg-[#1C2B2B] flex flex-col px-8 pb-12 ${
            menuClosing ? "menu-exit" : "menu-enter"
          }`}
          style={{ paddingTop: "80px" }}
          onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            if (e.changedTouches[0].clientY - touchStartY.current > 80) closeMenu();
          }}
        >
          {/* Links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((l, i) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 py-4 border-b border-white/10 group"
                >
                  <span className="text-xs text-[#7ECECE] font-mono w-5 shrink-0">0{i + 1}</span>
                  <span className={`font-display text-4xl font-light transition-colors ${
                    isActive ? "text-[#F4E2C0]" : "text-white group-hover:text-[#F4E2C0]"
                  }`}>
                    {l.label}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7ECECE] self-center shrink-0" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTAs — Book Now primary, WhatsApp secondary */}
          <div className="flex flex-col gap-2 mt-10">
            <a
              href="#contact"
              onClick={closeMenu}
              className="px-5 py-3 rounded-full text-sm font-medium bg-[#0A7075] text-white text-center"
            >
              Book Now
            </a>
            <a
              href="https://wa.me/6281353282623?text=Hi%20Tee!%20I'd%20love%20to%20book%20a%20surf%20lesson."
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#9BBEBE] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Tee
            </a>
          </div>

          <p className="mt-5 text-xs text-white/30 text-center tracking-wide">
            Balangan Beach · Uluwatu, Bali
          </p>
        </div>
      )}
    </>
  );
}
