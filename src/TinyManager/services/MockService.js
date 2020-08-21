import faker from "faker";
import { v4 as uuid } from "uuid";

function getId() {
  return uuid();
}

function getProjects() {
  return new Array(10).fill(0).map(() => ({
    id: getId(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  }));
}

function getProject(projectId) {}

function getTasks(projectId) {}

function getTask(taskId) {}

export default {
  getProjects,
};
