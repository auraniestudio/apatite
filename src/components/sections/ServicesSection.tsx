import { ChevronDown } from "lucide-react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const ACCENT = "text-accent";

export type ServiceDetailId = "salesforce" | "custom";

type ServicesSectionProps = {
  expandedService: ServiceDetailId | null;
  onToggleService: (id: ServiceDetailId) => void;
};

export function ServicesSection({
  expandedService,
  onToggleService,
}: ServicesSectionProps) {
  const servicesRef = useRevealOnScroll<HTMLElement>();

  return (
    <section id="services" ref={servicesRef.ref} className="px-5 py-24 sm:px-8 sm:py-30">
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
          Two focused offerings built around CRM — done properly.
        </p>

        <ul className="mt-12 grid gap-5">
          {[
            {
              id: "salesforce" as const,
              title: "Salesforce Implementation & Support",
              summary: "From initial setup and configuration through to ongoing support.",
              details:
                "We handle the full Salesforce journey. Whether you are migrating from another platform, rolling out a new org, or need a trusted partner to maintain and evolve your existing implementation, we bring the expertise to get it right.",
              bullets: [
                "Org setup, configuration & customisation",
                "Data migration & integration",
                "User training & adoption support",
                "Ongoing managed support",
              ],
            },
            {
              id: "custom" as const,
              title: "Custom CRM Solution",
              summary:
                "For organisations where standard CRM platforms cannot adequately address operational complexity or commercial constraints, we design and deliver fully bespoke solutions.",
              details:
                "Through a structured discovery process, we develop a platform built precisely around your workflows — scalable, maintainable, and aligned to your long-term business objectives.",
              bullets: [
                "Structured requirements discovery & solution architecture",
                "Purpose-engineered for your operational workflows",
                "Built to scale alongside your organisation",
                "Recommended where commercial or functional constraints rule out standard platforms",
              ],
            },
          ].map((item, i) => (
            <li
              key={item.title}
              className={`animate-on-scroll rounded-2xl border border-white/[0.08] bg-zinc-900/65 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.32)] transition duration-300 hover:border-white/20 hover:bg-zinc-900/85 ${servicesRef.visible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <button
                type="button"
                onClick={() => onToggleService(item.id)}
                className="flex w-full items-center justify-between gap-3 text-left"
                aria-expanded={expandedService === item.id}
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${expandedService === item.id ? "rotate-180 text-accent" : ""}`}
                  aria-hidden
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${expandedService === item.id ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="text-[15px] leading-relaxed text-zinc-400">
                    {item.details}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-[13px] leading-relaxed text-zinc-500"
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
          ))}
        </ul>
      </div>
    </section>
  );
}
