import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// A terminal session that types itself out once it scrolls into view.
const SESSION = [
  ["whoami", "Umut Çalıkuşu · Computer Engineer & Full-Stack Developer"],
  ["domains", "Payment systems (Ziraat Katılım) · Telecom (Türk Telekom)"],
  ["stack", "C# / .NET · T-SQL / PL-SQL · React · Vue.js"],
  ["mission", "Turning complex workflows into fast, reliable software"],
  ["cat contact.txt", "umut54709@gmail.com · Have an idea? Let’s build it."],
];

const PROMPT = "umut@developer:~$";
const TYPE_MS = 55;
const PAUSE_MS = 380;

export default function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  // step = index of the line being typed; chars = characters typed so far.
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(SESSION.length);
      return;
    }
    if (!inView || step >= SESSION.length) return;
    const cmd = SESSION[step][0];
    const id =
      chars < cmd.length
        ? setTimeout(() => setChars((c) => c + 1), TYPE_MS)
        : setTimeout(() => {
            setStep((s) => s + 1);
            setChars(0);
          }, PAUSE_MS);
    return () => clearTimeout(id);
  }, [inView, step, chars, reduce]);

  const done = step >= SESSION.length;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border hairline bg-[#070d1b]/90 shadow-glow"
    >
      <div className="flex items-center gap-3 border-b hairline px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="font-mono text-xs text-slate-400">umut@developer: ~</span>
      </div>

      {/* Screen readers get the whole session at once. */}
      <div className="sr-only">
        {SESSION.map(([cmd, out]) => `${cmd}: ${out}. `)}
      </div>

      <div
        aria-hidden="true"
        className="min-h-[300px] p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm"
      >
        {SESSION.map(([cmd, out], i) => {
          if (i > step) return null;
          const typing = i === step;
          return (
            <div key={cmd} className={i ? "mt-2" : ""}>
              <p className="break-words">
                <span className="text-violet-300">{PROMPT}</span>{" "}
                <span className="text-white">{typing ? cmd.slice(0, chars) : cmd}</span>
                {typing && <Caret />}
              </p>
              {!typing && <p className="break-words pl-4 text-blue-300">{out}</p>}
            </div>
          );
        })}
        {done && (
          <p className="mt-2">
            <span className="text-violet-300">{PROMPT}</span> <Caret />
          </p>
        )}
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-[blink_1s_steps(1)_infinite] bg-blue-300" />
  );
}
