import React, { createContext, useMemo } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PropTypes from "prop-types";

import cn from "TinyManager/assets/locales/cn/translations.json";
import de from "TinyManager/assets/locales/de/translations.json";
import en from "TinyManager/assets/locales/en/translations.json";
import es from "TinyManager/assets/locales/es/translations.json";
import fr from "TinyManager/assets/locales/fr/translations.json";
import ind from "TinyManager/assets/locales/in/translations.json";
import ru from "TinyManager/assets/locales/ru/translations.json";
import jp from "TinyManager/assets/locales/jp/translations.json";

const TranslationContext = createContext({});

const resources = {
  cn: { translation: cn },
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  in: { translation: ind },
  jp: { translation: jp },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

function TranslationProvider(props) {
  const { children } = props;

  const value = useMemo(() => ({}), []);
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

TranslationProvider.propTypes = {
  children: PropTypes.element,
};

export default TranslationProvider;

export { useTranslation, Trans as Translate } from "react-i18next";
