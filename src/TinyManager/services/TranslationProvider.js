import React, { createContext, useMemo } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PropTypes from "prop-types";

import en from "TinyManager/assets/locales/en/translations.json";
import fr from "TinyManager/assets/locales/fr/translations.json";

const TranslationContext = createContext({});

const resources = {
  en: { translation: en },
  fr: { translation: fr },
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
