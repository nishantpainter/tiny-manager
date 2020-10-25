import React from "react";

import ProjectForm from "./ProjectForm";
import { withLargeWrapper } from "TinyManager/decorators";

const argTypes = {
  values: {
    control: {
      type: null,
    },
  },
  errors: {
    control: {
      type: null,
    },
  },
};

export default {
  title: "TinyManager/ProjectForm",
  component: ProjectForm,
  argTypes,
  decorators: [withLargeWrapper],
};

const Template = (args) => <ProjectForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
