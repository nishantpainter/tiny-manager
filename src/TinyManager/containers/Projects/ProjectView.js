import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
  selection: {
    marginRight: theme.spacing(),
  },
  list: {
    padding: theme.spacing(4),
    height: "85%",
    overflow: "auto",
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

  const [
    { loading, project, tasks, task, sortBy, filterBy },
    setStore,
  ] = useState({
    loading: true,
    project: {},
    tasks: [],
    task: {},
    sortBy: "createdAt",
    filterBy: "all",
  });

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const [deleteAllTaskDialogOpen, setDeleteAllTaskDialogOpen] = useState(false);

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const handleOpenTaskDialog = useCallback(() => {
    setTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = useCallback(() => {
    setTaskDialogOpen(false);
    setStore((store) => ({ ...store, task: {} }));
  }, []);

  const handleOpenProjectDialog = useCallback(() => {
    setProjectDialogOpen(true);
  }, []);

  const handleCloseProjectDialog = useCallback(() => {
    setProjectDialogOpen(false);
  }, []);

  const handleChangeSortBy = useCallback((event) => {
    setStore((store) => ({ ...store, sortBy: event.target.value }));
  }, []);

  const handleChangeFilterBy = useCallback((event) => {
    setStore((store) => ({ ...store, filterBy: event.target.value }));
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
        handleCloseProjectDialog();
      });
    },
    [handleCloseProjectDialog]
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
      if (task.id) {
        handleUpdateTask(task);
      } else {
        handleAddNewTask(task);
      }
    },
    [handleUpdateTask, handleAddNewTask]
  );

  const handleTaskClick = useCallback(
    (e, task = {}) => {
      setStore((store) => ({ ...store, task }));
      handleOpenTaskDialog();
    },
    [handleOpenTaskDialog]
  );

  const handleTaskDelete = useCallback((e, task) => {
    TinyManagerAPI.removeTask(task.id);
    setStore((store) => ({
      ...store,
      tasks: store.tasks.filter((t) => t.id !== task.id),
    }));
  }, []);

  const handleProjectEditClick = useCallback(() => {
    handleOpenProjectDialog();
  }, [handleOpenProjectDialog]);

  const handleOpenDeleteAllTaskDialog = useCallback(() => {
    setDeleteAllTaskDialogOpen(true);
  }, []);

  const handleCloseDeleteAllTaskDialog = useCallback(() => {
    setDeleteAllTaskDialogOpen(false);
  }, []);

  const handleDeleteAllTask = useCallback(() => {
    if (tasks.length) {
      TinyManagerAPI.removeBulkTask(tasks.map(({ id }) => id)).then(() => {
        setStore((store) => ({ ...store, tasks: [] }));
        handleCloseDeleteAllTaskDialog();
      });
    }
  }, [handleCloseDeleteAllTaskDialog, tasks]);

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

  let $tasks = sortTasksBy(tasks, sortBy);
  $tasks = filterTasksBy($tasks, filterBy);

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
          <Grid item xs={12} md={6}>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.selection}
            >
              <InputLabel id="task-sort-by">Sort By</InputLabel>
              <Select
                margin="dense"
                label="Sort By"
                labelId="task-sort-by"
                variant="outlined"
                value={sortBy}
                onChange={handleChangeSortBy}
                disabled={!(tasks && tasks.length)}
              >
                {sortByMenu.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense" variant="outlined">
              <InputLabel id="task-filter-by">Filter By</InputLabel>
              <Select
                margin="dense"
                label="Sort By"
                labelId="task-filter-by"
                variant="outlined"
                value={filterBy}
                onChange={handleChangeFilterBy}
                disabled={!(tasks && tasks.length)}
              >
                {filterByMenu.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {$tasks && $tasks.length ? (
          <Grid container spacing={3} className={classes.list}>
            {$tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskCard
                  task={task}
                  className={classes.taskCard}
                  onClick={handleTaskClick}
                  onDelete={handleTaskDelete}
                />
              </Grid>
            ))}
          </Grid>
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
