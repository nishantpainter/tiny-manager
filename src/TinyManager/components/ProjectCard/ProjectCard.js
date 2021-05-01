import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";
import IconButton from "../IconButton";
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
  const {
    className,
    project,
    progress,
    onClick,
    onEdit,
    onDelete,
    showEditButton,
    showDeleteButton,
  } = props;

  const classes = useStyles();

  const handleClick = React.useCallback(
    (e) => {
      onClick && onClick(e, project);
    },
    [project, onClick]
  );

  const handleEdit = React.useCallback(
    (e) => {
      onEdit && onEdit(e, project);
    },
    [project, onEdit]
  );

  const handleDelete = React.useCallback(
    (e) => {
      onDelete && onDelete(e, project);
    },
    [project, onDelete]
  );

  return (
    <Paper className={clsx(classes.paper, className)} onClick={handleClick}>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" color="primary" noWrap title={project.name}>
          {project.name}
        </Typography>
        <Box display="flex">
          {showEditButton && <IconButton icon="edit" onClick={handleEdit} />}
          {showDeleteButton && (
            <IconButton icon="delete" onClick={handleDelete} />
          )}
        </Box>
      </Box>
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
  project: Types.ProjectType,
  progress: PropTypes.number,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
};

ProjectCard.defaultProps = {
  project: {},
  progress: 0,
  showEditButton: false,
};

export default ProjectCard;
