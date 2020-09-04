import React from "react";

import Todo from "./Todo";

const argTypes = {
  todo: {
    name: "todo",
    description: "Todo",
    type: {
      name: "object",
      required: true,
    },
    control: {
      type: null,
    },
  },
  divider: {
    name: "divider",
    description: "Divider beneath todo",
    defaultValue: true,
    type: "boolean",
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
  todo: { title: "Todo task" },
};

export const Completed = Template.bind({});
Completed.args = {
  todo: { ...Default.args.todo, isCompleted: true },
};
