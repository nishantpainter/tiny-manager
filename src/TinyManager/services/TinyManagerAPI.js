import MockService from "TinyManager/services/MockService";

async function fetch(data, rejectPromise = false, errorMessage = "") {
  return new Promise((resolve, reject) => {
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

function fetchProjects() {
  return fetch(MockService.getProjects());
}

function fetchProject(projectId) {
  return fetch(MockService.getProject(projectId));
}

function fetchTasks(projectId) {}

function fetchTask(taskId) {}

function addProject(project) {}

function addTask(task) {}

function updateProject(projectId, project) {}

function updateTask(taskId, task) {}

function removeProject(projectId) {}

function removeTask(taskId) {}

function fetchTodos() {
  return fetch(MockService.getTodos());
}

function addTodo() {}

function updateTodo() {}

function removeTodo() {}

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
  fetchTodos,
};
