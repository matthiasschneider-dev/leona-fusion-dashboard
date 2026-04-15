/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string;
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_COMPANY_LOGO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
