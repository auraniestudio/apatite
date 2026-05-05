import { useState } from "react";
import { Send } from "lucide-react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";


const ENQUIRY_TOKEN_DISABLED = "disabled";

type ContactSectionProps = {
  endpoint: string;
};

export function ContactSection({ endpoint }: ContactSectionProps) {
  const formRef = useRevealOnScroll<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const url = endpoint.trim();
    if (!url) {
      setSubmitError("Contact endpoint is not configured.");
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      token: ENQUIRY_TOKEN_DISABLED,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Request failed (${res.status}): ${text || "Unknown error"}`,
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Submit error:", err);

      if (err instanceof TypeError) {
        setSubmitError(
          /failed to fetch/i.test(err.message)
            ? "Could not reach the server. On the live site this is often a CORS or network issue; the API must allow your domain."
            : err.message,
        );
      } else if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={formRef.ref}
      className="px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className={`section-heading animate-on-scroll ${
            formRef.visible ? "is-visible" : ""
          }`}
        >
          Contact us
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div
            className={`animate-on-scroll flex flex-col ${
              formRef.visible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              {submitted ? (
                <p className="rounded-[2rem] border border-accent/30 bg-accent/5 px-8 py-10 text-center text-lg font-medium text-zinc-200">
                  Thanks, your message is on its way. We&apos;ll be in touch shortly.
                </p>
              ) : (
                <>
                  {submitError ? (
                    <p className="rounded-[2rem] border border-red-500/40 bg-red-500/10 px-8 py-6 text-center text-sm font-medium text-red-200">
                      {submitError}
                    </p>
                  ) : null}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
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
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
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
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your goals…"
                      className="min-h-[140px] w-full resize-y rounded-[2.5rem] border border-white/10 bg-zinc-900/70 px-6 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60 sm:min-w-[160px] sm:w-auto"
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending..." : "Send"}
                    <Send className="h-5 w-5" aria-hidden />
                  </button>
                </>
              )}
            </form>
          </div>

          <div
            className={`animate-on-scroll flex h-full min-h-[300px] flex-col lg:min-h-0 ${
              formRef.visible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/50">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Wellington+CBD,+Wellington,+New+Zealand"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Wellington CBD on Google Maps"
                className="group block h-full w-full"
              >
                <img
                  src="/wlg.png"
                  alt="Wellington city view"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
