/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Contact form API (see App / ContactSection). In dev, Vite uses `/api/enquiries` proxy. */
  readonly VITE_ENQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
