import React from "react";

import TodoList from "./TodoList";
import ThemeProvider from "TinyManager/services/ThemeProvider";

const argTypes = {
  todos: {
    name: "todos",
    description: "List of todo",
    type: {
      name: "array",
    },
    control: {
      type: null,
    },
  },
  onTodoClick: {
    name: "onTodoClick",
    description: "Todo click handler",
    type: {
      name: "function",
    },
    control: {
      type: null,
    },
  },
};

export default {
  title: "Example/TodoList",
  component: TodoList,
  argTypes,
};

const Template = (args) => {
  return <TodoList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  todos: new Array(10)
    .fill(0)
    .map((_, id) => ({ id, title: `Todo - ${id}`, isCompleted: id % 2 === 0 })),
};

export const Empty = Template.bind({});
Empty.args = {
  todos: [],
};

const DarkTemplate = (args) => {
  return (
    <ThemeProvider darkMode={true}>
      <TodoList {...args} />
    </ThemeProvider>
  );
};

export const DarkModeDefault = DarkTemplate.bind({});
DarkModeDefault.args = {
  ...Default.args,
};

export const DarkModeEmpty = DarkTemplate.bind({});
DarkModeEmpty.args = {
  ...Empty.args,
};
