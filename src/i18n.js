import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Загружает переводы
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Интеграция с React
  .init({
    supportedLngs: ["en", "ru"], // Добавь языки, которые будут поддерживаться
    fallbackLng: "en", // Язык по умолчанию, если перевод отсутствует
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Путь к файлам с переводами
    },
    react: {
      useSuspense: false, // Отключает suspense в React
    },
  });

export default i18n;
