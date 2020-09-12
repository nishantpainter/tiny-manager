import React from "react";
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
  const { task } = props;

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography>{task.title}</Typography>
    </Paper>
  );
}

TaskCard.propTypes = {
  task: TaskType,
};

TaskCard.defaultProps = {
  task: {},
};

export default TaskCard;
