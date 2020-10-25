import React from "react";

import Paper from "./Paper";
import { withWrapper } from "TinyManager/decorators";

export default {
  title: "TinyManager/Paper",
  component: Paper,
  decorators: [withWrapper],
};

const Template = (args) => <Paper {...args} />;

export const Default = Template.bind({});
Default.args = {};
