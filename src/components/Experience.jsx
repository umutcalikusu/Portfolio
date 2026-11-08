import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { palette, rgba } from "../theme.js";

const experiences = [
  {
    period: "2025 — PRESENT",
    title: "Software Developer",
    company: "Techne Bilişim (Ziraat Katılım)",
    area: "Banking / Payment Systems",
    text: "Migrating Ziraat Bank’s payment systems module to Ziraat Katılım, a participation bank. I reshape the .NET services and database workflows for the new bank’s requirements, and rebuild the original React screens in plain JavaScript.",
    tech: [".NET", "React", "JavaScript", "SQL", "Payment Systems"],
  },
  {
    period: "2024 — PRESENT",
    title: "Software Developer",
    company: "Techne Bilişim (Türk Telekom)",
    area: "Telecommunications",
    text: "Maintaining and extending a query system fed by many SOAP services and an Oracle database. I track down and fix bugs across these integrations, tune slow Oracle queries, and build new features as requests come in.",
    tech: [".NET", "Vue.js", "SOAP", "Oracle", "PL/SQL", "Query Optimization"],
  },
  {
    period: "ACADEMIC FOUNDATION",
    title: "Computer Engineering",
    company: "University",
    area: "Software Architecture & AI",
    text: "Established a strong core in computer science, software engineering, and database systems. Executed early academic research and projects in Machine Learning and Computer Vision, laying the foundation for complex system design.",
    tech: ["Computer Vision", "Machine Learning", "Algorithms", "OOP"],
  },
];

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="experience" className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-16 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="text-5xl font-extrabold leading-none tracking-[-.055em] sm:text-6xl">
            Where I’ve
            <br />
            <span className="text-accent">learned by building.</span>
          </h2>
          <p className="max-w-md text-sm leading-7 text-fg-2">
            Real-world enterprise software development in payment systems and
            telecommunications via Techne Bilişim, backed by a solid engineering
            foundation.
          </p>
        </div>
        <div ref={listRef} className="relative border-t hairline pl-8 lg:pl-10">
          {/* Timeline track and the part of it that fills while scrolling. */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent shadow-accent-line"
          />
          {experiences.map((x, i) => (
            <motion.article
              key={x.company + i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative grid gap-5 border-b hairline py-8 lg:grid-cols-[220px_1fr_50px]"
            >
              <motion.span
                aria-hidden="true"
                initial={{ backgroundColor: palette.bg, boxShadow: `0 0 0 ${rgba(palette.accent, 0)}` }}
                whileInView={{ backgroundColor: palette.accent, boxShadow: `0 0 16px ${rgba(palette.accent, 0.8)}` }}
                viewport={{ once: true, margin: "0px 0px -45% 0px" }}
                transition={{ duration: 0.4 }}
                className="absolute -left-[30px] top-[36px] h-[13px] w-[13px] rounded-full border-2 border-accent lg:-left-[38px]"
              />
              <div className="font-mono text-xs tracking-[.14em] text-fg-2">
                {x.period}
              </div>
              <div>
                <h3 className="text-xl font-bold text-fg">{x.title}</h3>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 pr-8 font-mono text-xs text-fg-2 lg:pr-0">
                  <span className="font-medium text-accent">
                    {x.company}
                  </span>
                  <span>·</span>
                  <span className="uppercase tracking-wider text-fg-2 text-xs">
                    {x.area}
                  </span>
                </div>
                <p className="mt-4 max-w-[32rem] text-sm leading-7 text-fg-2">
                  {x.text}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {x.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border hairline bg-surface px-2.5 py-1 font-mono text-xs text-fg-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <span className="absolute right-0 top-8 font-mono text-xs text-fg-3 lg:static">
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
