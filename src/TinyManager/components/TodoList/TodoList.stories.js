import React from "react";

import TodoList from "./TodoList";
import { withWrapper } from "TinyManager/decorators";

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
  title: "TinyManager/TodoList",
  component: TodoList,
  argTypes,
  decorators: [withWrapper],
};

const Template = (args) => {
  return <TodoList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  todos: new Array(10)
    .fill(0)
    .map((_, id) => ({ id, title: `Todo - ${id}`, completed: id % 2 === 0 })),
};

export const Empty = Template.bind({});
Empty.args = {
  todos: [],
};
