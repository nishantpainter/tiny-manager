import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";
import TaskFormContainer from "TinyManager/containers/Projects/TaskForm";
import ProjectFormContainer from "TinyManager/containers/Projects/ProjectForm";
import TaskCard from "TinyManager/components/TaskCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  taskCard: {
    marginBottom: theme.spacing(2),
  },
  noTasksMessage: {
    marginTop: theme.spacing(),
  },
}));

const sortByMenu = [
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Created",
    value: "created",
  },
];
function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const classes = useStyles();

  const [{ loading, project, tasks, task, sortBy }, setStore] = React.useState({
    loading: true,
    project: {},
    tasks: [],
    task: {},
    sortBy: "created",
  });

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);

  const [deleteAllTaskDialogOpen, setDeleteAllTaskDialogOpen] = React.useState(
    false
  );

  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);

  const handleOpenTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(false);
    setStore((store) => ({ ...store, task: {} }));
  }, []);

  const handleOpenProjectDialog = React.useCallback(() => {
    setProjectDialogOpen(true);
  }, []);

  const handleCloseProjectDialog = React.useCallback(() => {
    setProjectDialogOpen(false);
  }, []);

  const handleChangeSortBy = React.useCallback((event) => {
    setStore((store) => ({ ...store, sortBy: event.target.value }));
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

  const handleUpdateProject = React.useCallback(
    (project) => {
      TinyManagerAPI.updateProject(project.id, project).then((project) => {
        setStore((store) => ({
          ...store,
          project,
        }));
        handleCloseProjectDialog();
      });
    },
    [handleCloseProjectDialog]
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
    TinyManagerAPI.removeTask(task.id);
    setStore((store) => ({
      ...store,
      tasks: store.tasks.filter((t) => t.id !== task.id),
    }));
  }, []);

  const handleProjectEditClick = React.useCallback(() => {
    handleOpenProjectDialog();
  }, [handleOpenProjectDialog]);

  const handleOpenDeleteAllTaskDialog = React.useCallback(() => {
    setDeleteAllTaskDialogOpen(true);
  }, []);

  const handleCloseDeleteAllTaskDialog = React.useCallback(() => {
    setDeleteAllTaskDialogOpen(false);
  }, []);

  const handleDeleteAllTask = React.useCallback(() => {
    if (tasks.length) {
      TinyManagerAPI.removeBulkTask(tasks.map(({ id }) => id)).then(() => {
        setStore((store) => ({ ...store, tasks: [] }));
        handleCloseDeleteAllTaskDialog();
      });
    }
  }, [handleCloseDeleteAllTaskDialog, tasks]);

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
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProjectCard
              project={project}
              showEditButton={true}
              onEdit={handleProjectEditClick}
              progress={
                tasks && tasks.length
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
              onClick={handleOpenTaskDialog}
            >
              Add New Task
            </Button>
            &nbsp;&nbsp;
            <Button
              disabled={!tasks.length}
              color="primary"
              variant="outlined"
              onClick={handleOpenDeleteAllTaskDialog}
            >
              Delete All
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControl margin="dense" variant="outlined">
              <InputLabel id="task-sort-by">Sort By</InputLabel>
              <Select
                margin="dense"
                label="Sort By"
                labelId="task-sort-by"
                variant="outlined"
                value={sortBy}
                disabled
                onChange={handleChangeSortBy}
              >
                {sortByMenu.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

        <Dialog open={projectDialogOpen} onClose={handleCloseProjectDialog}>
          <ProjectFormContainer
            initialValues={project}
            onCancel={handleCloseProjectDialog}
            onSubmit={handleUpdateProject}
          />
        </Dialog>

        <Dialog
          open={deleteAllTaskDialogOpen}
          onClose={handleCloseDeleteAllTaskDialog}
        >
          <DialogTitle>Delete All Tasks</DialogTitle>
          <DialogContent>Do you want to remove all the tasks ?</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteAllTaskDialog}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteAllTask}
            >
              Confirm
            </Button>
          </DialogActions>
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
