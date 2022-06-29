import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";

import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import useDialog from "TinyManager/hooks/useDialog";
import { useTranslation } from "TinyManager/providers/TranslationProvider";
import TaskFormContainer from "TinyManager/containers/Projects/TaskForm";
import ProjectFormContainer from "TinyManager/containers/Projects/ProjectForm";
import ProjectCard from "TinyManager/components/ProjectCard";
import Loader from "TinyManager/components/Loader";
import TaskCard from "TinyManager/components/TaskCard";
import ConfirmationDialog from "TinyManager/components/ConfirmationDialog";
import OutlinedSelect from "TinyManager/components/OutlinedSelect";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  noTasksMessageWrapper: {
    marginTop: theme.spacing(),
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: 500,
  },
  noTasksMessage: {
    minWidth: 500,
  },
  selection: {
    marginRight: theme.spacing(),
  },
  list: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    height: "85%",
    overflow: "auto",
    alignContent: "baseline",
  },
  action: {
    maxWidth: 500,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const sortByMenu = [
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Progress",
    value: "progress",
  },
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Created",
    value: "createdAt",
  },
  {
    label: "Updated",
    value: "updatedAt",
  },
];

const filterByMenu = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

function sortTasksBy(tasks, filter) {
  return tasks.sort((a, b) => {
    if (b[filter] < a[filter]) {
      return -1;
    }
    if (b[filter] > a[filter]) {
      return 1;
    }
    return 0;
  });
}

function filterTasksBy(tasks, filter) {
  switch (filter) {
    case "pending":
      return tasks.filter((t) => t.progress !== 100);
    case "completed":
      return tasks.filter((t) => t.progress === 100);
    case "all":
    default:
      return tasks;
  }
}

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const classes = useStyles();

  const [{ loading, project, tasks, task }, setStore] = useState({
    loading: true,
    project: {},
    tasks: [],
    task: {},
  });

  const [sortBy, setSortBy] = useState("createdAt");
  const [filterBy, setFilterBy] = useState("all");
  const [taskDialog, openTaskDialog, closeTaskDialog] = useDialog();
  const [projectDialog, openProjectDialog, closeProjectDialog] = useDialog();
  const [
    deleteAllTaskDialog,
    openDeleteAllTaskDialog,
    closeDeleteAllTaskDialog,
  ] = useDialog();
  const { t } = useTranslation();

  const handleCloseTaskDialog = useCallback(() => {
    closeTaskDialog(false);
    setStore((store) => ({ ...store, task: {} }));
  }, [closeTaskDialog]);

  const handleChangeSortBy = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const handleChangeFilterBy = useCallback((event) => {
    setFilterBy(event.target.value);
  }, []);

  const handleUpdateTask = useCallback(
    (task) => {
      TinyManagerAPI.updateTask(task.id, task).then((task) => {
        setStore((store) => ({
          ...store,
          tasks: store.tasks.map((t) => (t.id === task.id ? task : t)),
        }));
        handleCloseTaskDialog();
      });
    },
    [handleCloseTaskDialog]
  );

  const handleUpdateProject = useCallback(
    (project) => {
      TinyManagerAPI.updateProject(project.id, project).then((project) => {
        setStore((store) => ({
          ...store,
          project,
        }));
        closeProjectDialog();
      });
    },
    [closeProjectDialog]
  );

  const handleAddNewTask = useCallback(
    (task) => {
      TinyManagerAPI.addTask(
        Object.assign({ projectId: Number(projectId) }, task)
      ).then((task) => {
        setStore((store) => ({ ...store, tasks: [task, ...store.tasks] }));
        handleCloseTaskDialog();
      });
    },
    [handleCloseTaskDialog, projectId]
  );

  const handleTaskFormSubmit = useCallback(
    (task) => {
      const handler = task.id ? handleUpdateTask : handleAddNewTask;
      handler(task);
    },
    [handleUpdateTask, handleAddNewTask]
  );

  const handleTaskClick = useCallback(
    (e, task = {}) => {
      setStore((store) => ({ ...store, task }));
      openTaskDialog();
    },
    [openTaskDialog]
  );

  const handleTaskDelete = useCallback((e, task) => {
    TinyManagerAPI.removeTask(task.id);
    setStore((store) => ({
      ...store,
      tasks: store.tasks.filter((t) => t.id !== task.id),
    }));
  }, []);

  const handleProjectEditClick = useCallback(() => {
    openProjectDialog();
  }, [openProjectDialog]);

  const handleDeleteAllTask = useCallback(() => {
    if (tasks.length) {
      TinyManagerAPI.removeBulkTasks(tasks.map(({ id }) => id)).then(() => {
        setStore((store) => ({ ...store, tasks: [] }));
        closeDeleteAllTaskDialog();
      });
    }
  }, [closeDeleteAllTaskDialog, tasks]);

  useEffect(() => {
    if (projectId) {
      setStore((store) => ({ ...store, loading: true }));
      TinyManagerAPI.fetchProject(Number(projectId))
        .then((project) => {
          TinyManagerAPI.fetchTasks(Number(projectId)).then((tasks) => {
            setStore((store) => ({ ...store, loading: false, project, tasks }));
          });
        })
        .catch(redirectToProjectList);
    } else {
      setStore((store) => ({ ...store, loading: false }));
      redirectToProjectList();
    }
  }, [projectId, redirectToProjectList]);

  if (loading) {
    return <Loader />;
  }

  const hasTasks = tasks && tasks.length;

  let $tasks = sortTasksBy(tasks, sortBy);
  $tasks = filterTasksBy($tasks, filterBy);

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <Grid container spacing={2} className={classes.action}>
          <Grid item xs={12}>
            <ProjectCard
              project={project}
              showEditButton={true}
              onEdit={handleProjectEditClick}
              progress={
                hasTasks
                  ? tasks.reduce(
                      (progress, task) =>
                        progress +
                        ((100 / tasks.length) * Number(task.progress)) / 100,
                      0
                    )
                  : 0
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={openTaskDialog}
            >
              {t("Add New Task")}
            </Button>
            &nbsp;&nbsp;
            <Button
              disabled={!tasks.length}
              color="primary"
              variant="outlined"
              onClick={openDeleteAllTaskDialog}
            >
              {t("Delete All")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <OutlinedSelect
              id="task-sort-by"
              label={t("Sort By")}
              className={classes.selection}
              menu={sortByMenu}
              value={sortBy}
              onChange={handleChangeSortBy}
              disabled={!hasTasks}
            />
            <OutlinedSelect
              id="task-filter-by"
              label={t("Filter By")}
              value={filterBy}
              menu={filterByMenu}
              disabled={!hasTasks}
              onChange={handleChangeFilterBy}
            />
          </Grid>
        </Grid>
        {$tasks && $tasks.length ? (
          <Grid container spacing={2} className={classes.list}>
            {$tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskCard
                  task={task}
                  onClick={handleTaskClick}
                  onDelete={handleTaskDelete}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className={classes.noTasksMessageWrapper}>
            <Typography variant="body1" className={classes.noTasksMessage}>
              {t("No available tasks.")}
            </Typography>
          </div>
        )}
        <Dialog open={taskDialog} onClose={handleCloseTaskDialog}>
          <TaskFormContainer
            initialValues={task}
            onCancel={handleCloseTaskDialog}
            onSubmit={handleTaskFormSubmit}
          />
        </Dialog>

        <Dialog open={projectDialog} onClose={closeProjectDialog}>
          <ProjectFormContainer
            initialValues={project}
            onCancel={closeProjectDialog}
            onSubmit={handleUpdateProject}
          />
        </Dialog>
        <ConfirmationDialog
          title={t("Delete All Tasks")}
          content={t("Do you want to remove all the tasks ?")}
          open={deleteAllTaskDialog}
          onClose={closeDeleteAllTaskDialog}
          onConfirm={handleDeleteAllTask}
        />
      </div>
    </Fade>
  );
}

ProjectView.propTypes = {
  redirectToProjectList: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export default ProjectView;
