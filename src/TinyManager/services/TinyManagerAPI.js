import MockService from "TinyManager/services/MockService";
import DbService from "TinyManager/services/DbService";
import LocalStorageService from "TinyManager/services/LocalStorageService";

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
  return DbService.findOne("projects", projectId);
}

function fetchTasks(projectId) {
  return DbService.find("tasks", { where: { projectId } });
}

function fetchTask(taskId) {}

function addProject(project) {
  return DbService.insert("projects", project);
}

function addTask(task) {
  return DbService.insert("tasks", task);
}

function updateProject(projectId, project) {}

function updateTask(taskId, task) {
  return DbService.update("tasks", task);
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

function fetchNote() {
  return DbService.find("notes").then(([notes]) => {
    if (!notes) {
      return DbService.insert("notes", { note: "" });
    } else {
      return notes;
    }
  });
}

function updateNote(notes) {
  return DbService.update("notes", notes);
}

function updateDefaultNotes(value) {
  LocalStorageService.setDefaultNotes(value);
}

function fetchDefaultNotes() {
  return LocalStorageService.getDefaultNotes();
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
  fetchNote,
  updateNote,
  updateDefaultNotes,
  fetchDefaultNotes,
};
