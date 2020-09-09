import React from "react";

import ProjectForm from "./ProjectForm";

export default {
  title: "Example/ProjectForm",
  component: ProjectForm,
};

const Template = (args) => <ProjectForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
