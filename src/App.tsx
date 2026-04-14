import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

const ACCENT = "text-accent";

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
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" aria-hidden />

      <header className="fixed left-0 right-0 top-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="relative mx-auto max-w-6xl px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="group flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src="/apatite_io_logo.jpeg"
                alt="Apatite"
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
          <div className="mx-auto mt-10 w-full max-w-4xl sm:mt-14">
            <h1
              className="animate-fade-in-up text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0.15s" }}
            >
              Custom CRM &amp;{" "}
              <span className={ACCENT}>Salesforce</span> Solutions
            </h1>
            <p
              className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-400 sm:text-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              We help businesses understand their bottlenecks, pain points, over
              expenditures so that we can improve business workflows, bring
              forth innovation, opening pathways to hidden opportunities.
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
              Strategy, implementation, and cloud-native delivery tailored to how
              your team sells and operates.
            </p>
            <ul className="mt-14 grid gap-5 sm:grid-cols-3">
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
                className={`animate-on-scroll ${formRef.visible ? "is-visible" : ""}`}
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
                      Thanks—your message is in. We&apos;ll be in touch shortly.
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
                className={`animate-on-scroll h-full min-h-[240px] ${formRef.visible ? "is-visible" : ""}`}
                style={{ transitionDelay: "120ms" }}
              >
                <figure className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/50 lg:aspect-[3/4] lg:min-h-[480px]">
                  <img
                    src="/contact-illustration.png"
                    alt=""
                    className="h-full w-full object-cover object-center"
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
              href="https://www.linkedin.com/"
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
