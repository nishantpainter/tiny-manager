import React from "react";
import clsx from "clsx";
import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";

const useStyles = makeStyles(() => ({
  paper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  progress: {
    width: "100%",
  },
}));

function ProjectCard(props) {
  const { className, project, progress, onClick } = props;

  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.paper, className)}
      onClick={(e) => onClick(e, project)}
    >
      <Typography variant="h4" color="primary">
        {project.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {project.description}
      </Typography>
      <LinearProgress
        variant="determinate"
        title={`${Math.round(progress)}%`}
        value={progress}
        className={classes.progress}
      />
    </Paper>
  );
}

ProjectCard.defaultProps = {
  project: {},
  progress: 60,
  onClick: () => {},
};

export default ProjectCard;
