import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";
import { TaskType } from "TinyManager/types/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: theme.spacing(7),
    justifyContent: "flex-start",
  },
}));

function TaskCard(props) {
  const { task, onClick } = props;

  const classes = useStyles();
  return (
    <Paper className={classes.paper} onClick={onClick}>
      <Typography>{task.title}</Typography>
    </Paper>
  );
}

TaskCard.propTypes = {
  /**
   * Task details
   */
  task: TaskType,
  /**
   * Task click handler
   */
  onClick: PropTypes.func,
};

TaskCard.defaultProps = {
  task: {},
  onClick: () => {},
};

export default TaskCard;
