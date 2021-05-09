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
import { useTranslation } from "TinyManager/providers/TranslationProvider";

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
  const { onClick, onNew } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

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

  const handleProjectClick = (event, project) => {
    onClick(project.id);
  };

  const openDeleteDialog = useCallback((event, project) => {
    event.stopPropagation();
    setDeleteDialog(true);
    setProject(project);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialog(false);
    setProject(null);
  }, []);

  const handleDeleteProject = useCallback(() => {
    const { id } = project;

    TinyManagerAPI.removeProject(id).then(() => {
      setProjects((projects) => projects.filter((p) => p.id !== id));
    });

    closeDeleteDialog();
  }, [project, closeDeleteDialog]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <div>
          <Typography variant="h5" gutterBottom>
            {t("Projects")}
          </Typography>
          <Button color="primary" variant="outlined" onClick={onNew}>
            {t("Add New")}
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
                    onDelete={openDeleteDialog}
                    showDeleteButton={true}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">
              {t("No available projects.")}
            </Typography>
          )}
        </div>
        <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
          <DialogTitle>{t("Delete Project")}</DialogTitle>
          <DialogContent>
            {t(`Delete ${project?.name} and related tasks ?`)}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>{t("Cancel")}</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteProject}
            >
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fade>
  );
}

ProjectList.propTypes = {
  onNew: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProjectList;
