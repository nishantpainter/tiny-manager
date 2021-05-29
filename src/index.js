import React from "react";
import ReactDOM from "react-dom";

import TinyManager from "TinyManager";
import * as serviceWorker from "serviceWorker";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <TinyManager />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
