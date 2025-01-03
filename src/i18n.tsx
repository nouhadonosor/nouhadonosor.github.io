import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    nsSeparator: ".",
    keySeparator: ".",
    fallbackLng: "en",
    interpolation: {
      escapeValue: true,
    },
    backend: {
      loadPath: "/locales/{{ns}}/{{lng}}.json",
    },
    react: {
      useSuspense: false,
    },
    load: "languageOnly",
  });

export default i18n;
