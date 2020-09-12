import React from "react";

import ProjectCard from "./ProjectCard";

export default {
  title: "TinyManager/ProjectCard",
  component: ProjectCard,
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
