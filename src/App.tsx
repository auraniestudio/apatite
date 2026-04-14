import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Cloud,
  Diamond,
  Layers,
  Send,
  Sparkles,
} from "lucide-react";

const ACCENT = "text-accent";
const ACCENT_BG = "bg-accent";
const ACCENT_RING = "ring-accent/40";

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
  const servicesRef = useRevealOnScroll<HTMLElement>();
  const formRef = useRevealOnScroll<HTMLElement>();

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
        className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0a]"
        aria-hidden
      />
      <div
        className="orb pointer-events-none fixed -left-1/4 top-0 -z-10 h-[min(80vw,720px)] w-[min(80vw,720px)] rounded-full bg-accent/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="orb pointer-events-none fixed -right-1/4 bottom-0 -z-10 h-[min(70vw,600px)] w-[min(70vw,600px)] rounded-full bg-accent/10 blur-[100px]"
        style={{ animationDelay: "-6s" }}
        aria-hidden
      />

      <header className="fixed left-0 right-0 top-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="relative mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Logo: replace the block below with e.g.
                  <img src="/logo.svg" alt="Apatite IO" className="h-9 w-auto" />
                  and remove the placeholder icon + wordmark if you only want the image. */}
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-colors group-hover:border-accent/40">
                <Diamond
                  className={`h-[18px] w-[18px] ${ACCENT}`}
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
              <span className="text-[15px] font-bold tracking-[0.2em] text-white sm:text-base">
                APATITE
              </span>
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              className={`rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 ${ACCENT_RING}`}
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
          <div className="mx-auto max-w-6xl">
            <p
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 animate-fade-in-up`}
              style={{ animationDelay: "0.05s" }}
            >
              <Sparkles className={`h-3.5 w-3.5 ${ACCENT}`} aria-hidden />
              Apatite IO
            </p>
            <h1
              className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              Custom CRM &amp; Salesforce Solutions on{" "}
              <span className={ACCENT}>AWS</span>
            </h1>
            <p
              className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-400 sm:text-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              We design and ship tailored customer platforms—integrations,
              automation, and secure cloud architecture—so your revenue teams
              move faster without fighting the stack.
            </p>
            <div
              className="mt-12 flex flex-wrap items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              <button
                type="button"
                onClick={scrollToContact}
                className={`inline-flex items-center gap-2 rounded-full ${ACCENT_BG} px-8 py-4 text-base font-bold text-[#0a0a0a] shadow-[0_0_40px_-8px_var(--color-accent)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${ACCENT_RING}`}
              >
                Start a project
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <a
                href="#services"
                className="rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                What we build
              </a>
            </div>
          </div>
        </section>

        <section
          id="services"
          ref={servicesRef.ref}
          className="px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              className={`animate-on-scroll text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 ${servicesRef.visible ? "is-visible" : ""}`}
            >
              Services
            </h2>
            <p
              className={`animate-on-scroll mt-4 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl ${servicesRef.visible ? "is-visible" : ""}`}
              style={{ transitionDelay: "80ms" }}
            >
              Everything wired for scale on AWS.
            </p>
            <ul className="mt-16 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: Layers,
                  title: "Custom CRM",
                  body: "Purpose-built pipelines, objects, and workflows aligned to how you actually sell.",
                },
                {
                  icon: Sparkles,
                  title: "Salesforce Solutions",
                  body: "Implementation, cleanup, and extensions—Apex, APIs, and admin that stays maintainable.",
                },
                {
                  icon: Cloud,
                  title: "AWS Native",
                  body: "Secure integrations, serverless glue, and observability in your cloud—not a black box.",
                },
              ].map((item, i) => (
                <li
                  key={item.title}
                  className={`animate-on-scroll rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 transition hover:border-accent/25 hover:bg-white/[0.04] ${servicesRef.visible ? "is-visible" : ""}`}
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
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
              <div
                className={`animate-on-scroll flex flex-col gap-10 ${formRef.visible ? "is-visible" : ""}`}
              >
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Tell us what you&apos;re building.
                  </h2>
                  <p className="mt-4 text-lg text-zinc-400">
                    Share a few details—we&apos;ll follow up. No spam, no
                    boilerplate pitch deck.
                  </p>
                  <div className="mt-10 hidden h-px w-32 bg-gradient-to-r from-accent to-transparent lg:block" />
                </div>
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                {submitted ? (
                  <p className="rounded-[2rem] border border-accent/30 bg-accent/5 px-8 py-10 text-center text-lg font-medium text-zinc-200">
                    Thanks—your message is in. We&apos;ll be in touch shortly.
                  </p>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-zinc-400"
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
                        className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-zinc-400"
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
                        className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-zinc-400"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="CRM goals, Salesforce org shape, timeline…"
                        className="w-full resize-y rounded-[2.5rem] border border-white/15 bg-white/[0.04] px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25 min-h-[140px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full ${ACCENT_BG} py-4 text-base font-bold text-[#0a0a0a] shadow-[0_0_32px_-6px_var(--color-accent)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${ACCENT_RING} sm:w-auto sm:min-w-[200px]`}
                    >
                      Send
                      <Send className="h-5 w-5" aria-hidden />
                    </button>
                  </>
                )}
                </form>
              </div>
              <div
                className={`animate-on-scroll h-full min-h-[280px] ${formRef.visible ? "is-visible" : ""}`}
                style={{ transitionDelay: "120ms" }}
              >
                <figure className="relative h-full min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/40 shadow-[0_0_60px_-20px_var(--color-accent)] lg:min-h-[520px]">
                  {/* Swap src for your own image: place a file in /public e.g. /team.jpg */}
                  <img
                    src="/contact-photo.jpg"
                    alt="Cloud and data center infrastructure"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/10 to-transparent"
                    aria-hidden
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Apatite IO. All rights reserved.
          </p>
          <p className="text-sm text-zinc-600">Built for AWS. Designed for operators.</p>
        </div>
      </footer>
    </div>
  );
}
