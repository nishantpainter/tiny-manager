import React from "react";

import Todo from "./Todo";
import { withWrapper } from "TinyManager/decorators";

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
  title: "TinyManager/Todo",
  component: Todo,
  argTypes,
  decorators: [withWrapper],
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
