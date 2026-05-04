import { useEffect, useState } from "react";
import { ContactSection } from "./components/sections/ContactSection";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { MissionSection } from "./components/sections/MissionSection";
import { SiteFooter } from "./components/sections/SiteFooter";

const DEFAULT_ENQUIRY_URL =
  "https://5350sqjspa.execute-api.ap-southeast-2.amazonaws.com/prod/enquiries";

/**
 * Dev: always `/api/enquiries` (Vite proxy → same API, no browser CORS).
 * Production: `VITE_ENQUIRY_ENDPOINT` from `.env` / host env, else default URL.
 */
const ENQUIRY_ENDPOINT = import.meta.env.DEV
  ? "/api/enquiries"
  : (import.meta.env.VITE_ENQUIRY_ENDPOINT ?? "").trim() || DEFAULT_ENQUIRY_URL;

export default function App() {
  const [mounted, setMounted] = useState(false);

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
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle min(200vmin, 800px) at 108% 50%, rgba(113, 113, 122, 0.42) 0%, rgba(113, 113, 122, 0.14) 38%, rgba(113, 113, 122, 0.04) 58%, transparent 72%)",
        }}
        aria-hidden
      />

      <Header onContactClick={scrollToContact} />

      <main>
        <HeroSection />
        <MissionSection />
        <ContactSection endpoint={ENQUIRY_ENDPOINT} />
      </main>

      <SiteFooter />
    </div>
  );
}
