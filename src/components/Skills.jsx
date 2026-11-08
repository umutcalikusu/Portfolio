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
        name: "RESTful APIs",
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
        name: "T-SQL / PL-SQL",
        desc: "Procedures, Triggers & Optimization",
        usedAt: "Ziraat Katılım · Türk Telekom",
        icon: FiDatabase,
      },
      {
        name: "MSSQL & Oracle",
        desc: "Enterprise Storage Engines",
        usedAt: "Ziraat Katılım · Türk Telekom",
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
        <div className="mb-12 font-mono text-xs tracking-[.18em] text-blue">
          03 / TOOLKIT
        </div>

        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-5xl font-extrabold leading-none tracking-[-.055em] sm:text-6xl">
              The stack behind
              <br />
              <span className="text-blue">the work.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Enterprise frameworks, database engines, and modern microservices
              architecture I utilize to build scalable systems.
            </p>
          </div>

          {/* Highlights / Stats Badge Box */}
          <div className="flex flex-wrap gap-4 rounded-2xl border hairline bg-[#070d1b]/60 p-4 font-mono text-xs">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="border-r hairline pr-4 last:border-r-0 last:pr-0"
              >
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  {item.label}
                </div>
                <div className="mt-1 font-bold text-blue-400">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.category}
              className="min-w-0 overflow-hidden rounded-3xl border hairline bg-[#070d1b]/40 p-6"
            >
              <div className="mb-6 flex items-center justify-between border-b hairline pb-4">
                <span className="font-mono text-xs font-semibold tracking-wider text-blue-400">
                  {cat.category}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  0{idx + 1}
                </span>
              </div>
              {/* Phones: one swipeable row per category. Larger screens: three columns. */}
              <div className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                {cat.items.map(({ name, desc, usedAt, icon: Icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ y: -3 }}
                    className="group flex min-w-[72%] snap-start flex-col justify-between rounded-2xl border hairline bg-[#080e1d] p-4 transition hover:border-blue/40 hover:bg-blue/[.04] sm:min-w-0"
                  >
                    <Icon className="h-6 w-6 text-slate-400 transition group-hover:text-blue-400" />
                    <div className="mt-4">
                      <div className="text-xs font-bold text-slate-200">
                        {name}
                      </div>
                      <div className="mt-1 font-mono text-xs text-slate-400 leading-tight">
                        {desc}
                      </div>
                      {usedAt && (
                        <div className="mt-2 font-mono text-xs leading-tight text-blue-300 transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
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
