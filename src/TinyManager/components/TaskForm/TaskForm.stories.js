import React from "react";

import TaskForm from "./TaskForm";
import ThemeProvider from "TinyManager/services/ThemeProvider";

export default {
  title: "Example/TaskForm",
  component: TaskForm,
};

const Template = (args) => (
  <ThemeProvider>
    <TaskForm {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
