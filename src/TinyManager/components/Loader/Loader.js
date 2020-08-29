import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
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

export default Loader;
