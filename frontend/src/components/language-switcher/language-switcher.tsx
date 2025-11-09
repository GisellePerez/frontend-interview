import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className='flex gap-2 items-center' data-testid='language-switcher'>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-md transition-all ${
          i18n.language === "en"
            ? "bg-black text-white"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        data-testid='language-en-button'
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("es")}
        className={`px-3 py-1 rounded-md transition-all ${
          i18n.language === "es"
            ? "bg-black text-white"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        data-testid='language-es-button'
      >
        ES
      </button>
    </div>
  );
};
