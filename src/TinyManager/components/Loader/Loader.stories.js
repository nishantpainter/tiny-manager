import React from "react";

import Loader from "./index";

export default {
  title: "Example/Loader",
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Loading = Template.bind({});
Loading.args = {};
