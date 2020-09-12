import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  progress: {
    fontSize: "0.60rem",
  },
}));

function CircularProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" size={30} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          className={classes.progress}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

CircularProgressWithLabel.defaultProps = {
  value: 0,
};

export default CircularProgressWithLabel;
