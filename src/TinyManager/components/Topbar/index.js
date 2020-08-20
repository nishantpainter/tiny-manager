import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

function Topbar({ children }) {
  return (
    <AppBar color="default">
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  );
}

export default Topbar;
