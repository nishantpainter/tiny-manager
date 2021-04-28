import React from "react";
import { HashRouter } from "react-router-dom";

import Content from "TinyManager/containers/Content";
import ThemeProvider from "TinyManager/services/ThemeProvider";
import TranslationProvider from "TinyManager/services/TranslationProvider";

function TinyManager() {
  return (
    <ThemeProvider>
      <HashRouter>
        <TranslationProvider>
          <Content />
        </TranslationProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default TinyManager;
