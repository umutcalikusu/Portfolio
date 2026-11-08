import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Logo from "../assets/logo.png";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Projects", "work"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const [, id] of links) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Pages without the sections (the 404 page) have no current section.
    if (!document.getElementById("home")) setActiveSection(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    if (!open) {
      // Closing returns focus to the menu button that opened the menu.
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    // Keyboard focus stays inside the open menu: the toggle plus the menu's items.
    const focusables = () => [
      toggleRef.current,
      ...(menuRef.current?.querySelectorAll("a[href], button") ?? []),
    ].filter(Boolean);
    const first = setTimeout(() => focusables()[1]?.focus(), 50);
    const onKey = (e) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const i = items.indexOf(document.activeElement);
      const next = e.shiftKey
        ? items[(i - 1 + items.length) % items.length]
        : items[(i + 1) % items.length];
      e.preventDefault();
      next?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(first);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => {
    const el = document.getElementById(id);
    // On pages without the sections (the 404 page), go to them on the home page.
    if (!el) {
      window.location.href = id === "home" ? "/" : `/#${id}`;
      return;
    }
    el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[76px] border-b hairline bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-5 lg:px-10 xl:px-16">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-3 text-left transition hover:opacity-80"
          >
            <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-surface p-1.5 shadow-glow backdrop-blur-md">
              <img
                src={Logo}
                alt=""
                className="h-full w-full object-contain brightness-0 invert drop-shadow-accent"
              />
            </div>
            <span className="text-sm font-extrabold text-fg">
              Umut Çalıkuşu
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border hairline bg-surface/80 p-1 lg:flex">
            {links.map(([label, id]) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    isActive
                      ? // accent-hover: plain accent is 4.39:1 on raised, under AA for 12px text
                        "bg-raised text-accent-hover"
                      : "text-fg-2 hover:bg-raised hover:text-fg"
                  }`}
                >
                  {isActive && <span className="mr-2 text-accent-hover">•</span>}
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Social Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Umut-CV.pdf"
              download
              className="hidden rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-fg transition hover:bg-accent/10 sm:block"
            >
              ↓&nbsp; Download CV
            </a>

            <div className="hidden items-center gap-3 pl-2 text-fg-2 sm:flex">
              <a
                href="https://github.com/umutcalikusu"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="-m-1.5 p-1.5 transition hover:text-accent"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="-m-1.5 p-1.5 transition hover:text-accent"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:umut54709@gmail.com"
                aria-label="Email"
                className="-m-1.5 p-1.5 transition hover:text-accent"
              >
                <HiOutlineMail size={18} />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={toggleRef}
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-full border hairline text-fg-2 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 top-[76px] z-30 bg-bg/70 lg:hidden"
          />
        )}
        {open && (
          <motion.div
            key="drawer"
            id="mobile-menu"
            ref={menuRef}
            initial={{ y: -12, clipPath: "inset(0 0 100% 0)" }}
            animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ y: -12, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[76px] z-40 border-b hairline bg-bg px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map(([label, id]) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className={`rounded-xl px-3 py-3 text-left text-base font-semibold transition ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-fg-2 hover:bg-raised hover:text-fg"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              <div className="mt-4 border-t hairline pt-4 flex flex-col gap-3">
                <a
                  href="/Umut-CV.pdf"
                  download
                  className="rounded-full border border-accent/40 px-4 py-3 text-center text-sm font-semibold text-fg"
                >
                  ↓ Download CV
                </a>

                {/* Mobile Social Links */}
                <div className="flex items-center justify-center gap-4 pt-2 text-fg-2">
                  <a
                    href="https://github.com/umutcalikusu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="p-2"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a href="mailto:umut54709@gmail.com" aria-label="Email" className="p-2">
                    <HiOutlineMail size={22} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
