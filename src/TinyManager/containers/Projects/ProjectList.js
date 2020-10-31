import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import Loader from "TinyManager/components/Loader";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  projectlist: { height: "85%", padding: theme.spacing(4), overflow: "auto" },
  projectCard: {
    marginBottom: theme.spacing(2),
  },
}));

function ProjectList(props) {
  const { onProjectClick, onNewProject } = props;

  const classes = useStyles();

  const [loadingProjects, setLoadingProjects] = React.useState(true);
  const [projects, setProjects] = React.useState([]);

  const [deleteConfirmationStore, setDeleteConfirmationStore] = React.useState({
    open: false,
    project: null,
  });

  React.useEffect(() => {
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

        setLoadingProjects(false);
        setProjects(projects);
      })
      .catch(() => {
        setLoadingProjects(false);
      });
  }, []);

  const handleProjectClick = (e, project) => {
    onProjectClick(project.id);
  };

  const handleNewProject = React.useCallback(() => {
    onNewProject();
  }, [onNewProject]);

  const handleOpenDeleteConfirmation = React.useCallback((e, project) => {
    e.stopPropagation();
    setDeleteConfirmationStore({ open: true, project });
  }, []);

  const handleCloseDeleteConfirmation = React.useCallback(() => {
    setDeleteConfirmationStore({ open: false, project: null });
  }, []);

  const handleDeleteProject = React.useCallback(() => {
    const { id: projectId } = deleteConfirmationStore.project;
    TinyManagerAPI.removeProject(projectId).then(() => {
      setProjects((projects) => projects.filter((p) => p.id !== projectId));
    });
    handleCloseDeleteConfirmation();
  }, [deleteConfirmationStore, handleCloseDeleteConfirmation]);

  if (loadingProjects) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Typography variant="h5" gutterBottom>
          Projects
        </Typography>
        <Button color="primary" variant="outlined" onClick={handleNewProject}>
          Add New
        </Button>
        <br />
        <br />
        {projects && projects.length ? (
          <div className={classes.projectList}>
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <ProjectCard
                  project={project}
                  progress={project.progress}
                  className={classes.projectCard}
                  onClick={handleProjectClick}
                  onDelete={handleOpenDeleteConfirmation}
                  showDeleteButton={true}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <Typography variant="body1">No available projects.</Typography>
        )}
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
