import React, { useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import DeleteIcon from "@material-ui/icons/Delete";
import FlagIcon from "@material-ui/icons/Flag";

import Paper from "../Paper";
import CircularProgressWithLabel from "../CircularProgressWithLabel";
import { TaskType } from "TinyManager/types/index";

const useStyles = makeStyles((theme) => {
  const isDark = theme.palette.type === "dark";
  return {
    paper: {
      height: theme.spacing(7),
      alignItems: "center",
    },
    mediumPriority: {
      color: isDark && theme.palette.warning.light,
      backgroundColor: !isDark && theme.palette.warning.light,
    },
    highPriority: {
      color: isDark && theme.palette.error.light,
      backgroundColor: !isDark && theme.palette.error.light,
    },
    progress: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    completedFlag: {
      color: theme.palette.success.light,
      marginRight: theme.spacing(0.5),
    },
  };
});

function TaskCard(props) {
  const { task, onClick, onDelete, className } = props;
  const { priority = 0, progress, title } = task;

  const classes = useStyles();
  const theme = useTheme();

  const handleClick = useCallback(
    (event) => {
      if (onClick) {
        onClick(event, task);
      }
    },
    [onClick, task]
  );

  const handleDelete = useCallback(
    (event) => {
      if (onDelete) {
        onDelete(event, task);
      }
    },
    [onDelete, task]
  );

  const completed = progress === 100;

  return (
    <Paper
      classes={{
        root: clsx(
          classes.paper,
          {
            [classes.mediumPriority]: priority === 1,
            [classes.highPriority]: priority === 2,
          },
          className
        ),
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={9} onClick={handleClick}>
          <Box display="flex" alignItems="center">
            {completed ? <FlagIcon className={classes.completedFlag} /> : null}
            <Typography
              className={clsx({ [classes.mediumPriority]: priority === 1 })}
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          align="right"
          className={classes.progress}
          onClick={handleClick}
        >
          <CircularProgressWithLabel
            color={
              priority === 0
                ? "primary"
                : theme.palette.type === "dark"
                ? "inherit"
                : "secondary"
            }
            value={progress}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <IconButton size="small" onClick={handleDelete}>
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
  /**
   * @ignore
   */
  className: PropTypes.string,
};

TaskCard.defaultProps = {
  task: {},
};

export default TaskCard;
