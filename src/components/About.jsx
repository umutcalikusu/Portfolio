import { motion } from "framer-motion";
import { FiCreditCard, FiRadio, FiCode, FiDatabase } from "react-icons/fi";

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
        {/* Heading across the top; below it the text (comfortable measure) on
            the left and the four focus areas as a 2x2 grid on the right. */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold leading-none tracking-[-.05em] sm:text-5xl xl:text-6xl"
        >
          More than just <span className="text-accent">code</span>
        </motion.h2>

        <div className="mt-8 grid items-start gap-12 xl:grid-cols-[minmax(0,33rem)_minmax(0,1fr)] xl:gap-20 2xl:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-[33rem] text-base leading-8 text-fg-2 sm:text-[17px]">
              <p>
                I’m a Computer Engineer specialized in building robust full-stack
                applications, scalable backend systems, and high-performance
                database architectures.
              </p>
              <p className="mt-5">
                My background spans{" "}
                <strong className="text-fg">payment systems</strong> and{" "}
                <strong className="text-fg">telecommunications</strong>,
                where I handle end-to-end integration flows, complex queries, and
                business-critical microservices. I thrive on solving complex
                technical challenges with clean, maintainable code.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {badges.map((x) => (
                <span
                  key={x}
                  className="rounded-full border hairline px-3 py-1.5 font-mono text-xs text-fg-2"
                >
                  {x}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 1px gaps over the line colour draw the dividers between cards. */}
          <div className="grid gap-px overflow-hidden rounded-3xl border hairline bg-line sm:grid-cols-2">
            {areas.map(([Icon, title, text], i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-bg p-6 lg:p-7"
              >
                <Icon className="mb-8 text-2xl text-accent" />
                <h3 className="text-base font-bold text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-fg-2">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
