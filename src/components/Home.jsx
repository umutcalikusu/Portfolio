import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSceneGate } from "../three/gate.js";
import { TiltCard } from "./fx.jsx";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Umut from "../assets/umut.jpg";

const HeroNetwork = lazy(() => import("../three/HeroNetwork.jsx"));

// One palette, light to deep: sky → blue → indigo → violet, so the row reads
// as a family instead of six unrelated colours.
const techBadges = [
  { name: ".NET", color: "from-violet-500/20 to-violet-500/5 border-violet-400/35 text-violet-200" },
  { name: "SQL", color: "from-sky-500/20 to-sky-500/5 border-sky-400/35 text-sky-200" },
  { name: "JavaScript", color: "from-blue-500/20 to-blue-500/5 border-blue-400/35 text-blue-200" },
  { name: "React & Vue.js", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-400/35 text-indigo-200" },
  { name: "Git & Workflows", color: "from-blue-500/20 to-blue-500/5 border-blue-400/35 text-blue-200" },
  { name: "Full-Stack", color: "from-sky-500/20 to-sky-500/5 border-sky-400/35 text-sky-200" },
];

export default function Home() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scene = useSceneGate({ margin: "0px" });
  const fadeRef = useRef(null);

  // The network dissolves as the visitor scrolls past the hero.
  useEffect(() => {
    const onScroll = () => {
      const k = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
      if (fadeRef.current) {
        fadeRef.current.style.opacity = String(1 - k);
        fadeRef.current.style.transform = `scale(${1 + k * 0.15})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative mx-auto min-h-screen max-w-[1500px] px-5 pb-16 pt-[105px] lg:px-16 lg:pt-[115px]"
    >
      <div ref={scene.ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen opacity-55 lg:opacity-100">
        <div ref={fadeRef} className="h-full w-full">
          {scene.enabled && (
            <Suspense fallback={null}>
              <HeroNetwork active={scene.active} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_20%,rgba(50,140,255,.13),transparent_30%),radial-gradient(circle_at_40%_50%,rgba(115,87,255,.07),transparent_35%)]" />

      <div className="grid min-h-[650px] items-center gap-10 lg:grid-cols-[1fr_1.1fr] xl:gap-8">
        <div className="relative z-10 max-w-[680px]">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-[clamp(52px,6.5vw,96px)] font-extrabold leading-[.95] tracking-[-.05em]"
          >
            Hi, I’m
            <br />
            Umut <span className="text-gradient">Çalıkuşu</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 text-xl font-bold tracking-[-.03em] text-slate-200 sm:text-2xl"
          >
            Computer Engineer &amp; Full-Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-4 max-w-[620px] text-sm leading-7 text-slate-400 sm:text-base"
          >
            I build the backend behind payment systems and telecom data for
            Ziraat Katılım and Türk Telekom: .NET services, SQL that has to be
            fast, and the React and Vue screens on top. Got an idea? I can take
            it from the database to the interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => go("work")}
              className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-bold shadow-[0_15px_45px_rgba(53,100,255,.24)] transition hover:-translate-y-0.5"
            >
              View My Work <span className="ml-5">→</span>
            </button>

            <a
              href="mailto:umut54709@gmail.com"
              className="rounded-full border border-white/10 bg-white/[.02] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              Let’s talk
            </a>
          </motion.div>

          <div className="mt-9 grid max-w-[540px] grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              ["5+", "Projects"],
              ["2+", "Years Exp."],
              ["10+", "Tech Stack"],
              ["24/7", "Learning"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/5 bg-white/[.018] px-4 py-3.5 backdrop-blur-sm"
              >
                <strong className="block text-lg text-white">{value}</strong>
                <span className="font-mono text-xs uppercase tracking-wide text-slate-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-12"
        >
          <TiltCard max={5} className="sm:col-span-12 [transform-style:preserve-3d]">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3 backdrop-blur-xl shadow-2xl [transform-style:preserve-3d]">
            <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-2xl">
              <img
                src={Umut}
                alt="Umut Çalıkuşu"
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-transparent to-black/20" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#050812]/80 p-3 backdrop-blur-md [transform:translateZ(40px)]">
                <div>
                  <p className="text-xs font-bold text-white">Umut Çalıkuşu</p>

                  <p className="font-mono text-xs text-slate-400">
                    Computer Engineer
                  </p>
                </div>

                <span className="rounded-lg bg-blue-500/20 px-2.5 py-1 font-mono text-xs text-blue-300 border border-blue-500/30">
                  Full-Stack Developer
                </span>
              </div>
            </div>
          </div>
          </TiltCard>

          <div className="sm:col-span-12 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {techBadges.map((tech, i) => (
              <motion.div
                key={tech.name}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                whileHover={{ scale: 1.06 }}
                className={`flex flex-col items-center justify-center rounded-xl border bg-gradient-to-b p-2.5 text-center backdrop-blur-md ${tech.color}`}
              >
                <span className="font-mono text-xs font-bold">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <aside className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center rounded-full border border-white/10 bg-[#071022]/75 px-3 py-4 text-lg text-slate-300 backdrop-blur-xl min-[1720px]:flex">
        <a
          href="https://github.com/umutcalikusu"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-2 hover:text-white"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-2 hover:text-white"
        >
          <FaLinkedin />
        </a>

        <a href="mailto:umut54709@gmail.com" aria-label="Email" className="p-2 hover:text-white">
          <HiOutlineMail />
        </a>

        <span className="my-3 h-24 w-px bg-slate-700/70" />

        <span aria-hidden="true" className="font-mono text-[11px] text-slate-400 [writing-mode:vertical-rl]">
          SCROLL TO EXPLORE
        </span>
      </aside>
    </section>
  );
}
