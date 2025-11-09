import React from "react";
import { useTranslation } from "react-i18next";
import { LocalButton } from "../ui/locale-button/locale-button";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className='flex gap-2 items-center' data-testid='language-switcher'>
      <LocalButton
        onClick={() => changeLanguage("en")}
        variant={i18n.language === "en" ? "primary" : "secondary"}
        data-testid='language-en-button'
      >
        EN
      </LocalButton>

      <LocalButton
        onClick={() => changeLanguage("es")}
        variant={i18n.language === "es" ? "primary" : "secondary"}
        data-testid='language-es-button'
      >
        ES
      </LocalButton>
    </div>
  );
};
