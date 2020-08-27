import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";

const useStyles = makeStyles(() => ({
  paper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function ProjectCard(props) {
  const { project, onClick, className } = props;

  const classes = useStyles();
  return (
    <Paper
      className={clsx(classes.paper, className)}
      onClick={(e) => onClick(e, project)}
    >
      <Typography variant="h4" color="primary">
        {project.name}
      </Typography>
      <Typography variant="subtitle1">{project.description}</Typography>
    </Paper>
  );
}

ProjectCard.defaultProps = {
  project: {},
  onClick: () => {},
};

export default ProjectCard;
