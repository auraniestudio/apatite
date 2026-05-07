import { useEffect, useState } from "react";
import { ContactSection } from "./components/sections/ContactSection";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { MissionSection } from "./components/sections/MissionSection";
import { SiteFooter } from "./components/sections/SiteFooter";

const DEFAULT_ENQUIRY_URL =
  "https://5350sqjspa.execute-api.ap-southeast-2.amazonaws.com/prod/enquiries";


const ENQUIRY_ENDPOINT = import.meta.env.DEV
  ? "/api/enquiries"
  : (import.meta.env.VITE_ENQUIRY_ENDPOINT ?? "").trim() || DEFAULT_ENQUIRY_URL;

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#top") return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${mounted ? "page-enter" : "opacity-0"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white focus:ring-2 focus:ring-accent"
      >
        Skip to main content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle min(200vmin, 800px) at 108% 50%, rgba(113, 113, 122, 0.42) 0%, rgba(113, 113, 122, 0.14) 38%, rgba(113, 113, 122, 0.04) 58%, transparent 72%)",
        }}
        aria-hidden
      />

      <Header onLogoClick={scrollToTop} onContactClick={scrollToContact} />

      <main id="main-content">
        <HeroSection />
        <MissionSection />
        <ContactSection endpoint={ENQUIRY_ENDPOINT} />
      </main>

      <SiteFooter />
    </div>
  );
}
