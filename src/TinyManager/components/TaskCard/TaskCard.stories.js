import React from "react";

import TaskCard from "./TaskCard";

export default {
  title: "TinyManager/TaskCard",
  component: TaskCard,
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    task: {
      control: {
        type: null,
      },
    },
  },
};

const Template = (args) => <TaskCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    title: "Initate production",
  },
};

export const LowPriority = Template.bind({});
LowPriority.args = {
  task: {
    title: "Initate production",
    priority: 0,
  },
};

export const MediumPriority = Template.bind({});
MediumPriority.args = {
  task: {
    title: "Initate production",
    priority: 1,
  },
};

export const HighPriority = Template.bind({});
HighPriority.args = {
  task: {
    title: "Initate production",
    priority: 2,
  },
};
