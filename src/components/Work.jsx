import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { data } from "../data/data.js";
import { TiltCard } from "./fx.jsx";
import { useSceneGate, isTouch } from "../three/gate.js";

const ProjectGallery = lazy(() => import("../three/ProjectGallery.jsx"));

function CodeLink({ item }) {
  return item.github ? (
    <a
      href={item.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} on GitHub`}
      className="flex min-h-[44px] items-center gap-2 rounded-full border border-line px-5 font-mono text-xs text-fg transition hover:border-accent/50 hover:bg-accent/10"
    >
      <FiGithub aria-hidden className="h-4 w-4" />
      Code
    </a>
  ) : (
    <span className="flex min-h-[44px] items-center gap-2 px-2 font-mono text-xs text-fg-2">
      <FiLock aria-hidden className="h-4 w-4" />
      Private
    </span>
  );
}

// Desktop: screenshots on a 3D arc with an info panel for the active project.
// `slot` keeps counting past the ends (6, 7, … or -1, -2, …) so the 3D ring
// keeps turning; the project shown is that slot wrapped into the list.
function Gallery({ slot, setSlot, running, load }) {
  const n = data.length;
  const active = ((slot % n) + n) % n;
  const item = data[active];
  const go = (d) => setSlot((s) => s + d);
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  return (
    <div onKeyDown={onKeyDown}>
      <div
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects. Use the left and right arrow keys to browse."
        className="relative h-[480px] overflow-hidden rounded-3xl border hairline bg-surface/50"
      >
        <Suspense fallback={<div className="grid h-full place-items-center font-mono text-xs text-fg-3">Loading projects…</div>}>
          {load && <ProjectGallery images={data.map((d) => d.image)} active={slot} onSelect={setSlot} active3d={running} />}
        </Suspense>
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-fg-3">
          Drag, click a screen, or use the arrow keys
        </span>
      </div>

      <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div aria-live="polite">
          <span className="font-mono text-xs uppercase tracking-[.14em] text-fg-3">
            Project / {String(active + 1).padStart(2, "0")} — {String(data.length).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-3xl font-bold tracking-[-.03em] text-fg">{item.name}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-fg-2">{item.desc}</p>
          {item.tech && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span key={t} className="rounded-full border hairline bg-surface px-2.5 py-1 font-mono text-xs text-fg-2">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <CodeLink item={item} />
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition hover:border-accent/50 hover:bg-accent/10"
          >
            <FiChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition hover:border-accent/50 hover:bg-accent/10"
          >
            <FiChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const gate = useSceneGate({ minWidth: 1024, margin: "600px" });
  const [slot, setSlot] = useState(0);
  const use3d = gate.enabled && !isTouch();

  return (
    <section id="work" className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-16 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-5xl font-extrabold leading-none tracking-[-.055em] sm:text-6xl">
              A few things
              <br />
              <span className="text-accent">I’ve built.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-fg-2">
              A curated selection of full-stack applications and practical
              software solutions.
            </p>
          </div>
        </div>

        <div ref={gate.ref}>
        {use3d ? (
          <Gallery slot={slot} setSlot={setSlot} running={gate.active} load={gate.seen} />
        ) : (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {data.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group min-w-0 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              {/* Image: tilts toward the pointer and slowly scrolls the screenshot on hover. */}
              <TiltCard>
                <div
                  className={`relative overflow-hidden rounded-3xl border hairline bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-accent/40 group-hover:shadow-glow ${
                    i === 0 ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top opacity-85 transition-[object-position,opacity] duration-[2600ms] ease-in-out group-hover:object-bottom group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                  <span className="absolute right-5 top-5 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-xs text-fg backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && (
                    <span className="absolute left-5 top-5 rounded-full border border-honey/40 bg-bg/70 px-3 py-1 font-mono text-xs text-honey backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>
              </TiltCard>

              {/* Details & Info */}
              <div className="mt-5 border-t hairline pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[.14em] text-fg-3">
                      PROJECT / {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-fg transition group-hover:text-accent">
                      {item.name}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex shrink-0 items-center font-mono text-xs text-fg-2">
                    {item.github ? (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.name} on GitHub`}
                        className="-mr-2 flex min-h-[44px] items-center gap-2 rounded-full px-2 transition hover:text-accent"
                      >
                        <FiGithub aria-hidden className="h-4 w-4" />
                        Code
                      </a>
                    ) : (
                      <span className="flex min-h-[44px] items-center gap-2 text-fg-2">
                        <FiLock aria-hidden className="h-4 w-4" />
                        Private
                      </span>
                    )}
                  </div>
                </div>

                {item.desc && (
                  <p className="mt-3 text-sm leading-6 text-fg-2">
                    {item.desc}
                  </p>
                )}

                {item.tech && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border hairline bg-surface px-2.5 py-1 font-mono text-xs text-fg-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
        )}
        </div>
      </div>
    </section>
  );
}
