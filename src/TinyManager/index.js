import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "TinyManager/containers/Content";
import ThemeProvider from "TinyManager/services/ThemeProvider";

function TinyManager() {
  return (
    <ThemeProvider>
      <Router>
        <Content />
      </Router>
    </ThemeProvider>
  );
}

export default TinyManager;
