import React from "react";

import Loader from "TinyManager/components/Loader";

export default {
  title: "Example/Loader",
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
