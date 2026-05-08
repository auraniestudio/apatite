import { Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-zinc-900 px-5 py-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/company/apatite-io/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md text-white transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Apatite on LinkedIn"
          >
            <Linkedin className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </a>
          
        </div>
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} Apatite IO. All rights reserved.
        </p>
        <p className="-mt-6 text-sm text-zinc-400">
          Designed by{" "}
          <a
            href="https://www.auraniestudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className=" decoration-zinc-500 underline-offset-2 transition hover:text-zinc-200 hover:decoration-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Auranie Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
