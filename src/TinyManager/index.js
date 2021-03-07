import React from "react";
import { HashRouter } from "react-router-dom";

import Content from "TinyManager/containers/Content";
import ThemeProvider from "TinyManager/services/ThemeProvider";

function TinyManager() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Content />
      </HashRouter>
    </ThemeProvider>
  );
}

export default TinyManager;
