import { useEffect, useRef, useState } from "react";

const ACCENT = "text-accent";
const SUBHEAD_SALESFORCE_WORD = "Salesforce";

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function SubheadSalesforceTyping({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [count, setCount] = useState(0);
  const [armed, setArmed] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(SUBHEAD_SALESFORCE_WORD.length);
        window.setTimeout(() => onCompleteRef.current?.(), 0);
        return;
      }
      const narrow = window.matchMedia("(max-width: 639px)").matches;
      const startDelay = narrow ? 1000 : 1450;
      const charMs = 105;
      await delay(startDelay);
      if (cancelled) return;
      setArmed(true);
      for (let i = 1; i <= SUBHEAD_SALESFORCE_WORD.length; i++) {
        await delay(charMs);
        if (cancelled) return;
        setCount(i);
      }
      if (!cancelled) onCompleteRef.current?.();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const typed = SUBHEAD_SALESFORCE_WORD.slice(0, count);
  const showCursor = armed && count < SUBHEAD_SALESFORCE_WORD.length;

  return (
    <span className="inline-flex items-baseline gap-0.5 text-[1.08em] font-semibold tracking-tight sm:text-[1.1em]">
      <span
        className={`${ACCENT} inline-block [text-shadow:0_0_16px_rgba(46,144,255,0.35)]`}
      >
        {typed}
      </span>
      {showCursor ? (
        <span className="typing-cursor-sm" aria-hidden>
          |
        </span>
      ) : null}
    </span>
  );
}

type HeroSectionProps = {
  onServicesClick: () => void;
};

export function HeroSection({ onServicesClick }: HeroSectionProps) {
  const [heroHeadlineReady, setHeroHeadlineReady] = useState(false);

  return (
    <section className="relative flex min-h-[calc(100dvh-6.5rem)] flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8 sm:pb-24 sm:pt-36">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-5 sm:gap-7">
        <div className="flex min-h-[15rem] w-full flex-col items-center justify-center overflow-visible pb-1 sm:min-h-[17.5rem] lg:min-h-[20rem]">
          {heroHeadlineReady ? (
            <h1 className="flex w-full flex-col items-center gap-2 overflow-visible text-balance text-3xl font-semibold leading-snug tracking-tight sm:gap-2.5 sm:text-5xl sm:font-medium sm:leading-[1.18] lg:text-6xl lg:leading-[1.16]">
              <span className="headline-slice text-zinc-300">Smarter Systems.</span>
              <span className="headline-slice headline-slice--d1 text-zinc-300">
                Leaner Costs.
              </span>
              <span className="headline-slice headline-slice--d2 text-zinc-300">
                Bigger Results.
              </span>
            </h1>
          ) : null}
        </div>

        <p className="mx-auto max-w-2xl text-lg font-normal leading-[1.7] text-zinc-400 sm:max-w-3xl sm:text-xl sm:leading-relaxed">
          <span className="text-zinc-400">
            Whether you&apos;re deep in{" "}
            <SubheadSalesforceTyping onComplete={() => setHeroHeadlineReady(true)} />{" "}
            or looking for something built on your terms,
          </span>
          <br />
          <span className="mt-2 inline-block text-zinc-200 sm:mt-1.5">
            We&apos;ve got you covered.
          </span>
        </p>

        <div className="mt-10 w-full rounded-3xl border border-white/[0.1] bg-gradient-to-b from-zinc-950/75 to-zinc-950/35 p-8 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What We Offer
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            We help teams implement and optimise Salesforce, plus build custom CRM
            solutions that fit how you work.
          </p>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Salesforce Implementation & Support",
                body: "Implementation, optimisation, and ongoing support.",
              },
              {
                title: "Custom CRM Solution",
                body: "Bespoke CRM built around your business and workflows.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="group rounded-2xl border border-white/[0.08] bg-zinc-900/65 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-zinc-900/85"
              >
                <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <button
              type="button"
              onClick={onServicesClick}
              className="rounded-full border border-accent/35 bg-accent/10 px-4 py-2 text-left text-sm font-semibold text-accent transition hover:border-accent/55 hover:bg-accent/15 hover:text-[#59adff]"
            >
              Services -&gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
