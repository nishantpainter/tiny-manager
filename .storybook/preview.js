import React from "react";
import ThemeProvider from "../src/TinyManager/services/ThemeProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const globalTypes = {
  darkMode: {
    name: "Dark mode",
    description: "Dark mode view for component",
    defaultValue: false,
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: true, title: "Dark" },
        { value: false, title: "Light" },
      ],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const darkMode = context.globals.darkMode;
  return (
    <ThemeProvider darkMode={darkMode}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
