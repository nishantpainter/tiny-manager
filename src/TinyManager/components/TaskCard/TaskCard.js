import React from "react";
import clsx from "clsx";
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
  mediumPriority: {
    backgroundColor: theme.palette.warning.light,
  },
  highPriority: {
    backgroundColor: theme.palette.error.light,
  },
}));

function TaskCard(props) {
  const { task, onClick } = props;
  const { priority } = task;

  const classes = useStyles();
  return (
    <Paper
      classes={{
        root: clsx(
          classes.paper,
          priority === 1 && classes.mediumPriority,
          priority === 2 && classes.highPriority
        ),
      }}
      onClick={onClick}
    >
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
