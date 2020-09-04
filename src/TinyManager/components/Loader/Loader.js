import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "inherit",
    width: "inherit",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    color: "transparent",
  },
  bottom: {
    color: theme.palette.primary.main,
    animationDuration: "250ms",
    position: "absolute",
  },
}));

function Loader(props) {
  const { className } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
