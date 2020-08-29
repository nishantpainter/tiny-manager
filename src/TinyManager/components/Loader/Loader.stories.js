import React from "react";

import Loader from "./Loader";

export default {
  title: "Example/Loader",
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
