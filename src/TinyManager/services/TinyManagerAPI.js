async function fetch(data, rejectPromise = false, errorMessage = "") {
  return new Promise((reject, resolve) => {
    const handler = () => {
      if (rejectPromise) {
        reject(errorMessage);
      } else {
        resolve(data);
      }
    };
    setTimeout(handler, 1000); // Stimulate fetch
  });
}

function fetchProjects() {}

function fetchProject(projectId) {}

function fetchTasks(projectId) {}

function fetchTask(taskId) {}

function addProject(project) {}

function addTask(task) {}

function updateProject(projectId, project) {}

function updateTask(taskId, task) {}

function removeProject(projectId) {}

function removeTask(taskId) {}

export default {
  fetchProjects,
  fetchProject,
  fetchTasks,
  fetchTask,
  addProject,
  addTask,
  updateProject,
  updateTask,
  removeProject,
  removeTask,
};
