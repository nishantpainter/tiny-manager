import React from "react";

import Topbar from "TinyManager/containers/Topbar";
import ThemeProvider from "TinyManager/services/ThemeProvider";

function TinyManager() {
  return (
    <ThemeProvider>
      <Topbar />
    </ThemeProvider>
  );
}

export default TinyManager;
