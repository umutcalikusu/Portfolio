import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// A terminal session that types itself out as soon as it is on screen.
// Lines not typed yet already hold their space (invisible), so the box never
// changes height while typing and nothing around it shifts.
const SESSION = [
  ["whoami", "Umut Çalıkuşu · Computer Engineer & Full-Stack Developer"],
  ["domains", "Payment systems · Telecommunications"],
  ["stack", "C# / .NET · T-SQL / PL/SQL · React · Vue.js"],
  ["mission", "Turning complex workflows into fast, reliable software"],
  ["cat contact.txt", "umut54709@gmail.com · Have an idea? Let’s build it."],
];

const PROMPT = "umut@developer:~$";
const START_MS = 350; // let the hero text land first
const TYPE_MS = 28;
const PAUSE_MS = 200;

export default function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  // step = index of the line being typed; chars = characters typed so far.
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    const id = setTimeout(() => setStarted(true), START_MS);
    return () => clearTimeout(id);
  }, [inView, started]);

  useEffect(() => {
    if (reduce) {
      setStep(SESSION.length);
      return;
    }
    if (!started || step >= SESSION.length) return;
    const cmd = SESSION[step][0];
    const id =
      chars < cmd.length
        ? setTimeout(() => setChars((c) => c + 1), TYPE_MS)
        : setTimeout(() => {
            setStep((s) => s + 1);
            setChars(0);
          }, PAUSE_MS);
    return () => clearTimeout(id);
  }, [started, step, chars, reduce]);

  const done = step >= SESSION.length;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border hairline bg-surface shadow-glow"
    >
      <div className="flex items-center gap-3 border-b hairline px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-honey/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-fg-3" />
        </span>
        <span className="font-mono text-xs text-fg-3">umut@developer: ~</span>
      </div>

      {/* Screen readers get the whole session at once. */}
      <div className="sr-only">
        {SESSION.map(([cmd, out]) => `${cmd}: ${out}. `)}
      </div>

      <div
        aria-hidden="true"
        className="p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm"
      >
        {SESSION.map(([cmd, out], i) => {
          const typing = i === step;
          const pending = i > step;
          return (
            <div key={cmd} className={`${i ? "mt-2" : ""} ${pending ? "invisible" : ""}`}>
              <p className="break-words">
                <span className="text-honey">{PROMPT}</span>{" "}
                <span className="text-fg">{typing ? cmd.slice(0, chars) : cmd}</span>
                {typing && <Caret />}
              </p>
              <p className={`break-words pl-4 text-fg ${typing ? "invisible" : ""}`}>{out}</p>
            </div>
          );
        })}
        <p className={`mt-2 ${done ? "" : "invisible"}`}>
          <span className="text-honey">{PROMPT}</span> <Caret />
        </p>
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] motion-safe:animate-[blink_1s_steps(1)_6] bg-honey" />
  );
}
