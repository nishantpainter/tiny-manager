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
    progress: 90,
  },
};

export const LowPriority = Template.bind({});
LowPriority.args = {
  task: {
    ...Default.args.task,
    priority: 0,
  },
};

export const MediumPriority = Template.bind({});
MediumPriority.args = {
  task: {
    ...Default.args.task,
    priority: 1,
  },
};

export const HighPriority = Template.bind({});
HighPriority.args = {
  task: {
    ...Default.args.task,
    priority: 2,
  },
};

export const Completed = Template.bind({});
Completed.args = {
  task: {
    ...Default.args.task,
    progress: 100,
  },
};
