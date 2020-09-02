import React from "react";

import Todo from "./Todo";
import ThemeProvider from "TinyManager/services/ThemeProvider";

export default {
  title: "Example/Todo",
  component: Todo,
};

const Template = (args) => {
  return <Todo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "Todo task",
};

export const Completed = Template.bind({});
Completed.args = {
  ...Default.args,
  isCompleted: true,
};

const DarkTemplate = (args) => {
  return (
    <ThemeProvider darkMode={true}>
      <Todo {...args} />
    </ThemeProvider>
  );
};

export const DarkModeDefault = DarkTemplate.bind({});
DarkModeDefault.args = {
  ...Default.args,
};

export const DarkModeCompleted = DarkTemplate.bind({});
DarkModeCompleted.args = {
  ...Completed.args,
};
