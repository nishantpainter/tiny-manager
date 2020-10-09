import React from "react";

import IconButton from "./IconButton";

export default {
  title: "TinyManager/IconButton",
  component: IconButton,
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: "filter",
};
