"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({
  children,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}) {
  const ref = useFadeIn() as React.RefObject<HTMLDivElement>;
  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style}>
      {children}
    </Tag>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Surf With Tee",
  description:
    "Private and group surf lessons in Uluwatu, Bali with local instructor Tee. Beginner to advanced, max 3 students per coach, video analysis included.",
  url: "https://surfwithtee.vercel.app",
  telephone: "+6281353282623",
  email: "surfwitht@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Pantai Balangan 315",
    addressLocality: "Jimbaran",
    addressRegion: "Bali",
    postalCode: "80361",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.8142,
    longitude: 115.1122,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.instagram.com/surf_with_t"],
  priceRange: "$$",
  image: "https://surfwithtee.vercel.app/images/tee-instructor.jpg",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "500",
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Lessons", href: "#lessons" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="bg-[#FAFAF5] text-[#1C2B2B] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF5]/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Image
              src="/images/logo-sm.png"
              alt="Surf With Tee"
              width={80}
              height={80}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link transition-colors ${
                  scrolled ? "text-[#1C2B2B]" : "text-white"
                } ${activeSection === l.href.slice(1) ? "opacity-100" : activeSection ? "opacity-55" : "opacity-100"}`}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden transition-colors ${
              scrolled ? "text-[#1C2B2B]" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FAFAF5] border-t border-[#E0E0D8] px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-[#1C2B2B] font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t border-[#E0E0D8] pt-4 flex flex-col gap-3">
              <a
                href="https://wa.me/6281353282623?text=Hi%20Tee!%20I'd%20love%20to%20book%20a%20surf%20lesson."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-[#25D366] text-white text-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Tee
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-[#0A7075] text-white text-center"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/bali-aerial.jpg"
          alt="Bali surf break aerial view"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2020]/60 via-[#0A2020]/30 to-[#0A2020]/70" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-5 opacity-80 font-medium">
            Uluwatu, Bali · Indonesia
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-6">
            Ride the Waves<br />
            <span className="italic font-medium">of Bali</span>
          </h1>
          <p className="text-lg md:text-xl opacity-85 max-w-md mx-auto mb-10 leading-relaxed font-light">
            Improve your surfing at one of the world's best breaks. Expert local coaches, max 2 students per coach, all equipment included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#lessons"
              className="px-8 py-3.5 bg-white text-[#1C2B2B] rounded-full font-medium text-sm tracking-wide hover:bg-[#F4E2C0] transition-colors"
            >
              See Lessons
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-white/70 text-white rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-[scroll-hint_2s_ease-in-out_infinite]">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── TAGLINE STRIP ───────────────────────────────────── */}
      <div className="bg-[#0A7075] text-white py-5 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="text-sm tracking-[0.2em] uppercase opacity-90 flex items-center gap-12">
              Surf With Tee · Uluwatu
              <span style={{ color: "#00AEEF" }}>✦</span>
              Improve Your Skills
              <span style={{ color: "#F5821F" }}>✦</span>
              Local Instructor
              <span style={{ color: "#00A650" }}>✦</span>
              All-Inclusive Sessions
              <span style={{ color: "#EC008C" }}>✦</span>
              Beginner to Advanced
              <span style={{ color: "#00AEEF" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeSection className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/tee-instructor.jpg"
                alt="Tee, surf instructor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#F4E2C0] rounded-2xl p-6 shadow-lg max-w-[180px]">
              <p className="font-display text-4xl font-semibold text-[#0A7075] leading-none">10+</p>
              <p className="text-xs uppercase tracking-widest mt-1 text-[#2E4444]">years in the water</p>
            </div>
          </FadeSection>

          <FadeSection>
            <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-4">Meet Your Instructor</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Hi, I'm Tee
            </h2>
            <div className="w-12 h-0.5 bg-[#0A7075] mb-8" />
            <p className="text-base leading-relaxed text-[#2E4444] mb-5">
              Born and raised in Bali, I've spent my whole life surfing the breaks of Uluwatu. I turned that passion into Surf With Tee — a surf school built on good vibes, personal attention, and a genuine love for sharing the ocean with people from all over the world.
            </p>
            <p className="text-base leading-relaxed text-[#2E4444] mb-8">
              Whether it's your very first wave or you're looking to level up your technique, I tailor every session to you. Our instructors are warm, kind and always smiling — we'll always let you know upfront who your teacher will be, and can't wait to meet you in the water.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "500+", label: "Students Taught" },
                { value: "100%", label: "First Ride Rate" },
                { value: "5★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-4 px-2 bg-[#E0F4F4] rounded-xl">
                  <p className="font-display text-2xl font-semibold text-[#0A7075]">{stat.value}</p>
                  <p className="text-xs text-[#2E4444] mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A7075] text-white rounded-full font-medium text-sm tracking-wide hover:bg-[#065052] transition-colors"
            >
              Surf With Tee
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </FadeSection>
        </div>
      </section>

      {/* ─── FULL-WIDTH SPLIT IMAGE ───────────────────────────── */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/lesson-briefing-1.jpg"
          alt="Group surf lesson briefing on the beach"
          fill
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B2B]/50 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-4xl md:text-6xl text-white font-light italic">
            "Improve your skills with us."
          </p>
          <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed font-light">
            We make sure you don't leave without learning a little more about Uluwatu — stunning beaches, mild waves, beautiful culture, and endless tropical adventures.
          </p>
        </div>
      </div>

      {/* ─── VIDEO SECTION ───────────────────────────────────── */}
      <section className="bg-[#1C2B2B] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7ECECE] font-medium mb-3">See It In Action</p>
            <h2 className="font-display text-5xl font-light text-white">Watch a Session</h2>
            <p className="mt-4 text-[#9BBEBE] max-w-md mx-auto text-sm leading-relaxed">
              Real lessons, real people, real waves — straight from the beach at Balangan.
            </p>
          </FadeSection>
          <FadeSection className="rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="/images/lesson-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full max-h-[70vh] object-cover"
            />
          </FadeSection>
        </div>
      </section>

      {/* ─── LESSONS ─────────────────────────────────────────── */}
      <section id="lessons" className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        <FadeSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-3">What We Offer</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">Surf Lessons</h2>
          <p className="mt-4 text-[#2E4444] max-w-md mx-auto">
            Tailored to your level. All equipment provided. All sessions at the best breaks Bali has to offer.
          </p>
        </FadeSection>

        {/* Single Sessions */}
        <FadeSection className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium">Single Sessions</p>
        </FadeSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-4">
          {([
            {
              title: "Group Lesson",
              ratio: "1 Instructor · 3 Students",
              duration: "2 hours",
              price: "IDR 400.000 / person",
              image: "/images/group-lesson.jpg",
              imgPos: "object-center",
              features: [
                "Fun group session with 1:3 instructor-to-student ratio",
                "Surfboard, wetsuit, sunscreen & zinc included",
                "Coffee, tea & water provided",
                "Ask about adding video review to your session",
              ],
              highlight: false,
              photoAddonPrice: null,
            },
            {
              title: "Semi-Private",
              ratio: "1 Instructor · 2 Students",
              duration: "2 hours",
              price: "IDR 500.000 / person",
              image: "/images/lesson-briefing-2.jpg",
              imgPos: "object-[center_35%]",
              features: [
                "Ideal for friends or couples",
                "Full surf gear included",
                "Coffee, tea & water provided",
                "Videographer available to capture your session",
              ],
              highlight: false,
              photoAddonPrice: null,
            },
            {
              title: "Private Lesson",
              ratio: "1 Instructor · 1 Student",
              duration: "2 hours",
              price: "IDR 700.000 / person",
              image: "/images/instructor-student.jpg",
              imgPos: "object-[center_25%]",
              features: [
                "Personalised 1-on-1 coaching",
                "All equipment included",
                "Coffee, tea & water provided",
                "Capture your session with our videographer",
              ],
              highlight: true,
              photoAddonPrice: "+ IDR 300.000",
            },
          ] as { title: string; ratio: string; duration: string; price: string; image: string; imgPos: string; features: string[]; highlight: boolean; photoAddonPrice: string | null }[]).map((lesson, i) => (
            <FadeSection
              key={lesson.title}
              className={`rounded-2xl overflow-hidden flex flex-col ${
                lesson.highlight
                  ? "ring-2 ring-[#0A7075] shadow-xl"
                  : "shadow-md"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {lesson.highlight && (
                <div className="text-white text-center py-2 text-xs tracking-widest uppercase font-medium" style={{ background: "#F5821F" }}>
                  Most Popular
                </div>
              )}
              <div className="relative h-52 gallery-item">
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  fill
                  className={`object-cover ${lesson.imgPos}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="bg-white flex-1 p-7 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-semibold">{lesson.title}</h3>
                  <p className="text-xs text-[#0A7075] mt-0.5">{lesson.ratio}</p>
                  <p className="text-xs text-[#2E4444] mt-0.5">{lesson.duration}</p>
                  <p className="font-display text-xl font-bold text-[#1C2B2B] mt-2">
                    {lesson.price}
                  </p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-5">
                  {lesson.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#2E4444]">
                      <svg className="w-4 h-4 mt-0.5 text-[#0A7075] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {lesson.photoAddonPrice && (
                  <div className="mb-5 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#F5821F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-[#1C2B2B]">Photo &amp; Video Add-on</p>
                        <p className="text-xs text-[#2E4444]">Added to your session price</p>
                      </div>
                    </div>
                    <span className="font-display text-sm font-semibold text-[#F5821F] shrink-0">{lesson.photoAddonPrice}</span>
                  </div>
                )}
                <a
                  href="#contact"
                  className={`w-full py-3 rounded-full text-sm font-medium text-center tracking-widest uppercase transition-colors ${
                    lesson.highlight
                      ? "bg-[#0A7075] text-white hover:bg-[#065052]"
                      : "border border-[#0A7075] text-[#0A7075] hover:bg-[#E0F4F4]"
                  }`}
                >
                  Book Now
                </a>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Board Rental */}
        <FadeSection className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-white rounded-2xl shadow-sm border border-[#E0E0D8]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E0F4F4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#0A7075]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6.5 19.5 C3 16 2 10 5 6 C8 2 14 1.5 18 4 C22 6.5 23 12 20 16 C17 20 10 22 6.5 19.5Z" />
                  <path d="M6.5 19.5 L20 4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#1C2B2B]">Board Rental</p>
                <p className="text-xs text-[#2E4444] mt-0.5">Ideal if you want to practise solo between sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:shrink-0">
              <div className="text-right">
                <p className="font-display text-lg font-bold text-[#1C2B2B]">IDR 100.000</p>
                <p className="text-xs text-[#2E4444]">per board · per hour</p>
              </div>
              <a href="#contact" className="px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase border border-[#0A7075] text-[#0A7075] hover:bg-[#E0F4F4] transition-colors whitespace-nowrap">
                Book Now
              </a>
            </div>
          </div>
        </FadeSection>

        {/* 3-Day Surf Camps */}
        <FadeSection className="mb-6 mt-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium">3-Day Surf Camps</p>
        </FadeSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {([
            {
              title: "3-Day Private",
              persons: "1 Person",
              price: "IDR 1.900.000",
              pricePhoto: "+ IDR 300.000",
              features: [
                "Expert coaching tailored to your skill level",
                "Beginner to advanced — all levels welcome",
                "Video review to track your progress",
              ],
            },
            {
              title: "3-Day Semi-Private",
              persons: "2 Persons",
              price: "IDR 2.800.000",
              pricePhoto: "+ IDR 300.000",
              features: [
                "Perfect for friends or couples",
                "Expert coaches tailor lessons for two",
                "Video analysis included",
              ],
            },
            {
              title: "3-Day Group",
              persons: "3 Persons",
              price: "IDR 3.400.000",
              pricePhoto: "+ IDR 300.000",
              features: [
                "Group energy — beginners to advanced welcome",
                "Learn from each other with expert guidance",
                "Video reviews to track group progress",
              ],
            },
          ] as { title: string; persons: string; price: string; pricePhoto: string; features: string[] }[]).map((pkg, i) => (
            <FadeSection
              key={pkg.title}
              className="rounded-2xl overflow-hidden flex flex-col shadow-md"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="bg-[#1C2B2B] px-7 py-5 overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#7ECECE] uppercase tracking-widest font-medium mb-1.5">3-Day Camp</p>
                    <h3 className="font-display text-2xl font-semibold text-white">{pkg.title}</h3>
                    <p className="text-xs text-[#9BBEBE] mt-1">{pkg.persons}</p>
                  </div>
                  <span className="font-display text-7xl font-light text-white/10 leading-none select-none -mt-2 shrink-0">{i + 1}</span>
                </div>
              </div>
              <div className="bg-white flex-1 p-7 flex flex-col">
                <p className="font-display text-xl font-bold text-[#1C2B2B] mb-4">{pkg.price}</p>
                <ul className="space-y-2.5 flex-1 mb-5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#2E4444]">
                      <svg className="w-4 h-4 mt-0.5 text-[#0A7075] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-5 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#F5821F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-[#1C2B2B]">Add-on: Photo &amp; Video</p>
                      <p className="text-xs text-[#2E4444]">Professional surf footage</p>
                    </div>
                  </div>
                  <span className="font-display text-sm font-semibold text-[#F5821F] shrink-0">{pkg.pricePhoto}</span>
                </div>
                <a
                  href="#contact"
                  className="w-full py-3 rounded-full text-sm font-medium text-center tracking-widest uppercase border border-[#0A7075] text-[#0A7075] hover:bg-[#E0F4F4] transition-colors"
                >
                  Book Now
                </a>
              </div>
            </FadeSection>
          ))}
        </div>
        <FadeSection className="mt-6">
          <p className="text-xs text-[#2E4444]/60 text-center">Pickup and boat fees are not included — ask Tee for details when booking.</p>
        </FadeSection>
      </section>

      {/* ─── WHY US ──────────────────────────────────────────── */}
      <section className="bg-[#1C2B2B] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7ECECE] font-medium mb-3">Why Choose Us</p>
            <h2 className="font-display text-5xl font-light">The Surf With Tee Difference</h2>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {[
              {
                num: "01",
                color: "#00AEEF",
                title: "Perfect for Any Level",
                body: "Whether it's your first time on a surfboard or you're looking to improve your surfing, our certified coaches are here to guide you. Enjoy daily surf sessions in the Indian Ocean, tailored to your skill level.",
              },
              {
                num: "02",
                color: "#F5821F",
                title: "Small Groups",
                body: "With a maximum of 3 surfers per coach, you'll receive focused coaching that ensures significant progress every session.",
              },
              {
                num: "03",
                color: "#00A650",
                title: "Improve Your Surf",
                body: "For surfers looking to elevate their abilities, we offer daily sessions with our expert local coach, supported by detailed video analysis and line-up coaching. Our surf-specific fitness training is designed to improve your strength and precision.",
              },
              {
                num: "04",
                color: "#EC008C",
                title: "All-Inclusive",
                body: "Zinc, surfboard, rashguard, locker and transport to the best surf spots included. Get ready to ride the waves and make unforgettable memories.",
              },
            ].map((item, i) => (
              <FadeSection
                key={item.title}
                className="text-left"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p className="font-display text-7xl font-light leading-none mb-5 select-none" style={{ color: item.color }}>{item.num}</p>
                <h3 className="font-display text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-[#9BBEBE] leading-relaxed text-sm">{item.body}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─────────────────────────────────────────── */}
      <section id="gallery" className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        <FadeSection className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-3">Real Sessions</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light">Life on the Water</h2>
        </FadeSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { src: "/images/hero-surf.jpg", pos: "object-center", tall: true, alt: "Surfer riding a wave at Uluwatu, Bali" },
            { src: "/images/lesson-briefing-1.jpg", pos: "object-[center_30%]", tall: false, alt: "Pre-session beach briefing with Tee" },
            { src: "/images/surf-action-1.jpg", pos: "object-center", tall: false, alt: "Student catching their first wave" },
            { src: "/images/lesson-briefing-2.jpg", pos: "object-[center_35%]", tall: false, alt: "Coach reviewing surf technique on the sand" },
            { src: "/images/surf-action-2.jpg", pos: "object-center", tall: false, alt: "Beginner standing up on a wave at Balangan" },
            { src: "/images/surf-action-3.jpg", pos: "object-center", tall: true, alt: "Surfer carving through a clean break at Uluwatu" },
            { src: "/images/surf-action-5.jpg", pos: "object-center", tall: false, alt: "Group lesson in the water at Bali" },
            { src: "/images/surf-action-6.jpg", pos: "object-center", tall: false, alt: "Aerial view of a surfer on a Bali wave" },
          ].map((img, i) => (
            <div
              key={i}
              className={`gallery-item rounded-xl overflow-hidden relative aspect-[4/3] md:aspect-auto ${
                img.tall ? "md:row-span-2 md:min-h-[420px]" : "md:min-h-[200px]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover ${img.pos}`}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── LEVELS ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#E0F4F4]">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-3">How We Coach</p>
            <h2 className="font-display text-5xl font-light text-[#1C2B2B]">Your Progression Path</h2>
            <p className="mt-4 text-[#2E4444] max-w-2xl mx-auto text-sm leading-relaxed">
              It's normal to feel "in between" levels — every surfer progresses at their own pace. These levels help us tailor coaching to your needs and guide the technical improvements we'll focus on during your stay. With video analysis from both water and air perspectives, you'll have every angle covered.
            </p>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                level: "I",
                color: "#00AEEF",
                title: "Beginner",
                badge: "Start here",
                points: ["Surf equipment & safety", "How to paddle", "Pop-up technique", "Rules of the line-up"],
              },
              {
                level: "II",
                color: "#F5821F",
                title: "Getting Comfortable",
                badge: null,
                points: ["Comfortable in the line-up", "Turtle rolls through whitewater", "Standing on whitewater waves", "Balancing your body weight"],
              },
              {
                level: "III",
                color: "#00A650",
                title: "Catching Unbroken Waves",
                badge: null,
                points: ["Positioning to catch waves solo", "Using head weight while paddling", "Right timing to paddle for a wave", "Dropping down the face without falling"],
              },
              {
                level: "IV",
                color: "#EC008C",
                title: "Reading Waves",
                badge: "Advanced",
                points: ["Wave reading basics", "Anticipating wave direction", "Angling the take-off", "Trimming vs carving"],
              },
            ].map((l, i) => (
              <FadeSection
                key={l.level}
                className="bg-white rounded-2xl p-6 shadow-sm"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-semibold" style={{ color: l.color }}>{l.level}</span>
                  {l.badge && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ color: l.color, background: `${l.color}18` }}>{l.badge}</span>
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1C2B2B] mb-4">{l.title}</h3>
                <ul className="space-y-2">
                  {l.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-[#2E4444] leading-relaxed">
                      <span className="text-[#0A7075] mt-0.5 shrink-0">›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────── */}
      <section className="bg-[#F4E2C0] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-3">What Students Say</p>
            <h2 className="font-display text-5xl font-light text-[#1C2B2B]">Their Words</h2>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Tee is the best surf instructor I've ever had. He's patient, funny, and genuinely excited for you when you catch your first wave.",
                name: "Sophie L.",
                origin: "Netherlands",
              },
              {
                quote: "I was terrified of the ocean before this. After two lessons with Tee I was standing up and totally hooked. I've been back every trip since.",
                name: "James R.",
                origin: "Australia",
              },
              {
                quote: "We did a group session with 4 friends and it was the highlight of our whole Bali trip. Tee makes you feel at ease in the water immediately.",
                name: "Camille B.",
                origin: "France",
              },
            ].map((t) => (
              <FadeSection key={t.name} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#F5821F]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#2E4444] mb-5 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-[#1C2B2B] text-sm">{t.name}</p>
                  <p className="text-xs text-[#0A7075]">{t.origin}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / BOOK ──────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeSection>
            <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-4">Get in Touch</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Ready to Surf?
            </h2>
            <div className="w-12 h-0.5 bg-[#0A7075] mb-8" />
            <p className="text-[#2E4444] leading-relaxed mb-6">
              Drop me a message on WhatsApp or fill out the form and I'll get back to you within a few hours. Let's find the perfect session for you.
            </p>

            <a
              href="https://maps.app.goo.gl/L2vwUwsubBKG5FWZA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 mb-8 p-4 bg-[#F4E2C0]/60 rounded-xl border border-[#D4B896]/40 hover:bg-[#F4E2C0]/90 transition-colors group"
            >
              <svg className="w-4 h-4 text-[#0A7075] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1C2B2B] mb-0.5">Find us at</p>
                <p className="text-xs text-[#2E4444]">Jl. Pantai Balangan 315, Jimbaran<br />Kuta Selatan, Badung — Bali 80361</p>
              </div>
              <svg className="w-3.5 h-3.5 text-[#0A7075] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>

            <div className="space-y-5">
              <a
                href="https://wa.me/6281353282623?text=Hi%20Tee!%20I'd%20love%20to%20book%20a%20surf%20lesson."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1C2B2B] text-sm">WhatsApp</p>
                  <p className="text-xs text-[#2E4444]">Fastest way to reach me</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#2E4444] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/surf_with_t"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#0A7075]/5 border border-[#0A7075]/20 rounded-xl hover:bg-[#0A7075]/10 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1C2B2B] text-sm">@surf_with_t</p>
                  <p className="text-xs text-[#2E4444]">See more sessions & vibes</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#2E4444] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="mailto:surfwitht@gmail.com"
                className="flex items-center gap-4 p-4 bg-[#0A7075]/5 border border-[#0A7075]/20 rounded-xl hover:bg-[#0A7075]/10 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#0A7075] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1C2B2B] text-sm">surfwitht@gmail.com</p>
                  <p className="text-xs text-[#2E4444]">Drop us a message anytime</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#2E4444] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-[#E0E0D8] shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Jl.+Pantai+Balangan+315,+Jimbaran,+Bali+80361&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Surf With Tee location on Google Maps"
              />
              <a
                href="https://maps.app.goo.gl/L2vwUwsubBKG5FWZA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#0A7075] text-white text-xs font-medium tracking-wide hover:bg-[#065052] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </FadeSection>

          <FadeSection>
            <form className="bg-white rounded-2xl p-8 shadow-md space-y-5">
              <h3 className="font-display text-2xl font-semibold text-[#1C2B2B] mb-2">Send a Message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">Lesson Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors text-[#2E4444]">
                  <option value="">Select a package...</option>
                  <option>Group Lesson</option>
                  <option>Semi-Private</option>
                  <option>Private Lesson</option>
                  <option>Board Rental</option>
                  <option>3-Day Private</option>
                  <option>3-Day Semi-Private</option>
                  <option>3-Day Group</option>
                  <option>Not sure — help me choose</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors text-[#2E4444]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell me your experience level, how many people, any questions..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#0A7075] text-white rounded-full font-medium text-sm tracking-wide hover:bg-[#065052] transition-colors"
              >
                Send Message
              </button>
            </form>

            <FadeSection className="mt-6 p-5 bg-[#FAFAF5] border border-[#E0E0D8] rounded-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1C2B2B] mb-3">Cancellation Policy</p>
              <ul className="space-y-2">
                {[
                  { label: "14+ days before", value: "100% refund" },
                  { label: "7–13 days before", value: "50% refund" },
                  { label: "Less than 7 days", value: "Non-refundable" },
                ].map((row) => (
                  <li key={row.label} className="flex justify-between text-xs text-[#2E4444]">
                    <span>{row.label}</span>
                    <span className="font-medium text-[#1C2B2B]">{row.value}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#2E4444]/70 mt-3 leading-relaxed">
                Full payment required at time of booking. Sessions may be rescheduled due to poor weather — we'll always offer a suitable alternative.
              </p>
            </FadeSection>
          </FadeSection>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#1C2B2B] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/images/logo-sm.png"
              alt="Surf With Tee"
              width={96}
              height={96}
              className="brightness-0 invert opacity-90"
            />
            <p className="text-sm text-[#9BBEBE]">Jl. Pantai Balangan 315, Jimbaran · Uluwatu, Bali</p>
          </div>
          <div className="flex gap-8 text-sm text-[#9BBEBE]">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-[#9BBEBE]/60">
            © {new Date().getFullYear()} Surf With Tee. All rights reserved.
          </p>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex justify-center">
          <p className="text-xs text-[#9BBEBE]/40">
            Made with ❤️ in Bali ·{" "}
            <a href="https://9line.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#9BBEBE]/70 transition-colors underline underline-offset-2">
              9line.dev
            </a>
          </p>
        </div>
      </footer>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
