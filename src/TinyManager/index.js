import React from "react";
import { HashRouter } from "react-router-dom";

import Content from "TinyManager/containers/Content";
import ThemeProvider from "TinyManager/providers/ThemeProvider";
import TranslationProvider from "TinyManager/providers/TranslationProvider";

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
