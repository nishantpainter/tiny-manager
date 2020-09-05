import React from "react";

import TodoForm from "./TodoForm";

export default {
  title: "Example/TodoForm",
  component: TodoForm,
};

const Template = (args) => <TodoForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Title = Template.bind({});
Title.args = { title: "Make Coffee" };

export const Error = Template.bind({});
Error.args = { errors: { title: "Title is required" } };
