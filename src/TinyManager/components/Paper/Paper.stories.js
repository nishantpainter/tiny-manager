import React from "react";

import Paper from "./Paper";
import ThemeProvider from "TinyManager/services/ThemeProvider";

export default {
  title: "Example/Paper",
  component: Paper,
};

const Template = (args) => (
  <ThemeProvider>
    <Paper {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
