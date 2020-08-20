import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
  typography: {
    fontFamily: "'Fira Sans', sans-serif",
  },
  props: {},
  overrides: {
    MuiButton: { root: { textTransform: "none" } },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "white",
      },
    },
  },
  custom: {
    shadow: ["0px 0px 30px rgba(0,0,0,0.2)"],
  },
});

function ThemeProvider(props) {
  const { children } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
