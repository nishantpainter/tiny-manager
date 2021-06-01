import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

import Loader from "TinyManager/components/Loader";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import { useTranslation } from "TinyManager/providers/TranslationProvider";
import useDialog from "TinyManager/hooks/useDialog";
import ConfirmationDialog from "TinyManager/components/ConfirmationDialog/ConfirmationDialog";
import OutlinedSelect from "TinyManager/components/OutlinedSelect";

const filterByMenu = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

function filterProjectsBy(projects, filter) {
  switch (filter) {
    case "pending":
      return projects.filter((t) => t.progress !== 100);
    case "completed":
      return projects.filter((t) => t.progress === 100);
    case "all":
    default:
      return projects;
  }
}
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
  action: {
    marginTop: theme.spacing(1),
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
  const [filterBy, setFilterBy] = useState("all");

  const [
    deleteAllProjectDialog,
    openDeleteAllProjectDialog,
    closeDeleteAllProjectDialog,
  ] = useDialog();

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

  const handleDeleteAllProject = useCallback(() => {
    if (projects.length) {
      const { projectIds, taskIds } = projects.reduce(
        ({ projectIds, taskIds }, project) => {
          return {
            projectIds: [...projectIds, project.id],
            taskIds: [...taskIds, ...project.tasks.map((t) => t.id)],
          };
        },
        { projectIds: [], taskIds: [] }
      );

      TinyManagerAPI.removeBulkProjects(projectIds).then(async () => {
        await TinyManagerAPI.removeBulkTasks(taskIds);
        setProjects([]);
        closeDeleteAllProjectDialog();
      });
    }
  }, [closeDeleteAllProjectDialog, projects]);

  const handleChangeFilterBy = useCallback((event) => {
    setFilterBy(event.target.value);
  }, []);

  const hasProjects = projects && projects.length;

  let $projects = filterProjectsBy(projects, filterBy);

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
          <Button variant="contained" color="primary" onClick={onNew}>
            {t("Add New Project")}
          </Button>
          &nbsp;&nbsp;
          <Button
            disabled={!projects.length}
            color="primary"
            variant="outlined"
            onClick={openDeleteAllProjectDialog}
          >
            {t("Delete All")}
          </Button>
        </div>
        <div className={classes.action}>
          <OutlinedSelect
            id="project-filter-by"
            label={t("Filter By")}
            value={filterBy}
            menu={filterByMenu}
            disabled={!hasProjects}
            onChange={handleChangeFilterBy}
          />
        </div>
        <div className={classes.list}>
          {hasProjects && $projects.length ? (
            <Grid container spacing={3}>
              {$projects.map((project) => (
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
        <ConfirmationDialog
          title={t("Delete Project")}
          content={t(`Delete ${project?.name} and related tasks ?`)}
          open={deleteDialog}
          translate={t}
          onClose={closeDeleteDialog}
          onConfirm={handleDeleteProject}
        />
        <ConfirmationDialog
          title={t("Delete All Projects")}
          content={t("Do you want to remove all the projects ?")}
          open={deleteAllProjectDialog}
          translate={t}
          onClose={closeDeleteAllProjectDialog}
          onConfirm={handleDeleteAllProject}
        />
      </div>
    </Fade>
  );
}

ProjectList.propTypes = {
  onNew: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProjectList;
