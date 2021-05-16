import React, { useCallback, useMemo } from "react";

import Topbar from "TinyManager/components/Topbar";
import { useTheme } from "TinyManager/providers/ThemeProvider";
import { useTranslation } from "TinyManager/providers/TranslationProvider";

function TopbarContainer() {
  const { toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = useCallback(
    (event, lang) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  const languages = useMemo(
    () => [
      {
        label: "English",
        value: "en",
      },
      {
        label: "French",
        value: "fr",
      },
    ],
    []
  );

  return (
    <Topbar
      translate={t}
      onToggleDarkMode={toggleDarkMode}
      onlanguageChange={handleLanguageChange}
      languages={languages}
    />
  );
}

export default TopbarContainer;
