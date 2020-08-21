import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";

const ThemeContext = React.createContext();

function ThemeProvider(props) {
  const { children } = props;

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode((darkMode) => !darkMode);
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: indigo,
      secondary: orange,
    },
    typography: {
      fontFamily: "'Fira Sans', sans-serif",
    },
    props: {},
    overrides: {
      MuiButton: { root: { textTransform: "none" } },
    },
    custom: {
      shadow: ["0px 0px 30px rgba(0,0,0,0.2)"],
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);

export default ThemeProvider;
