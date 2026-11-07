import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Magnetic } from "./fx.jsx";
import { useSceneGate } from "../three/gate.js";

const ParticleText = lazy(() => import("../three/ParticleText.jsx"));
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  const email = "umut54709@gmail.com";
  const [copied, setCopied] = useState(null);
  const scene = useSceneGate({ margin: "0px" });
  const [textEl, setTextEl] = useState(null);
  const [particlesReady, setParticlesReady] = useState(false);

  // Fallback for visitors whose mailto link opens nothing (no mail app set up).
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section
      id="contact"
      ref={scene.ref}
      className="border-t hairline relative overflow-hidden"
    >
      <div className="mx-auto flex min-h-[85vh] max-w-[1500px] flex-col justify-between px-5 py-24 lg:px-16">
        {/* Main Content */}
        <div className="my-auto text-center">
          <div className="mb-4 font-mono text-xs tracking-[.18em] text-blue">
            05 / CONTACT
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold leading-[1.05] tracking-[-.06em] sm:text-7xl lg:text-8xl"
          >
            Have an idea?
            <br />
            {/* The real text stays for screen readers and as the fallback;
                when 3D is available, particles draw it in the same spot. */}
            <span className="relative inline-block">
              <span
                ref={setTextEl}
                className={`text-blue transition-opacity duration-700 ${particlesReady ? "opacity-0" : ""}`}
              >
                Let’s build it.
              </span>
              {scene.enabled && textEl && (
                <Suspense fallback={null}>
                  <ParticleText el={textEl} active={scene.active} onReady={() => setParticlesReady(true)} />
                </Suspense>
              )}
            </span>
          </motion.h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400">
            Have a product idea, a freelance project or a technical problem to
            solve? Let’s talk.
          </p>

          {/* Direct Mailto Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <Magnetic>
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 rounded-2xl border hairline bg-[#070d1b] px-6 py-4 text-base font-bold text-white transition hover:border-blue/50 hover:bg-blue/[.06] hover:shadow-glow sm:px-8 sm:text-lg"
              >
                <HiOutlineMail className="text-blue-400 size-6 transition group-hover:scale-110" />
                <span className="break-all">{email}</span>
              </a>
            </Magnetic>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={copy}
                className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 font-mono text-xs text-slate-300 transition hover:text-white"
              >
                {copied === "ok" ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
                Copy address
              </button>
              <span role="status" aria-live="polite" className="font-mono text-xs text-blue-300">
                {copied === "ok" ? "Copied" : copied === "fail" ? "Couldn’t copy, select it instead" : ""}
              </span>
            </div>
          </motion.div>

          {/* Social Links Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex justify-center gap-4 font-mono text-xs"
          >
            <a
              href="https://github.com/umutcalikusu"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border hairline bg-[#070d1b]/60 px-4 py-2.5 text-slate-400 transition hover:border-slate-500 hover:text-white"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border hairline bg-[#070d1b]/60 px-4 py-2.5 text-slate-400 transition hover:border-slate-500 hover:text-white"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t hairline pt-8 text-center font-mono text-xs text-slate-400">
          © {new Date().getFullYear()} Umut Çalıkuşu · Built with React +
          Tailwind CSS
        </footer>
      </div>
    </section>
  );
}
