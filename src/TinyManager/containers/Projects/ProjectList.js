import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Loader from "TinyManager/components/Loader";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  list: {
    flex: 1,
    marginTop: theme.spacing(),
    overflow: "auto",
    padding: theme.spacing(3.5),
  },
  card: {
    marginBottom: theme.spacing(3.5),
  },
}));

function ProjectList(props) {
  const { onProjectClick, onNewProject } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const [deleteConfirmationStore, setDeleteConfirmationStore] = useState({
    open: false,
    project: null,
  });

  useEffect(() => {
    TinyManagerAPI.fetchProjects()
      .then(async (projects) => {
        const tasks = await Promise.all(
          projects.map((project) =>
            TinyManagerAPI.fetchTasks(Number(project.id))
          )
        );

        projects = projects.map((project, i) => {
          const projectTasks = tasks[i];
          project.tasks = projectTasks;
          project.progress =
            projectTasks && projectTasks.length
              ? projectTasks.reduce(
                  (progress, task) =>
                    progress +
                    ((100 / projectTasks.length) * Number(task.progress)) / 100,
                  0
                )
              : 0;
          return project;
        });

        setLoading(false);
        setProjects(projects);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleProjectClick = (e, project) => {
    onProjectClick(project.id);
  };

  const handleNewProject = useCallback(() => {
    onNewProject();
  }, [onNewProject]);

  const handleOpenDeleteConfirmation = useCallback((e, project) => {
    e.stopPropagation();
    setDeleteConfirmationStore({ open: true, project });
  }, []);

  const handleCloseDeleteConfirmation = useCallback(() => {
    setDeleteConfirmationStore({ open: false, project: null });
  }, []);

  const handleDeleteProject = useCallback(() => {
    const { id: projectId } = deleteConfirmationStore.project;
    TinyManagerAPI.removeProject(projectId).then(() => {
      setProjects((projects) => projects.filter((p) => p.id !== projectId));
    });
    handleCloseDeleteConfirmation();
  }, [deleteConfirmationStore, handleCloseDeleteConfirmation]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <div>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleNewProject}>
            Add New
          </Button>
        </div>
        <div className={classes.list}>
          {projects && projects.length ? (
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard
                    project={project}
                    progress={project.progress}
                    className={classes.card}
                    onClick={handleProjectClick}
                    onDelete={handleOpenDeleteConfirmation}
                    showDeleteButton={true}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No available projects.</Typography>
          )}
        </div>
        <Dialog
          open={deleteConfirmationStore.open}
          onClose={handleCloseDeleteConfirmation}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Delete {deleteConfirmationStore.project?.name} and related tasks ?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteProject}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fade>
  );
}

ProjectList.propTypes = {
  onNewProject: PropTypes.func,
  onProjectClick: PropTypes.func,
};

export default ProjectList;
