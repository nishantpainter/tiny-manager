import React from "react";
import Paper from "../Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function ProjectCard(props) {
  const { project, onClick } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.paper} onClick={(e) => onClick(e, project)}>
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
