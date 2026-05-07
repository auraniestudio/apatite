import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export function MissionSection() {
  const missionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32" ref={missionRef.ref}>
      <div className="mx-auto max-w-6xl">
        <h2
          className={`section-heading animate-on-scroll ${missionRef.visible ? "is-visible" : ""}`}
        >
          Our Mission
        </h2>
        <p
          className={`section-lede animate-on-scroll ${missionRef.visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "80ms" }}
        >
          We started Apatite to fix a problem we kept seeing businesses held back by the wrong tools.
          <br /> Our mission is simple.
        </p>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Remove the Noise",
              body: "Overly complex workflows, inherited the wrong tool, or still living in spreadsheets, we come in and clear the path so your team can move freely.",
            },
            {
              title: "Built Around You",
              body: "No two businesses are alike. We take the time to understand how you work before recommending or building anything."
            },
            {
              title: "Your Success is Ours",
              body: "If your team is delivering better for your clients, we're doing our job.  Simple as that.",
            },
          ].map((item, i) => (
            <li
              key={item.title}
              className={`animate-on-scroll rounded-2xl border border-white/[0.08] bg-zinc-900/65 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-zinc-900/85 ${missionRef.visible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <h3 className="text-xl font-bold leading-snug text-zinc-100 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
