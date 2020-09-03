import React from "react";

import TodoList from "./TodoList";

export default {
  title: "Example/TodoList",
  component: TodoList,
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
