import React from "react";

import Topbar from "TinyManager/components/Topbar";
import { useTheme } from "TinyManager/providers/ThemeProvider";
import { useTranslation } from "TinyManager/providers/TranslationProvider";

function TopbarContainer() {
  const { toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  return <Topbar translate={t} onToggleDarkMode={toggleDarkMode} />;
}

export default TopbarContainer;
