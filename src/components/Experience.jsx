import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const experiences = [
  {
    period: "2025 — PRESENT",
    title: "Software Developer",
    company: "Techne Bilişim (Ziraat Katılım)",
    area: "Finance / Payment Systems",
    text: "Building enterprise payment infrastructure and business-critical backend services using .NET, React, JavaScript, and complex database workflows. Focused on transaction processing, secure payment integrations, and high-reliability software solutions.",
    tech: [".NET", "React", "JavaScript", "SQL", "Payment Gateways"],
  },
  {
    period: "2024 — PRESENT",
    title: "Software Developer",
    company: "Techne Bilişim (Türk Telekom)",
    area: "Telecommunications",
    text: "Developing data-heavy query systems and high-throughput telecommunications applications using .NET and Vue.js. Building end-to-end data validation flows, optimizing query performance, and maintaining high-availability backend services.",
    tech: [".NET", "Vue.js", "T-SQL / PL-SQL", "Query Optimization", "APIs"],
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
        <div className="mb-12 font-mono text-xs tracking-[.18em] text-blue">
          02 / EXPERIENCE
        </div>
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="text-5xl font-extrabold leading-none tracking-[-.055em] sm:text-6xl">
            Where I’ve
            <br />
            <span className="text-blue">learned by building.</span>
          </h2>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Real-world enterprise software development in payment systems and
            telecommunications via Techne Bilişim, backed by a solid engineering
            foundation.
          </p>
        </div>
        <div ref={listRef} className="relative border-t hairline pl-8 lg:pl-10">
          {/* Timeline track and the part of it that fills while scrolling. */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-blue via-blue to-violet shadow-[0_0_12px_rgba(50,140,255,.8)]"
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
                initial={{ backgroundColor: "#050814", boxShadow: "0 0 0 rgba(50,140,255,0)" }}
                whileInView={{ backgroundColor: "#328cff", boxShadow: "0 0 16px rgba(50,140,255,.9)" }}
                viewport={{ once: true, margin: "0px 0px -45% 0px" }}
                transition={{ duration: 0.4 }}
                className="absolute -left-[30px] top-[36px] h-[13px] w-[13px] rounded-full border-2 border-blue lg:-left-[38px]"
              />
              <div className="font-mono text-xs tracking-[.14em] text-blue">
                {x.period}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{x.title}</h3>
                <div className="mt-1 flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-blue-400 font-semibold">
                    {x.company}
                  </span>
                  <span>·</span>
                  <span className="uppercase tracking-wider text-slate-400 text-xs">
                    {x.area}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                  {x.text}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {x.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded border hairline bg-[#080e1d] px-2.5 py-1 font-mono text-xs text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs text-slate-400">
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
