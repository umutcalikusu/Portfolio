import { motion } from "framer-motion";
import {
  FiServer,
  FiDatabase,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiTerminal,
  FiHardDrive,
  FiBox,
  FiCheckCircle,
} from "react-icons/fi";
import {
  SiDotnet,
  SiReact,
  SiVuedotjs,
  SiPython,
  SiTypescript,
} from "react-icons/si";

const skillCategories = [
  {
    category: "BACKEND & ARCHITECTURE",
    items: [
      {
        name: "C# / .NET Core",
        desc: "Enterprise Services & Web APIs",
        usedAt: "Ziraat Katılım · Türk Telekom",
        icon: SiDotnet,
      },
      {
        name: "Microservices Architecture",
        desc: "Applied in Telecommunications & Finance Projects",
        usedAt: "Ziraat Katılım · Türk Telekom",
        icon: FiBox,
      },
      {
        name: "REST & SOAP APIs",
        desc: "Service Integration & Contracts",
        usedAt: "Ziraat Katılım · Türk Telekom",
        icon: FiServer,
      },
    ],
  },
  {
    category: "FRONTEND DEVELOPMENT",
    items: [
      { name: "React", desc: "Modern UI Component Systems", icon: SiReact, usedAt: "Ziraat Katılım · side projects" },
      {
        name: "Vue.js",
        desc: "Data-driven Web Applications",
        usedAt: "Türk Telekom",
        icon: SiVuedotjs,
      },
      {
        name: "TypeScript / JS",
        desc: "Type-safe Frontend Logic",
        usedAt: "Ziraat Katılım",
        icon: SiTypescript,
      },
    ],
  },
  {
    category: "DATABASE & DATA SYSTEMS",
    items: [
      {
        name: "T-SQL / PL/SQL",
        desc: "Procedures, Triggers & Optimization",
        usedAt: "Ziraat Katılım · Türk Telekom (PL/SQL)",
        icon: FiDatabase,
      },
      {
        name: "MSSQL & Oracle",
        desc: "Enterprise Storage Engines",
        usedAt: "Ziraat Katılım · Türk Telekom (Oracle)",
        icon: FiHardDrive,
      },
      {
        name: "Query Optimization",
        desc: "Indexing & Execution Plans",
        usedAt: "Türk Telekom",
        icon: FiTerminal,
      },
    ],
  },
  {
    category: "TOOLS & SPECIALIZATIONS",
    items: [
      {
        name: "Git & Workflows",
        desc: "Version Control & Enterprise Git",
        usedAt: "Ziraat Katılım · Türk Telekom",
        icon: FiGitBranch,
      },
      { name: "Python", desc: "Automation & Data Logic", icon: SiPython },
      { name: "Computer Vision", desc: "ML & Image Processing", icon: FiCpu, usedAt: "University research" },
    ],
  },
];

const highlights = [
  { label: "Focus Domains", value: "Finance & Telecommunications" },
  { label: "Core Architecture", value: "Microservices & Distributed" },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-16 lg:py-32">

        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-5xl font-extrabold leading-none tracking-[-.055em] sm:text-6xl">
              The stack behind
              <br />
              <span className="text-accent">the work.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-fg-2">
              Enterprise frameworks, database engines, and modern microservices
              architecture I utilize to build scalable systems.
            </p>
          </div>

          {/* Highlights / Stats Badge Box */}
          <div className="flex flex-wrap gap-4 rounded-2xl border hairline bg-surface/60 p-4 font-mono text-xs">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="sm:border-r sm:hairline sm:pr-4 sm:last:border-r-0 sm:last:pr-0"
              >
                <div className="text-xs uppercase tracking-wider text-fg-2">
                  {item.label}
                </div>
                <div className="mt-1 font-medium text-accent">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.category}
              className="min-w-0"
            >
              <div className="mb-6 flex items-center justify-between border-b hairline pb-4">
                <span className="font-mono text-xs font-medium tracking-wider text-accent">
                  {cat.category}
                </span>
                <span className="font-mono text-xs text-fg-2">
                  0{idx + 1}
                </span>
              </div>
              {/* Phones: one swipeable row per category. Larger screens: three columns. */}
              <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                {cat.items.map(({ name, desc, usedAt, icon: Icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ y: -3 }}
                    className="group flex min-w-[72%] snap-start flex-col justify-between rounded-2xl border hairline bg-surface p-4 transition hover:border-accent/40 hover:bg-raised sm:min-w-0"
                  >
                    <Icon className="h-6 w-6 text-fg-2 transition group-hover:text-accent" />
                    <div className="mt-4">
                      <div className="text-xs font-bold text-fg">
                        {name}
                      </div>
                      <div className="mt-1 break-words font-mono text-xs leading-tight text-fg-2 [hyphens:auto]">
                        {desc}
                      </div>
                      {usedAt && (
                        <div className="mt-2 font-mono text-xs leading-tight text-honey transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                          ↳ {usedAt}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
