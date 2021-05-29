import React from "react";

import ConfirmationDialog from "./ConfirmationDialog";
import { identity, noop } from "../utils";

export default {
  title: "TinyManager/ConfirmationDialog",
  component: ConfirmationDialog,
};

const Template = (args) => <ConfirmationDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: "Confirmation Dialog",
  content: "Do you want to continue?",
  onClose: noop,
  onCancel: noop,
  onConfirm: noop,
  translate: identity,
};
