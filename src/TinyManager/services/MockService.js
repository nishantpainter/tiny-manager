import faker from "faker";
import { v4 as uuid } from "uuid";

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

function getId() {
  return uuid();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
    title: faker.internet.domainName(),
    description: faker.lorem.sentence(),
    progress: (getRandomInt(101) % 10) * 10,
    priority: getRandomInt(3),
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

function addTask(task) {
  return {
    id: getId(),
    ...task,
  };
}

function updateTask(task) {
  return task;
}

export default {
  getProjects,
  getProject,
  getTasks,
  getTask,
  getTodos,
  addTodo,
  updateTodo,
  addTask,
  updateTask,
};
