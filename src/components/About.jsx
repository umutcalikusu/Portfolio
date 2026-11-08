import { motion } from "framer-motion";
import { FiCreditCard, FiRadio, FiCode, FiDatabase } from "react-icons/fi";
import Terminal from "./Terminal.jsx";
import { TiltCard } from "./fx.jsx";

const areas = [
  [
    FiCreditCard,
    "Payment Systems",
    "End-to-end payment flows, secure API integrations, transaction processing, and mission-critical backend services.",
  ],
  [
    FiRadio,
    "Telecommunications",
    "High-throughput data flows, domain validation logic, and data-intensive telecommunications applications.",
  ],
  [
    FiCode,
    "Full-Stack Development",
    "Modern web applications built with React, Vue, and .NET using clean architectures and responsive interfaces.",
  ],
  [
    FiDatabase,
    "Data & Systems",
    "Advanced SQL optimization (Oracle/MSSQL), procedure tuning, and resilient database architectures.",
  ],
];

const badges = [
  "Clean Architecture",
  "Query Optimization",
  "API Design",
  "Distributed Systems",
];

export default function About() {
  return (
    <section id="about" className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-16 lg:py-32">
        <div className="mb-12 font-mono text-xs tracking-[.18em] text-blue">
          01 / ABOUT ME
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold leading-none tracking-[-.05em] sm:text-5xl xl:text-6xl">
              More Than Just <span className="text-blue">Code</span>
            </h2>
            <TiltCard max={4} className="mt-8">
              <Terminal />
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[15px] leading-7 text-slate-400 lg:pt-24"
          >
            <p>
              I’m a Computer Engineer specialized in building robust full-stack
              applications, scalable backend systems, and high-performance
              database architectures.
            </p>
            <p className="mt-5">
              My background spans{" "}
              <strong className="text-slate-200">payment systems</strong> and{" "}
              <strong className="text-slate-200">telecommunications</strong>,
              where I handle end-to-end integration flows, complex queries, and
              business-critical microservices. I thrive on solving complex
              technical challenges with clean, maintainable code.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {badges.map((x) => (
                <span
                  key={x}
                  className="rounded-full border hairline px-3 py-1.5 font-mono text-xs text-slate-400"
                >
                  {x}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-3xl border hairline md:grid-cols-2 xl:grid-cols-4">
          {areas.map(([Icon, title, text], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b hairline p-6 last:border-b-0 md:border-r xl:border-b-0 xl:last:border-r-0"
            >
              <Icon className="mb-8 text-2xl text-blue" />
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
