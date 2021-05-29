import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { identity } from "../utils";

function ConfirmationDialog(props) {
  const {
    title,
    content,
    open,
    translate,
    onClose,
    onConfirm,
    onCancel,
  } = props;

  const handleCancel = onCancel || onClose;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{translate("Cancel")}</Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          {translate("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  title: PropTypes.element,
  content: PropTypes.element,
  open: PropTypes.bool,
  translate: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ConfirmationDialog.defaultProps = {
  translate: identity,
};

export default ConfirmationDialog;
