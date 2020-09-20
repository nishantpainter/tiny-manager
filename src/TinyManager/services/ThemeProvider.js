import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  indigo,
  orange,
  grey,
  red,
  deepOrange,
} from "@material-ui/core/colors";

const ThemeContext = React.createContext();

function ThemeProvider(props) {
  const { children, darkMode: darkModeProp = false } = props;

  const [darkMode, setDarkMode] = React.useState(darkModeProp);

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode((darkMode) => !darkMode);
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: darkMode ? orange : indigo,
      secondary: grey,
      error: darkMode ? deepOrange : red,
    },
    typography: {
      fontFamily: "'Fira Sans', sans-serif",
    },
    props: {
      MuiTextField: {
        variant: "outlined",
      },
    },
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

ThemeProvider.propTypes = {
  /**
   * Children of theme provider ( element )
   */
  children: PropTypes.element,
  /**
   * Darkmode theme type boolean
   */
  darkMode: PropTypes.bool,
};

export default ThemeProvider;
