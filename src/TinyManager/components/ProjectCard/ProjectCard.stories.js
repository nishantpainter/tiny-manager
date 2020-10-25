import React from "react";

import ProjectCard from "./ProjectCard";
import { withWrapper } from "TinyManager/decorators";

export default {
  title: "TinyManager/ProjectCard",
  component: ProjectCard,
  decorators: [withWrapper],
};

const Template = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  project: {
    name: "Tiny Manager",
    description: "Tiny manager for your self project",
  },
};

export const Progress = Template.bind({});
Progress.args = {
  ...Default.args,
  progress: 100,
};
