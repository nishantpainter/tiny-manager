import React, { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { noop } from "TinyManager/components/utils";

export const DialogContext = createContext({});

function DialogProvider(props) {
  const {
    children,
    title,
    content,
    onOpen,
    onClose,
    onConfirm,
    onCancel,
  } = props;

  const [open, setOpen] = useState(false);

  const openDialog = useCallback(
    (event) => {
      setOpen(true);
      onOpen(event);
    },
    [onOpen]
  );

  const closeDialog = useCallback(
    (event) => {
      setOpen(false);
      onClose(event);
    },
    [onClose]
  );

  const handleConfirm = useCallback(
    (event) => {
      closeDialog();
      onConfirm(event);
    },
    [closeDialog, onConfirm]
  );

  const handleCancel = useCallback(
    (event) => {
      closeDialog();
      onCancel(event);
    },
    [closeDialog, onCancel]
  );

  const value = useMemo(
    () => ({
      open,
      openDialog,
      closeDialog,
    }),
    [open, openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.any,
  content: PropTypes.any,
};

DialogProvider.defaultProps = {
  onClose: noop,
  onOpen: noop,
  onConfirm: noop,
  onCancel: noop,
};
