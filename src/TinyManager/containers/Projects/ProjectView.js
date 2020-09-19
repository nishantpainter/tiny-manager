import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, Fade, Dialog } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";
import TaskFormContainer from "TinyManager/containers/Projects/TaskForm";
import TaskCard from "TinyManager/components/TaskCard";

const useStyles = makeStyles((theme) => ({
  taskCard: {
    marginBottom: theme.spacing(2),
  },
  noTasksMessage: {
    marginTop: theme.spacing(),
  },
}));

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const classes = useStyles();

  const [{ loading, project, tasks, task }, setStore] = React.useState({
    loading: true,
    project: {},
    tasks: [],
    task: {},
  });

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);

  const handleOpenTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(false);
    setStore((store) => ({ ...store, task: {} }));
  }, []);

  const handleUpdateTask = React.useCallback(
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

  const handleAddNewTask = React.useCallback(
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

  const handleTaskFormSubmit = React.useCallback(
    (task) => {
      if (task.id) {
        handleUpdateTask(task);
      } else {
        handleAddNewTask(task);
      }
    },
    [handleUpdateTask, handleAddNewTask]
  );

  const handleTaskClick = React.useCallback(
    (e, task = {}) => {
      setStore((store) => ({ ...store, task }));
      handleOpenTaskDialog();
    },
    [handleOpenTaskDialog]
  );

  const handleTaskDelete = React.useCallback((e, task) => {
    setStore((store) => ({
      ...store,
      tasks: store.tasks.filter((t) => t.id !== task.id),
    }));
  }, []);

  React.useEffect(() => {
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

  return (
    <Fade in={true}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProjectCard project={project} />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleOpenTaskDialog}
            >
              Add New Task
            </Button>
          </Grid>
        </Grid>
        {tasks && tasks.length ? (
          <div
            style={{ height: "85%", padding: `32px 32px`, overflow: "auto" }}
          >
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                className={classes.taskCard}
                onClick={handleTaskClick}
                onDelete={handleTaskDelete}
              />
            ))}
          </div>
        ) : (
          <Typography variant="body1" className={classes.noTasksMessage}>
            No available tasks.
          </Typography>
        )}
        <Dialog open={taskDialogOpen} onClose={handleCloseTaskDialog}>
          <TaskFormContainer
            initialValues={task}
            onCancel={handleCloseTaskDialog}
            onSubmit={handleTaskFormSubmit}
          />
        </Dialog>
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
