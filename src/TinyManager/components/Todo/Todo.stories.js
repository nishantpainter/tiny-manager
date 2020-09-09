import React from "react";

import Todo from "./Todo";

const argTypes = {
  todo: {
    control: {
      type: null,
    },
  },
  divider: {
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
  todo: { ...Default.args.todo, completed: true },
};
