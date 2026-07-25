import 'i18next';
import type en from './locales/en.json';
import type { defaultNS } from './index';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: typeof en;
    };
  }
}
