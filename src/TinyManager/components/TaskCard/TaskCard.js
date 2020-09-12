import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Typography, IconButton, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";

import Paper from "../Paper";
import { TaskType } from "TinyManager/types/index";
import CircularProgressWithLabel from "../CircularProgressWithLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: theme.spacing(7),
    alignItems: "center",
  },
  mediumPriority: {
    color: theme.palette.type === "dark" && theme.palette.warning.light,
    backgroundColor:
      theme.palette.type === "light" && theme.palette.warning.light,
  },
  highPriority: {
    color: theme.palette.type === "dark" && theme.palette.error.light,
    backgroundColor:
      theme.palette.type === "light" && theme.palette.error.light,
  },
  progress: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

function TaskCard(props) {
  const { task, onClick, onDelete } = props;
  const { priority } = task;

  const classes = useStyles();
  const theme = useTheme();

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
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <Typography
            className={clsx(priority === 1 && classes.mediumPriority)}
          >
            {task.title}
          </Typography>
        </Grid>
        <Grid item xs={2} align="right" className={classes.progress}>
          <CircularProgressWithLabel
            color={
              priority === 0
                ? "primary"
                : theme.palette.type === "dark"
                ? "inherit"
                : "secondary"
            }
            value={task.progress}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <IconButton size="small" onDelete={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
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
