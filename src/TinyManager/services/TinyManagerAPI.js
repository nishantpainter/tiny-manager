import MockService from "TinyManager/services/MockService";
import DbService from "TinyManager/services/DbService";

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
  return DbService.find("projects");
}

function fetchProject(projectId) {
  return fetch(MockService.getProject(projectId));
}

function fetchTasks(projectId) {
  return fetch(MockService.getTasks(projectId));
}

function fetchTask(taskId) {}

function addProject(project) {
  return DbService.insert("projects", project);
}

function addTask(task) {
  return fetch(MockService.addTask(task));
}

function updateProject(projectId, project) {}

function updateTask(taskId, task) {
  return fetch(MockService.updateTask(task));
}

function removeProject(projectId) {}

function removeTask(taskId) {}

function fetchTodos() {
  return DbService.find("todos");
}

function addTodo(todo) {
  return DbService.insert("todos", todo);
}

function updateTodo(todo) {
  return DbService.update("todos", todo);
}

function removeTodo(todo) {
  return DbService.remove("todos", todo);
}

export default {
  fetchProjects,
  fetchProject,
  fetchTasks,
  fetchTask,
  addProject,
  addTask,
  updateProject,
  updateTask,
  removeTodo,
  removeProject,
  removeTask,
  fetchTodos,
  addTodo,
  updateTodo,
};
