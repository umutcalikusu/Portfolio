import { motion } from "framer-motion";
import { TiltCard } from "./fx.jsx";
import Terminal from "./Terminal.jsx";
import Wren from "./Wren.jsx";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Home() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative mx-auto min-h-screen max-w-[1500px] px-5 pb-16 pt-[105px] lg:px-16 lg:pt-[115px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-hero-glow" />

      {/* Two columns: the introduction, and the live terminal beside it. The
          text is visible from the first paint (it is the LCP element) and only
          slides into place. */}
      <div className="grid min-h-[calc(100vh-180px)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="relative z-10 max-w-[700px]">
          <motion.h1
            initial={{ y: 25 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[clamp(52px,6.5vw,96px)] font-extrabold leading-[.95] tracking-[-.05em]"
          >
            Hi, I’m
            <br />
            Umut <span className="text-accent">Çalıkuşu</span>
          </motion.h1>

          <motion.h2
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mt-7 text-xl font-bold tracking-[-.03em] text-fg [text-wrap:balance] sm:text-2xl"
          >
            Computer Engineer &amp; Full-Stack Developer
          </motion.h2>

          <motion.p
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-5 max-w-[62ch] text-base leading-8 text-fg-2 sm:text-lg"
          >
            I build web applications end to end, from databases that need to be
            fast to interfaces people enjoy using. Got an idea? I can take it
            from the first table to the last screen.
          </motion.p>

          {/* Status line: sits closer to the paragraph than to the buttons. */}
          <motion.p
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 flex items-center gap-2.5 text-sm text-fg-2"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inset-0 rounded-full bg-accent motion-safe:animate-[status-pulse_2.8s_ease-out_infinite]" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>
              Currently Software Developer at{" "}
              <span className="font-semibold text-fg">Techne Bilişim</span>
            </span>
          </motion.p>

          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => go("work")}
              className="group rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-bg shadow-cta transition hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              View My Work{" "}
              {/* The arrow keeps its box so the button never changes width; on
                  hover or keyboard focus the çalıkuşu takes its place and hops. */}
              <span aria-hidden="true" className="relative ml-5 inline-block">
                <span className="inline-block transition duration-200 group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0">
                  →
                </span>
                <Wren className="absolute inset-0 m-auto h-[1.15em] w-[1.15em] origin-bottom opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:animate-[wren-hop_380ms_cubic-bezier(.3,.7,.4,1)] motion-safe:group-focus-visible:animate-[wren-hop_380ms_cubic-bezier(.3,.7,.4,1)]" />
              </span>
            </button>

            <a
              href="mailto:umut54709@gmail.com"
              className="rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-fg transition hover:border-accent/50 hover:bg-accent/10"
            >
              Let’s talk
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full min-w-0 lg:max-w-[600px] lg:justify-self-end"
        >
          <TiltCard max={4}>
            <Terminal />
          </TiltCard>
        </motion.div>
      </div>

      <aside className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center rounded-full border border-line bg-surface/75 px-3 py-4 text-lg text-fg-2 backdrop-blur-xl min-[1720px]:flex">
        <a
          href="https://github.com/umutcalikusu"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-2 transition hover:text-accent"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-2 transition hover:text-accent"
        >
          <FaLinkedin />
        </a>

        <a href="mailto:umut54709@gmail.com" aria-label="Email" className="p-2 transition hover:text-accent">
          <HiOutlineMail />
        </a>

        <span className="my-3 h-24 w-px bg-line" />

        <span aria-hidden="true" className="font-mono text-[11px] text-fg-3 [writing-mode:vertical-rl]">
          SCROLL TO EXPLORE
        </span>
      </aside>
    </section>
  );
}
