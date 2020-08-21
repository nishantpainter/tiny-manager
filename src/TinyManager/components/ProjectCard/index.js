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
  const { project } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" color="primary" noWrap>
        {project.name}
      </Typography>
      <Typography variant="subtitle1" noWrap>
        {project.description}
      </Typography>
    </Paper>
  );
}

ProjectCard.defaultProps = {
  project: {},
};

export default ProjectCard;
