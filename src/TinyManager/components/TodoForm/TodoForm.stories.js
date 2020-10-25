import React from "react";

import TodoForm from "./TodoForm";
import { TodoType } from "TinyManager/types";
import { withLargeWrapper } from "TinyManager/decorators";

const argTypes = {
  title: {
    label: "title",
    description: "Title of form",
    type: { name: "string" },
    control: {
      type: "string",
    },
  },
  disabled: {
    label: "disabled",
    description: "Disable state of form",
    type: {
      name: "boolean",
    },
    control: {
      type: "boolean",
    },
  },
  values: {
    label: "values",
    description: "Values of the form",
    type: TodoType,
    control: {
      type: null,
    },
  },
  errors: {
    label: "errors",
    description: "Errors of the form",
    type: TodoType,
    control: {
      type: null,
    },
  },
  onChange: {
    label: "onChange",
    description: "Form change handler",
    type: "func",
    control: {
      type: null,
    },
  },
  onCancel: {
    label: "onCancel",
    description: "Form cancel handler",
    type: "func",
    control: {
      type: null,
    },
  },
  onSubmit: {
    label: "onSubmit",
    description: "Form submit handler",
    type: "func",
    control: {
      type: null,
    },
  },
};

export default {
  title: "TinyManager/TodoForm",
  component: TodoForm,
  argTypes,
  decorators: [withLargeWrapper],
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
