type HeaderProps = {
  onContactClick: () => void;
};

export function Header({ onContactClick }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center justify-between">
          <a
            href="#top"
            aria-label="Go to top"
            className="group flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src="/logo-square-transparent-bw.png"
              alt="Apatite IO"
              className="h-16 w-auto object-contain object-left opacity-95 transition-opacity group-hover:opacity-100 sm:h-[4.75rem] lg:h-[5.25rem]"
            />
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onContactClick}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
