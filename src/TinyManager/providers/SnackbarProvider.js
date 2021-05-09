import React from "react";
import PropTypes from "prop-types";
import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";

function SnackbarProvider(props) {
  const { children } = props;
  return (
    <NotistackSnackbarProvider maxSnack={3}>
      {children}
    </NotistackSnackbarProvider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.element,
};

export default SnackbarProvider;

export { useSnackbar } from "notistack";
