import { useCallback, useEffect, useRef, useState } from "react";
import {
  Blocks,
  Cloud,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const ACCENT = "text-accent";

/** Typed inline in the hero subhead */
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
      const charMs = narrow ? 105 : 105;
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

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroHeadlineReady, setHeroHeadlineReady] = useState(false);
  const servicesRef = useRevealOnScroll<HTMLElement>();
  const formRef = useRevealOnScroll<HTMLElement>();

  const onSubheadSalesforceComplete = useCallback(() => {
    setHeroHeadlineReady(true);
  }, []);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${mounted ? "page-enter" : "opacity-0"}`}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-black"
        aria-hidden
      />
      {/* Zinc-500 “sports hall” flood: large circle, vertically centered, anchored far right */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle min(200vmin, 800px) at 108% 50%, rgba(113, 113, 122, 0.42) 0%, rgba(113, 113, 122, 0.14) 38%, rgba(113, 113, 122, 0.04) 58%, transparent 72%)",
        }}
        aria-hidden
      />

      <header className="fixed left-0 right-0 top-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="relative mx-auto max-w-6xl px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="group flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src="/logo-square-transparent-bw.png"
                alt="Apatite IO"
                className="h-16 w-auto object-contain object-left opacity-95 transition-opacity group-hover:opacity-100 sm:h-[4.75rem] lg:h-[5.25rem]"
              />
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[calc(100dvh-6.5rem)] flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8 sm:pb-32 sm:pt-36">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-5 sm:gap-6">
            {/* Fixed-height slot so the subhead below never shifts when the headline appears */}
            <div className="flex min-h-[15rem] w-full flex-col items-center justify-center overflow-visible pb-1 sm:min-h-[17.5rem] lg:min-h-[20rem]">
              {heroHeadlineReady ? (
                <h1 className="flex w-full flex-col items-center gap-2 overflow-visible text-balance text-3xl font-semibold leading-snug tracking-tight sm:gap-2.5 sm:text-5xl sm:leading-[1.18] sm:font-medium lg:text-6xl lg:leading-[1.16]">
                  <span className="headline-slice text-zinc-300">
                    Smarter Systems.
                  </span>
                  <span className="headline-slice headline-slice--d1 text-zinc-300">
                    Leaner Costs.
                  </span>
                  <span className="headline-slice headline-slice--d2 text-zinc-300">
                    Bigger Results.
                  </span>
                </h1>
              ) : null}
            </div>
            <p
              className="mx-auto max-w-2xl text-lg font-normal leading-[1.7] text-zinc-400 sm:max-w-3xl sm:text-xl sm:leading-relaxed"
            >
              <span className="text-zinc-400">
                Whether you&apos;re deep in{" "}
                <SubheadSalesforceTyping
                  onComplete={onSubheadSalesforceComplete}
                />{" "}
                or looking for something built on your terms,
              </span>
              <br />
              <span className="mt-2 inline-block text-zinc-200 sm:mt-1.5">
                We&apos;ve got you covered.
              </span>
            </p>
          </div>
        </section>

        <section
          id="services"
          ref={servicesRef.ref}
          className="px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              className={`animate-on-scroll text-4xl font-bold tracking-tight text-white sm:text-5xl ${servicesRef.visible ? "is-visible" : ""}`}
            >
              Services
            </h2>
            <p
              className={`animate-on-scroll mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg ${servicesRef.visible ? "is-visible" : ""}`}
              style={{ transitionDelay: "80ms" }}
            >
              
            </p>
            <ul className="mt-14 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Blocks,
                  title: "Salesforce Implementation & Support",
                  body: "From initial setup to ongoing optimisation, we make sure Salesforce works the way your business needs it to. Whether you're starting fresh or untangling an existing setup, we've got the expertise to get it right.",
                },
                {
                  icon: Cloud,
                  title: "Custom CRM Solution",
                  body: "A CRM built around your business — not a vendor's pricing model. Pay only for what you use, scale at your own pace, and get a solution that actually fits the way you work.",
                },
              ].map((item, i) => (
                <li
                  key={item.title}
                  className={`animate-on-scroll rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-8 transition hover:border-white/15 hover:bg-zinc-900/80 ${servicesRef.visible ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${120 + i * 90}ms` }}
                >
                  <item.icon
                    className={`h-8 w-8 ${ACCENT}`}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          ref={formRef.ref}
          className="px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              className={`animate-on-scroll mb-12 text-center text-3xl font-extrabold tracking-tight text-white sm:mb-16 sm:text-4xl ${formRef.visible ? "is-visible" : ""}`}
            >
              Contact us
            </h2>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
              <div
                className={`animate-on-scroll flex h-full min-h-0 flex-col ${formRef.visible ? "is-visible" : ""}`}
                style={{ transitionDelay: "80ms" }}
              >
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  {submitted ? (
                    <p className="rounded-[2rem] border border-accent/30 bg-accent/5 px-8 py-10 text-center text-lg font-medium text-zinc-200">
                      Thanks, your message is on its way. We&apos;ll be in touch shortly.
                    </p>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jane Doe"
                          className="w-full rounded-full border border-white/10 bg-zinc-900/70 px-6 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@company.com"
                          className="w-full rounded-full border border-white/10 bg-zinc-900/70 px-6 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell us about your goals…"
                          className="min-h-[140px] w-full resize-y rounded-[2.5rem] border border-white/10 bg-zinc-900/70 px-6 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:min-w-[160px]"
                      >
                        Send
                        <Send className="h-5 w-5" aria-hidden />
                      </button>
                    </>
                  )}
                </form>
              </div>
              <div
                className={`animate-on-scroll flex h-full min-h-[350px] flex-col sm:min-h-[200px] lg:min-h-0 ${formRef.visible ? "is-visible" : ""}`}
                style={{ transitionDelay: "120ms" }}
              >
                <figure className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/50">
                  <img
                    src="/contact-illustration.png"
                    alt="Salesforce Implementation & Support in Wellington, New Zealand"
                    className="h-full w-full min-h-[180px] object-cover object-center lg:min-h-0"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/apatite-io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-accent"
              aria-label="Apatite on LinkedIn"
            >
              <Linkedin className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </a>
            <a
              href="mailto:hello@apatite.io"
              className="text-white transition hover:text-accent"
              aria-label="Email Apatite"
            >
              <Mail className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </a>
          </div>
          <p className="text-sm font-medium text-zinc-300">
            Salesforce Implementation &amp; Support
          </p>
          <p className="flex items-center justify-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            Wellington, New Zealand
          </p>
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Apatite IO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
