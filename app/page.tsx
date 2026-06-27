/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// ============================================================================
// 0. MOTION SYSTEM: Cinematic Easing & Variants
// ============================================================================
const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpBlur = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

const lineExpand = {
  hidden: { scaleX: 0, transformOrigin: "left", opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: cinematicEase, delay: 0.2 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const MagneticWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: cinematicEase, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// 1. DATA LAYER
// ============================================================================

const PROJECTS_DATA = [
  {
    num: "01",
    client: "ETHIOPIAN ATHLETE PERFORMANCE TRACKER (EAPT)",
    tags: "Next.js / Tailwind CSS / Node.js",
    imgSrc:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    num: "02",
    client: "BONGA CLINIC MANAGEMENT",
    tags: "React / Express / PHP / MySQL",
    imgSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    link: "http://bonga-clinic.infinityfreeapp.com/?i=1",
  },
  {
    num: "03",
    client: "HOUSE RENTAL MANAGEMENT SYSTEM",
    tags: "React / Node.js / MongoDB",
    imgSrc:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    num: "04",
    client: "GYM MANAGEMENT PLATFORM",
    tags: "Next.js / Supabase / Tailwind",
    imgSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    num: "05",
    client: "GADEM DELIVERY",
    tags: "React Native / Firebase / Maps API",
    imgSrc:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
    link: "https://gadem-delivery-app.onrender.com/",
  },
  {
    num: "06",
    client: "FLOWER SHOP E-COMMERCE",
    tags: "Next.js / Stripe / Framer Motion",
    imgSrc:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    num: "07",
    client: "EXIT EXAM PREP GUIDE",
    tags: "React / PostgreSQL / Redis",
    imgSrc:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
];

const CERTIFICATES_DATA = [
  {
    num: "01",
    title: "DATABASE DESIGN AND BASIC SQL IN POSTGRESQL",
    issuer: "Coursera",
    details:
      "Mastery of relational database design, entity-relationship models, and executing foundational SQL queries in PostgreSQL.",
    certLink: "https://coursera.org/share/38703b96629758d3360243256a1bde64",
  },
  {
    num: "02",
    title: "ADVANCED FULL-STACK ENGINEERING",
    issuer: "Meta Blueprint / Coursera",
    details:
      "Rigorous focus on modern frontend workflows, distributed systems, state machines, and microservice integration architectures.",
    certLink: "#",
  },
  {
    num: "03",
    title: "INTERACTIVE DESIGN & MOTION SYSTEMS",
    issuer: "Awwwards Academy",
    details:
      "Immersive development specializing in luxury UI layouts, fluid physics-based motion tracking, and performance optimization.",
    certLink: "#",
  },
];

const SKILLS_DATA = [
  {
    category: "FRONTEND & DESIGN",
    items: ["React", "Next.js", "JavaScript", "UI/UX Design", "Tailwind CSS"],
  },
  {
    category: "BACKEND & CORE",
    items: ["Node.js", "Express.js", "PHP", "Java", "C++"],
  },
  {
    category: "DATABASE & INFRASTRUCTURE",
    items: ["PostgreSQL", "MySQL", "Cisco Packet Tracer", "Firebase"],
  },
];

const MARQUEE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
];

// ============================================================================
// 2. UI SECTIONS
// ============================================================================

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section className="relative min-h-screen w-full bg-[#000000] text-white overflow-hidden flex flex-col justify-between pt-6 pb-16 px-4 sm:px-8 md:px-16 lg:px-20 select-none">
      <nav className="w-full max-w-7xl mx-auto z-30 grid grid-cols-5 text-center font-sans text-[11px] font-bold tracking-[0.2em] text-neutral-400/80 pt-4">
        <a
          href="#about"
          className="hover:text-white transition-colors justify-self-start uppercase"
        >
          ABOUT
        </a>
        <a
          href="#skills"
          className="hover:text-white transition-colors uppercase"
        >
          SKILLS
        </a>
        <a
          href="#projects"
          className="hover:text-white transition-colors uppercase"
        >
          PROJECTS
        </a>
        <a
          href="#certifications"
          className="hover:text-white transition-colors uppercase"
        >
          CERTS
        </a>
        <a
          href="#contact"
          className="hover:text-white transition-colors justify-self-end uppercase"
        >
          CONTACT
        </a>
      </nav>

      <motion.div
        style={{ y }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative mt-4 mb-auto"
      >
        <div className="relative w-full flex flex-col items-center justify-center min-h-[45vh]">
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.5, ease: cinematicEase }}
            className="text-[10vw] lg:text-[9.5vw] font-[1000] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] uppercase font-sans z-0 select-none text-center w-full whitespace-nowrap pb-12"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.07em",
            }}
          >
            HI, I&apos;M DANIEL
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: cinematicEase, delay: 0.2 }}
            className="absolute top-[52%] sm:top-[55%] w-[75vw] sm:w-[58vw] md:w-[48vw] lg:w-[38vw] max-w-[520px] aspect-square z-10 pointer-events-auto group cursor-pointer"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-black bg-[#0d0d11] shadow-[0_50px_100px_rgba(0,0,0,0.95)] relative">
              <img
                src="dani.png"
                alt="Profile"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: cinematicEase, delay: 0.8 }}
        className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 pt-32 relative z-20 border-t border-white/[0.03]"
      >
        <p className="text-neutral-300 font-sans text-[12px] font-bold tracking-wide max-w-xs uppercase text-center sm:text-left">
          A PASSIONATED FULL-STACK DEVELOPER & UI/UX DESIGNER PASSIONATE ABOUT
          CRAFTING BOLD AND MEMORABLE PROJECTS 🚀
        </p>
        <MagneticWrapper>
          <a
            href="#contact"
            className="inline-flex items-center justify-center text-white font-sans font-black text-[12px] tracking-wider uppercase px-11 py-4.5 rounded-full bg-gradient-to-r from-[#2A1B54] via-[#701A75] to-[#DB2777] border border-white/10 hover:brightness-125 transition-all duration-500 shadow-[0_15px_35px_rgba(112,26,117,0.3)]"
          >
            CONTACT ME
          </a>
        </MagneticWrapper>
      </motion.div>
    </section>
  );
};

const GallerySection = () => (
  <section className="relative w-full bg-[#000000] pt-24 pb-12 overflow-hidden flex flex-col items-center z-20">
    <div className="w-full max-w-7xl px-6 mb-8 flex justify-between items-center text-neutral-500 font-mono text-[10px] tracking-[0.3em] uppercase">
      <span>SEC. 02 / GALLERY</span>
      <span>SCROLL TO EXPLORE</span>
    </div>
    <div className="w-full flex gap-4 overflow-hidden mask-horizontal-fade select-none py-4 relative container-marquee">
      <div className="flex gap-4 items-center whitespace-nowrap animate-marquee">
        {MARQUEE_IMAGES.map((imgSrc, idx) => (
          <div
            key={`orig-${idx}`}
            className="w-[280px] sm:w-[360px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/[0.08] flex-shrink-0"
          >
            <img
              src={imgSrc}
              alt="Preview"
              className="w-full h-full object-cover filter brightness-[0.85] transition-all duration-700 hover:brightness-100 hover:scale-105"
            />
          </div>
        ))}
        {MARQUEE_IMAGES.map((imgSrc, idx) => (
          <div
            key={`dup-${idx}`}
            className="w-[280px] sm:w-[360px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/[0.08] flex-shrink-0"
          >
            <img
              src={imgSrc}
              alt="Preview"
              className="w-full h-full object-cover filter brightness-[0.85] transition-all duration-700 hover:brightness-100 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section
    id="about"
    className="relative w-full min-h-[80vh] bg-[#000000] text-white pt-32 pb-24 px-6 overflow-hidden flex flex-col justify-center items-center z-20"
  >
    <div className="w-full max-w-4xl mx-auto text-center space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.2, ease: cinematicEase }}
        className="text-[13vw] sm:text-[9vw] font-[1000] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500/80"
      >
        ABOUT ME
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.6, ease: cinematicEase, delay: 0.2 }}
        className="text-neutral-300 font-sans text-[17px] sm:text-[21px] font-bold tracking-wide uppercase leading-relaxed"
      >
        I am Daniel Nigussie, a third-year Computer Science student specializing
        in Full-Stack Development, Mobile Applications, and Cloud Technologies.
        I enjoy transforming ideas into practical digital solutions through
        clean code, modern technologies, and thoughtful design. Passionate about
        technology, continuous learning, and self-improvement, I am dedicated to
        building impactful software that solves real-world problems and creates
        meaningful user experiences.
      </motion.p>
    </div>
  </section>
);

const SkillsSection = () => (
  <section
    id="skills"
    className="relative w-full bg-[#000000] text-white py-24 px-4 sm:px-8 md:px-16 lg:px-20 z-30"
  >
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full mb-16"
      >
        <motion.span
          variants={fadeUpBlur}
          className="block font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-4 text-center sm:text-left"
        >
          SEC. 02.5 / TECHNICAL ARSENAL
        </motion.span>
        <motion.h2
          variants={fadeUpBlur}
          className="text-[11vw] sm:text-[7vw] font-[1000] tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500/50 leading-none text-center sm:text-left"
        >
          SKILLS
        </motion.h2>
        <motion.div
          variants={lineExpand}
          className="w-full h-[1px] bg-white/[0.07] mt-8"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {SKILLS_DATA.map((skillGroup, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1.2,
              ease: cinematicEase,
              delay: idx * 0.2,
            }}
            className="flex flex-col space-y-6"
          >
            <h3 className="font-sans text-[18px] sm:text-[22px] font-bold tracking-tight text-white uppercase border-b border-white/[0.06] pb-4">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] tracking-[0.15em] text-neutral-300 backdrop-blur-md bg-white/[0.03] px-4 py-2 rounded-lg border border-white/[0.08] hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length,
    );

  const getOffset = (index: number) => {
    const total = PROJECTS_DATA.length;
    let offset = (index - currentIndex) % total;
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#000000] text-white flex flex-col overflow-hidden z-30 pt-24 pb-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20 relative z-40 mb-16 lg:mb-20"
      >
        <motion.span
          variants={fadeUpBlur}
          className="block font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-4 text-center sm:text-left"
        >
          SEC. 03 / PORTFOLIO EXHIBIT
        </motion.span>
        <motion.h2
          variants={fadeUpBlur}
          className="text-[11vw] sm:text-[7vw] font-[1000] tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500/50 leading-none text-center sm:text-left"
        >
          PROJECTS
        </motion.h2>
        <motion.div
          variants={lineExpand}
          className="w-full h-[1px] bg-white/[0.07] mt-8"
        />
      </motion.div>

      <div
        className="w-full flex flex-col items-center justify-center relative z-40 px-4 sm:px-8 mt-10"
        style={{ perspective: "1500px" }}
      >
        <div className="relative w-full max-w-[1000px] h-[550px] flex items-center justify-center transform-style-3d">
          <AnimatePresence>
            {PROJECTS_DATA.map((project, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={project.num}
                  initial={false}
                  animate={{
                    x: offset * 260,
                    z: Math.abs(offset) * -200,
                    rotateY: offset * -20,
                    scale: isCenter
                      ? 1
                      : Math.max(0.6, 1 - Math.abs(offset) * 0.15),
                    opacity: isCenter
                      ? 1
                      : Math.max(0, 0.5 - Math.abs(offset) * 0.2),
                  }}
                  transition={{ duration: 1.2, ease: cinematicEase }}
                  className={`absolute w-[90vw] sm:w-[70vw] max-w-[850px] h-[480px] sm:h-[550px] bg-[#0c0c0e]/95 rounded-[2.5rem] p-6 sm:p-8 border border-white/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden will-change-transform ${isCenter ? "z-50 pointer-events-auto" : "z-30 pointer-events-none"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-20 pb-5 border-b border-white/[0.06] gap-4">
                    <div className="space-y-1">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase leading-none">
                        PROJECT {project.num}
                      </span>
                      <h3 className="font-sans text-[18px] sm:text-[22px] font-bold tracking-tight text-white uppercase line-clamp-1 mt-1">
                        {project.client}
                      </h3>
                    </div>
                    <MagneticWrapper>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/[0.15] font-sans font-bold text-[10px] tracking-widest text-neutral-300 hover:text-black hover:bg-white transition-all duration-500 backdrop-blur-md relative z-50 pointer-events-auto cursor-pointer flex-shrink-0"
                        onClick={(e) => {
                          if (!isCenter) e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        LIVE ↗
                      </a>
                    </MagneticWrapper>
                  </div>
                  <div className="w-full flex-1 mt-6 rounded-[1.5rem] overflow-hidden border border-white/[0.06] bg-neutral-950 relative z-10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                      src={project.imgSrc}
                      alt={project.client}
                      className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05] transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                      <p className="font-mono text-[10px] tracking-[0.15em] text-neutral-200 backdrop-blur-md bg-black/40 px-4 py-2 rounded-lg border border-white/10 inline-block uppercase shadow-xl">
                        {project.tags}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-[1000px] flex items-center justify-between mt-12 relative z-50 px-4">
          <div className="flex gap-4 items-center">
            <MagneticWrapper>
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-white/[0.1] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-neutral-400 group cursor-pointer shadow-2xl"
              >
                <span className="transform transition-transform duration-500 group-hover:-translate-x-1 text-sm font-bold">
                  ←
                </span>
              </button>
            </MagneticWrapper>
            <MagneticWrapper>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border border-white/[0.1] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-neutral-400 group cursor-pointer shadow-2xl"
              >
                <span className="transform transition-transform duration-500 group-hover:translate-x-1 text-sm font-bold">
                  →
                </span>
              </button>
            </MagneticWrapper>
          </div>
          <div className="flex items-baseline font-mono tracking-widest text-neutral-500 font-medium select-none pointer-events-none">
            <span className="text-white font-bold text-[18px]">
              {PROJECTS_DATA[currentIndex].num}
            </span>
            <span className="mx-2 text-[13px] opacity-40">/</span>
            <span className="text-[13px]">
              {String(PROJECTS_DATA.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CertificatesSection = () => {
  return (
    <section
      id="certifications"
      className="relative w-full bg-[#000000] text-white pt-32 pb-48 px-4 sm:px-8 md:px-16 lg:px-20 z-40"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
          className="w-full mb-24 overflow-hidden"
        >
          <motion.span
            variants={fadeUpBlur}
            className="block font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-4 text-center sm:text-left"
          >
            SEC. 04 / AUTHENTICATION
          </motion.span>
          <motion.h2
            variants={fadeUpBlur}
            className="text-[13vw] sm:text-[9vw] font-[1000] tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500/50 leading-none text-center sm:text-left"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            CERTIFICATIONS
          </motion.h2>
          <motion.div
            variants={lineExpand}
            className="w-full h-[1px] bg-white/[0.07] mt-8"
          />
        </motion.div>

        <div className="w-full flex flex-col">
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                ease: cinematicEase,
                delay: index * 0.15,
              }}
              className="w-full grid grid-cols-1 md:grid-cols-[80px_1fr_2fr_120px] gap-4 md:gap-8 py-12 border-b border-white/[0.06] group cursor-pointer relative transition-colors duration-700 hover:bg-neutral-900/20 px-4 rounded-xl items-center"
            >
              <div className="font-sans text-[28px] sm:text-[36px] font-[1000] tracking-tight text-neutral-600 transition-colors duration-700 group-hover:text-white leading-none">
                {cert.num}
              </div>
              <div className="flex flex-col justify-start space-y-1">
                <h3 className="font-sans text-[18px] sm:text-[22px] font-black tracking-tight text-white leading-tight uppercase">
                  {cert.title}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.15em] text-neutral-400 font-bold uppercase">
                  {cert.issuer}
                </span>
              </div>
              <div className="flex items-center">
                <p className="font-sans text-[13px] sm:text-[14px] font-medium leading-relaxed tracking-wide text-neutral-400/80 max-w-xl group-hover:text-neutral-300 transition-colors duration-700">
                  {cert.details}
                </p>
              </div>
              <div className="flex md:justify-end items-center z-10">
                <a
                  href={cert.certLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest font-bold text-neutral-500 group-hover:text-white border-b border-neutral-700 group-hover:border-white pb-1 transition-all duration-500 uppercase"
                >
                  VERIFY ↗
                </a>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-[1s] ease-[0.16,1,0.3,1] group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 3. NEW SECTIONS: Contact Form & Footer
// ============================================================================

const ContactSection = () => {
  const words = ["LET'S", "GET IN", "TOUCH"];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#f4f4f5] text-black pt-32 pb-32 px-6 sm:px-12 md:px-20 z-40 overflow-hidden rounded-t-[3rem] sm:rounded-t-[4rem] -mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col justify-center h-full space-y-8"
        >
          <h2 className="text-[14vw] md:text-[6.5vw] font-[1000] leading-[0.85] tracking-tighter uppercase font-sans text-black flex flex-col">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -60, filter: "blur(12px)" },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.4, ease: cinematicEase },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: cinematicEase },
              },
            }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-[2rem] bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#D946EF] shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.3),_4px_10px_20px_rgba(168,85,247,0.4)] animate-[float_4s_ease-in-out_infinite]" />
            <a
              href="tel:0967828730"
              className="font-mono text-[13px] sm:text-[15px] font-bold tracking-widest text-black border-b border-black/30 pb-1 hover:border-black transition-colors duration-500"
            >
              +251 96 782 8730
            </a>
          </motion.div>
        </motion.div>

        <div className="flex flex-col justify-center w-full max-w-md mx-auto md:ml-auto">
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.3 },
              },
            }}
            className="w-full flex flex-col gap-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { type: "text", placeholder: "Name", isTextArea: false },
              { type: "email", placeholder: "Email", isTextArea: false },
              { placeholder: "Message", isTextArea: true },
            ].map((field, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.2, ease: cinematicEase },
                  },
                }}
                className="relative group"
              >
                {field.isTextArea ? (
                  <textarea
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-[13px] font-mono tracking-widest text-black outline-none transition-colors duration-500 focus:border-black resize-none h-20 placeholder:text-black/40"
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-[13px] font-mono tracking-widest text-black outline-none transition-colors duration-500 focus:border-black placeholder:text-black/40"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: cinematicEase },
                },
              }}
            >
              <MagneticWrapper className="self-start md:self-end mt-2">
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-full border border-black/20 font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-black hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3 group shadow-sm w-full md:w-auto"
                >
                  SEND{" "}
                  <span className="transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </button>
              </MagneticWrapper>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => (
  <footer className="relative w-full bg-[#000000] text-white pt-24 pb-8 px-6 sm:px-12 md:px-20 z-50 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 border-b border-white/[0.06] pb-24">
      <div className="w-full md:w-1/2">
        <h2 className="text-[12vw] md:text-[5vw] font-[1000] leading-[0.9] tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
          DANIEL
          <br />
          NIGUSSIE
        </h2>
      </div>
      <div className="flex flex-col space-y-6 md:w-1/4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
          Social
        </span>
        <div className="flex flex-col space-y-3">
          <a
            href="#"
            className="font-sans text-[15px] font-bold tracking-wider text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-500 w-fit"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="font-sans text-[15px] font-bold tracking-wider text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-500 w-fit"
          >
            GitHub
          </a>
          <a
            href="#"
            className="font-sans text-[15px] font-bold tracking-wider text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-500 w-fit"
          >
            Upwork
          </a>
        </div>
      </div>
      <div className="flex flex-col space-y-6 md:w-1/4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
          Contact
        </span>
        <div className="flex flex-col space-y-3">
          <a
            href="tel:0967828730"
            className="font-sans text-[15px] font-bold tracking-wider text-neutral-300 hover:text-white transition-colors duration-500"
          >
            +251 96 782 8730
          </a>
          <p className="font-sans text-[14px] font-medium tracking-wide text-neutral-500">
            Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-2 sm:gap-4 pointer-events-none select-none overflow-hidden h-16 sm:h-24">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transform hover:rotate-12 transition-transform duration-700">
          <div className="absolute w-full h-4 sm:h-5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full rotate-45 shadow-lg" />
          <div className="absolute w-full h-4 sm:h-5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full -rotate-45 shadow-lg" />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-center items-center gap-1 shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-[6px] sm:border-[8px] border-white rounded-t-full rounded-b-md shadow-lg" />
        <div className="w-0 h-0 border-l-[24px] sm:border-l-[32px] border-l-transparent border-r-[24px] sm:border-r-[32px] border-r-transparent border-b-[40px] sm:border-b-[50px] border-b-pink-500 filter drop-shadow-xl" />
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.2)]" />
      </div>
      <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase mt-4 md:mt-0">
        © {new Date().getFullYear()} DANIEL NIGUSSIE
      </p>
    </div>
  </footer>
);

export default function PerfectAlexStyleHero() {
  return (
    <div className="bg-[#000000] w-full min-h-screen selection:bg-purple-500 selection:text-white text-white overflow-x-hidden">
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <FooterSection />

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .mask-horizontal-fade {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
