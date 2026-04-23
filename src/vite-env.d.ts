/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  /** Optional decimal latitude (default: Wellington CBD) */
  readonly VITE_GOOGLE_MAPS_LAT?: string;
  /** Optional decimal longitude */
  readonly VITE_GOOGLE_MAPS_LNG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
