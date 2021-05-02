import React from "react";
import Topbar from "TinyManager/components/Topbar";
import { useTheme } from "TinyManager/providers/ThemeProvider";

function TopbarContainer() {
  const { toggleDarkMode } = useTheme();
  return <Topbar onToggleDarkMode={toggleDarkMode} />;
}

export default TopbarContainer;
