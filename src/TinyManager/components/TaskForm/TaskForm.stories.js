import React from "react";

import TaskForm from "./TaskForm";

export default {
  title: "Example/TaskForm",
  component: TaskForm,
};

const Template = (args) => {
  return <TaskForm {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
