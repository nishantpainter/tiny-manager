import React from "react";

import TaskForm from "./TaskForm";
import ThemeProvider from "TinyManager/services/ThemeProvider";

export default {
  title: "Example/TaskForm",
  component: TaskForm,
};

const Template = (args) => {
  const { darkMode, ...rest } = args;
  return (
    <ThemeProvider darkMode={darkMode}>
      <TaskForm {...rest} />
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  darkMode: true,
};
