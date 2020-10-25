import React from "react";

import TaskForm from "./TaskForm";
import { withLargeWrapper } from "TinyManager/decorators";

export default {
  title: "TinyManager/TaskForm",
  component: TaskForm,
  decorators: [withLargeWrapper],
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
