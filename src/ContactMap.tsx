import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

/** Wellington CBD default; override with VITE_GOOGLE_MAPS_LAT / VITE_GOOGLE_MAPS_LNG */
const DEFAULT_CENTER = { lat: -41.28664, lng: 174.7756 };

function parseCoord(value: string | undefined, fallback: number): number {
  if (value == null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function ContactMapPlaceholder() {
  return (
    <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 px-6 py-10 text-center">
      <MapPin className="h-9 w-9 text-zinc-600" aria-hidden />
      <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
        Set{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-400">
          VITE_GOOGLE_MAPS_API_KEY
        </code>{" "}
        in <code className="text-zinc-400">.env</code>, then restart the dev
        server.
      </p>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Wellington%2C+New+Zealand"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        Open Wellington on Google Maps
      </a>
    </div>
  );
}

function ContactMapInner({ apiKey }: { apiKey: string }) {
  const center = {
    lat: parseCoord(import.meta.env.VITE_GOOGLE_MAPS_LAT, DEFAULT_CENTER.lat),
    lng: parseCoord(import.meta.env.VITE_GOOGLE_MAPS_LNG, DEFAULT_CENTER.lng),
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: "apatite-google-maps",
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/60 px-6 text-center text-sm text-zinc-500">
        Couldn&apos;t load Google Maps. Check your API key and that the Maps
        JavaScript API is enabled.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full min-h-[280px] w-full animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/60 text-sm text-zinc-500">
        Loading map…
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full min-h-[280px] rounded-2xl"
      center={center}
      zoom={14}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        clickableIcons: true,
      }}
    >
      <Marker position={center} title="Apatite IO — Wellington, New Zealand" />
    </GoogleMap>
  );
}

export function ContactMap() {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "").trim();
  if (!apiKey) {
    return <ContactMapPlaceholder />;
  }
  return <ContactMapInner apiKey={apiKey} />;
}
