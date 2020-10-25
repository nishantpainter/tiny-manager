import React from "react";

import Loader from "./Loader";
import { withWrapper } from "TinyManager/decorators";

export default {
  title: "TinyManager/Loader",
  component: Loader,
  decorators: [withWrapper],
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
