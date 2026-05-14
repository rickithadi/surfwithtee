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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Lessons", href: "#lessons" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="bg-[#FAFAF5] text-[#1C2B2B]">
      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF5]/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            className={`font-display text-xl font-semibold tracking-wider transition-colors ${
              scrolled ? "text-[#1C2B2B]" : "text-white"
            }`}
          >
            SURF WITH TEE
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link transition-colors ${
                  scrolled ? "text-[#1C2B2B]" : "text-white"
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
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-[#0A7075] text-white text-center"
            >
              Book Now
            </a>
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
            Private and group surf lessons at one of the world's top surf spots. All equipment provided. Max 2 students per coach.
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
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
              Bali's Warmest Surf School
              <span className="opacity-40">✦</span>
              Beginner Friendly
              <span className="opacity-40">✦</span>
              Local Instructor
              <span className="opacity-40">✦</span>
              Unforgettable Experience
              <span className="opacity-40">✦</span>
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
              Born and raised in Bali, I've spent my whole life surfing the breaks of Uluwatu. I turned that passion into PT. Surf With Tee — a surf school built on good vibes, personal attention, and a genuine love for sharing the ocean with people from all over the world.
            </p>
            <p className="text-base leading-relaxed text-[#2E4444] mb-8">
              Whether it's your very first wave or you're looking to level up your technique, I tailor every session to you. Our instructors are nice, kind and always smiling — we'll always let you know upfront who your teacher will be, and we both can't wait to meet you in the water.
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
          src="/images/group-lesson.jpg"
          alt="Group surf lesson in Bali"
          fill
          className="object-cover object-[center_60%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B2B]/40 flex items-center justify-center">
          <p className="font-display text-4xl md:text-6xl text-white font-light italic text-center px-4">
            "Every wave is a new beginning."
          </p>
        </div>
      </div>

      {/* ─── LESSONS ─────────────────────────────────────────── */}
      <section id="lessons" className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        <FadeSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0A7075] font-medium mb-3">What We Offer</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">Surf Lessons</h2>
          <p className="mt-4 text-[#2E4444] max-w-md mx-auto">
            Tailored to your level. All equipment provided. All sessions at the best breaks Bali has to offer.
          </p>
        </FadeSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              title: "Beginner Lesson",
              duration: "2 Hours",
              price: "Contact for rates",
              image: "/images/lesson-beach.jpg",
              imgPos: "object-[center_30%]",
              features: [
                "Pickup from Uluwatu area (scooter/car) or meet at the beach",
                "Land-based surf guidance & safety briefing",
                "Warm-up exercises on land",
                "Practice paddling & pop-up with close instructor guidance",
                "Surfboard, leash, surf shirt & zinc sunscreen included",
              ],
              highlight: false,
            },
            {
              title: "All-Inclusive Session",
              duration: "Choose your slot",
              price: "Contact for rates",
              image: "/images/surf-action-4.jpg",
              imgPos: "object-center",
              features: [
                "Max 2 surfers per coach — real personal attention",
                "Transport to the best surf spots that day",
                "Surfboard, rash guard, zinc & locker included",
                "Suitable for beginner to advanced",
                "Multiple time slots available",
              ],
              highlight: true,
            },
            {
              title: "Coaching Package",
              duration: "Multi-session",
              price: "Contact for rates",
              image: "/images/instructor-student.jpg",
              imgPos: "object-[center_25%]",
              features: [
                "Structured progression through levels 1 → 1.3",
                "Video analysis from water & air perspectives",
                "Surf-specific fitness coaching",
                "Line-up tactics & wave reading",
                "For intermediate to advanced surfers",
              ],
              highlight: false,
            },
          ].map((lesson, i) => (
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
                <div className="bg-[#0A7075] text-white text-center py-2 text-xs tracking-widest uppercase font-medium">
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
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{lesson.title}</h3>
                    <p className="text-sm text-[#0A7075] mt-0.5">{lesson.duration}</p>
                  </div>
                  <span className="font-display text-lg font-medium text-[#1C2B2B]">{lesson.price}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {lesson.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#2E4444]">
                      <svg className="w-4 h-4 mt-0.5 text-[#0A7075] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full py-3 rounded-full text-sm font-medium text-center tracking-wide transition-colors ${
                    lesson.highlight
                      ? "bg-[#0A7075] text-white hover:bg-[#065052]"
                      : "border border-[#0A7075] text-[#0A7075] hover:bg-[#E0F4F4]"
                  }`}
                >
                  Book This
                </a>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ─── WHY US ──────────────────────────────────────────── */}
      <section className="bg-[#1C2B2B] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7ECECE] font-medium mb-3">Why Choose Us</p>
            <h2 className="font-display text-5xl font-light">The Surf With Tee Difference</h2>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              {
                icon: "🎥",
                title: "Video Analysis",
                body: "We film your sessions from both water and air perspectives so you can see exactly what to improve. Real feedback, not just feelings.",
              },
              {
                icon: "🤙",
                title: "Max 2 Per Coach",
                body: "No crowded lineups, no waiting around. With a maximum of 2 surfers per coach, you get focused, meaningful progression every single session.",
              },
              {
                icon: "🌊",
                title: "Best Spots in Uluwatu",
                body: "We take you to the right break for your level — whether it's your first pop-up or you're chasing unbroken waves at Balangan.",
              },
            ].map((item, i) => (
              <FadeSection
                key={item.title}
                className="text-center"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-display text-2xl font-medium mb-3">{item.title}</h3>
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
          <h2 className="font-display text-5xl md:text-6xl font-light">Life on the Water</h2>
        </FadeSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { src: "/images/hero-surf.jpg", pos: "object-center", tall: true },
            { src: "/images/surf-action-4.jpg", pos: "object-[center_30%]", tall: false },
            { src: "/images/surf-action-1.jpg", pos: "object-center", tall: false },
            { src: "/images/beach-board.jpg", pos: "object-[center_40%]", tall: false },
            { src: "/images/surf-action-2.jpg", pos: "object-center", tall: false },
            { src: "/images/surf-action-3.jpg", pos: "object-center", tall: true },
            { src: "/images/surf-action-5.jpg", pos: "object-center", tall: false },
            { src: "/images/surf-action-6.jpg", pos: "object-center", tall: false },
          ].map((img, i) => (
            <div
              key={i}
              className={`gallery-item rounded-xl overflow-hidden relative ${
                img.tall ? "row-span-2" : ""
              }`}
              style={{ aspectRatio: img.tall ? undefined : "4/3", minHeight: img.tall ? "420px" : "200px" }}
            >
              <Image
                src={img.src}
                alt="Surf session in Bali"
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
            <p className="mt-4 text-[#2E4444] max-w-xl mx-auto text-sm leading-relaxed">
              It's normal to feel "in between" levels — every surfer progresses at their own pace. These levels help us tailor your coaching and track your real improvement.
            </p>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                level: "1.0",
                title: "Beginner",
                badge: "Start here",
                points: ["Surf equipment & safety", "How to paddle", "Pop-up technique", "Rules of the line-up"],
              },
              {
                level: "1.1",
                title: "Getting Comfortable",
                badge: null,
                points: ["Comfortable in the line-up", "Turtle rolls through whitewater", "Standing on whitewater waves", "Balancing your body weight"],
              },
              {
                level: "1.2",
                title: "Catching Unbroken Waves",
                badge: null,
                points: ["Positioning to catch waves solo", "Using head weight while paddling", "Right timing to paddle for a wave", "Dropping down the face without falling"],
              },
              {
                level: "1.3",
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
                  <span className="font-display text-3xl font-semibold text-[#0A7075]">{l.level}</span>
                  {l.badge && (
                    <span className="text-xs bg-[#0A7075]/10 text-[#0A7075] px-2.5 py-1 rounded-full font-medium">{l.badge}</span>
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
                    <svg key={i} className="w-4 h-4 text-[#0A7075]" viewBox="0 0 24 24" fill="currentColor">
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

            <div className="flex items-start gap-3 mb-8 p-4 bg-[#F4E2C0]/60 rounded-xl border border-[#D4B896]/40">
              <svg className="w-4 h-4 text-[#0A7075] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              <div>
                <p className="text-xs font-semibold text-[#1C2B2B] mb-0.5">Find us at</p>
                <p className="text-xs text-[#2E4444]">Jl. Pantai Balangan 315, Jimbaran<br />Kuta Selatan, Badung — Bali 80361</p>
              </div>
            </div>

            <div className="space-y-5">
              <a
                href="https://wa.me/6281234567890?text=Hi%20Tee!%20I'd%20love%20to%20book%20a%20surf%20lesson."
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
                href="https://www.instagram.com/surfwithtee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#E040FB]/10 border border-[#E040FB]/20 rounded-xl hover:bg-[#E040FB]/15 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1C2B2B] text-sm">@surfwithtee</p>
                  <p className="text-xs text-[#2E4444]">See more sessions & vibes</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#2E4444] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-8 p-5 bg-[#FAFAF5] border border-[#E0E0D8] rounded-xl">
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
                  <option value="">Select a lesson...</option>
                  <option>Beginner Lesson (2hrs)</option>
                  <option>Group Surf Day (3hrs)</option>
                  <option>Private Package (5 sessions)</option>
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
          </FadeSection>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#1C2B2B] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-semibold tracking-wide mb-1">SURF WITH TEE</p>
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
