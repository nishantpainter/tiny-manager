import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";

import Paper from "../Paper";
import { TaskType } from "TinyManager/types/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: theme.spacing(7),
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediumPriority: {
    backgroundColor: theme.palette.warning.light,
  },
  highPriority: {
    backgroundColor: theme.palette.error.light,
  },
}));

function TaskCard(props) {
  const { task, onClick, onDelete } = props;
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
      <IconButton size="small" onDelete={onDelete}>
        <DeleteIcon />
      </IconButton>
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
  /**
   * Task delete handler
   */
  onDelete: PropTypes.func,
};

TaskCard.defaultProps = {
  task: {},
  onClick: () => {},
  onDelete: () => {},
};

export default TaskCard;
