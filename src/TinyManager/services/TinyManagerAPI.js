import DbService from "TinyManager/services/DbService";
import LocalStorageService from "TinyManager/services/LocalStorageService";

function fetchProjects() {
  return DbService.find("projects");
}

function fetchProject(projectId) {
  return DbService.findOne("projects", projectId);
}

function fetchTasks(projectId) {
  return DbService.find("tasks", { where: { projectId } });
}

function fetchTask(taskId) {
  return DbService.findOne("tasks", taskId);
}

function addProject(project) {
  return DbService.insert("projects", project);
}

function addTask(task) {
  return DbService.insert("tasks", task);
}

function updateProject(projectId, project) {
  return DbService.update("projects", project);
}

function updateTask(taskId, task) {
  return DbService.update("tasks", task);
}

function removeProject(projectId) {
  return DbService.remove("projects", { id: projectId });
}

function removeBulkProjects(projectIds) {
  return DbService.removeBulk("projects", projectIds);
}

function removeTask(taskId) {
  return DbService.remove("tasks", { id: taskId });
}

function removeBulkTasks(taskIds) {
  return DbService.removeBulk("tasks", taskIds);
}

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

function removeBulkTodos(todoIds) {
  return DbService.removeBulk("todos", todoIds);
}

function fetchNotes() {
  return LocalStorageService.getNotes();
}

function updateNotes(notes) {
  return LocalStorageService.setNotes(notes);
}

function updateDefaultNotes(value) {
  LocalStorageService.setDefaultNotes(value);
}

function fetchDefaultNotes() {
  return LocalStorageService.getDefaultNotes();
}

function updateDarkMode(value) {
  LocalStorageService.setDarkMode(value);
}

function fetchDarkMode() {
  return LocalStorageService.getDarkMode();
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
  removeBulkTodos,
  removeProject,
  removeBulkProjects,
  removeTask,
  removeBulkTasks,
  fetchTodos,
  addTodo,
  updateTodo,
  fetchNotes,
  updateNotes,
  updateDefaultNotes,
  fetchDefaultNotes,
  updateDarkMode,
  fetchDarkMode,
};
