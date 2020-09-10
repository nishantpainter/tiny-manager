import faker from "faker";
import { v4 as uuid } from "uuid";

function getId() {
  return uuid();
}

function getProjects() {
  return new Array(10).fill(0).map(() => getProject(getId()));
}

function getProject(projectId) {
  return {
    id: projectId,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  };
}

function getTasks(projectId) {
  return new Array(10).fill(0).map(() => ({
    id: getId(),
    projectId,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
  }));
}

function getTask(taskId) {
  return {
    id: taskId,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
  };
}

function getTodos() {
  return new Array(10).fill(0).map(() => ({
    id: getId(),
    title: faker.commerce.department(),
    completed: false,
  }));
}

function addTodo(todo) {
  return {
    id: getId(),
    completed: false,
    ...todo,
  };
}

function updateTodo(todo) {
  return {
    ...todo,
  };
}

export default {
  getProjects,
  getProject,
  getTasks,
  getTask,
  getTodos,
  addTodo,
  updateTodo,
};
