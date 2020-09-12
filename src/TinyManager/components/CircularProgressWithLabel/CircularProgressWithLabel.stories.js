import React from "react";

import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default {
  title: "TinyManager/CircularProgressWithLabel",
  component: CircularProgressWithLabel,
};

const Template = (args) => <CircularProgressWithLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 50,
};
