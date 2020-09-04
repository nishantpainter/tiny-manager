import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";
import Types from "TinyManager/types";

const useStyles = makeStyles(() => ({
  paper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  fullWidth: {
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
      <Typography
        variant="subtitle1"
        title={project.description}
        className={classes.fullWidth}
        gutterBottom
        noWrap
      >
        {project.description}
      </Typography>
      <LinearProgress
        variant="determinate"
        title={`${Math.round(progress)}%`}
        value={progress}
        className={classes.fullWidth}
      />
    </Paper>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.shape(Types.Project),
  progress: PropTypes.number,
  onClick: PropTypes.func,
};

ProjectCard.defaultProps = {
  project: {},
  progress: 60,
  onClick: () => {},
};

export default ProjectCard;
