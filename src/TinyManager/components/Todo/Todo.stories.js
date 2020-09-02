import React from "react";

import Todo from "./Todo";
import ThemeProvider from "TinyManager/services/ThemeProvider";

const argTypes = {
  title: {
    name: "title",
    description: "Todo title",
    type: {
      name: "string",
      required: true,
    },
    control: {
      type: "text",
    },
  },
  isCompleted: {
    name: "isCompleted",
    description: "Completion status of todo",
    defaultValue: false,
    type: {
      name: "boolean",
    },
    control: {
      type: "boolean",
    },
  },
};

export default {
  title: "Example/Todo",
  component: Todo,
  argTypes,
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
