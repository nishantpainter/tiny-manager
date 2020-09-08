import React from "react";

import Paper from "./Paper";

export default {
  title: "Example/Paper",
  component: Paper,
};

const Template = (args) => <Paper {...args} />;

export const Default = Template.bind({});
Default.args = {};
