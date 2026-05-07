import { ArrowDown, Boxes, ChevronDown, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const ACCENT = "text-accent";

type OfferId = "salesforce" | "custom";

const WHAT_WE_OFFER_ITEMS: {
  id: OfferId;
  icon: LucideIcon;
  title: string;
  teaser: string;
  details: string | readonly [string, string];
  bullets: string[];
}[] = [
  {
    id: "salesforce",
    icon: Cloud,
    title: "Salesforce Implementation & Support",
    teaser:
      "From initial setup and configuration through to ongoing support - we handle the full Salesforce journey.",
    details: [
      "Whether you are migrating from another platform, rolling out a new org, or need a trusted partner to maintain and evolve your existing implementation,",
      "we bring the expertise to get it right.",
    ] as const,
    bullets: [
      "Org setup, configuration & customisation",
      "Data migration & integration",
      "User training & adoption support",
      "Ongoing managed support",
    ],
  },
  {
    id: "custom",
    icon: Boxes,
    title: "Custom CRM Solution",
    teaser:
      "When off-the-shelf products fall short on price or complexity, we build a CRM tailored precisely to your needs.",
      details:
      "Through a structured discovery process, we develop a platform built precisely around your workflows scalable, maintainable, and aligned to your long-term business objectives.",
    bullets: [
      "Structured requirements discovery & solution architecture",
      "Purpose-engineered for your operational workflows",
      "Built to scale alongside your organisation",
      "Recommended where commercial or functional constraints rule out standard platforms",
    ],
  },
];

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

export function HeroSection() {
  const [heroHeadlineReady, setHeroHeadlineReady] = useState(false);
  const offerRef = useRevealOnScroll<HTMLDivElement>();
  const [openOffers, setOpenOffers] = useState<Set<OfferId>>(() => new Set());
  const [offerHeaderMinPx, setOfferHeaderMinPx] = useState<number | undefined>(
    undefined,
  );
  const offerHeaderBtnRefs = useRef<
    Partial<Record<OfferId, HTMLButtonElement>>
  >({});

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const measure = () => {
      if (!mq.matches) {
        setOfferHeaderMinPx(undefined);
        return;
      }
      const a = offerHeaderBtnRefs.current.salesforce;
      const b = offerHeaderBtnRefs.current.custom;
      if (!a || !b) return;

      for (const el of [a, b]) {
        el.style.minHeight = "";
      }
      const maxPx = Math.max(
        a.getBoundingClientRect().height,
        b.getBoundingClientRect().height,
      );
      if (maxPx > 0) setOfferHeaderMinPx(maxPx);
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    const a = offerHeaderBtnRefs.current.salesforce;
    const b = offerHeaderBtnRefs.current.custom;
    if (a) ro.observe(a);
    if (b) ro.observe(b);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const toggleOffer = (id: OfferId) => {
    setOpenOffers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

        <div className="mt-8 flex w-full justify-center">
          <button
            type="button"
            onClick={() =>
              document.getElementById("what-we-offer")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="services-cta-motion inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/55 hover:bg-accent/15 hover:text-[#59adff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <ArrowDown className="h-4 w-4 shrink-0" aria-hidden />
            Services
          </button>
        </div>

        <div
          id="what-we-offer"
          ref={offerRef.ref}
          className="mt-20 w-full scroll-mt-28 rounded-3xl bg-gradient-to-b from-zinc-950/75 to-zinc-950/35 p-8 text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:mt-28 sm:p-10"
        >
          <h2
            className={`section-heading animate-on-scroll ${offerRef.visible ? "is-visible" : ""}`}
          >
            What We Offer
          </h2>
          <p
            className={`section-lede animate-on-scroll ${offerRef.visible ? "is-visible" : ""}`}
            style={{ transitionDelay: "80ms" }}
          >
            We specialise in Salesforce implementation and support, and custom-built
            CRM solutions for businesses whose needs go beyond what off-the-shelf
            products can offer.
          </p>

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 sm:items-start">
            {WHAT_WE_OFFER_ITEMS.map((item) => {
              const OfferIcon = item.icon;
              return (
              <li
                key={item.id}
                className="h-fit rounded-2xl border border-white/[0.08] bg-zinc-900/65 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-zinc-900/85"
              >
                <button
                  type="button"
                  ref={(el) => {
                    if (el) offerHeaderBtnRefs.current[item.id] = el;
                    else delete offerHeaderBtnRefs.current[item.id];
                  }}
                  onClick={() => toggleOffer(item.id)}
                  style={
                    offerHeaderMinPx != null
                      ? { minHeight: offerHeaderMinPx }
                      : undefined
                  }
                  className="flex w-full items-start justify-between gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                  aria-expanded={openOffers.has(item.id)}
                  aria-controls={`offer-details-${item.id}`}
                >
                  <div className="min-w-0 flex-1">
                    <OfferIcon
                      className="mb-4 h-10 w-10 text-accent"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h3 className="text-xl font-bold text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-zinc-400">
                      {item.teaser}
                    </p>
                  </div>
                  <ChevronDown
                    className={`mt-2 h-5 w-5 shrink-0 text-zinc-400 transition-transform ${openOffers.has(item.id) ? "rotate-180 text-accent" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`offer-details-${item.id}`}
                  className={`grid transition-all duration-300 ease-out ${openOffers.has(item.id) ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    
                    <p className="text-[16px] leading-relaxed text-zinc-400">
                      {Array.isArray(item.details) ? (
                        <>
                          {item.details[0]}
                          <br />
                          {item.details[1]}
                        </>
                      ) : (
                        item.details
                      )}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-[16px] leading-relaxed text-zinc-500"
                        >
                          <span className={ACCENT} aria-hidden>
                            &rarr;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
