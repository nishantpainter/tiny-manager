import MockService from "./MockService";

describe("MockService", () => {
  describe("getProjects", () => {
    const { getProjects } = MockService;

    it("must be defined", () => {
      expect(getProjects).toBeDefined();
    });

    it("must return projects", () => {
      const projects = getProjects();
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBeTruthy();

      const [project] = projects;

      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.description).toBeDefined();
    });
  });

  describe("getProject", () => {
    const { getProject } = MockService;

    it("must be defined", () => {
      expect(getProject).toBeDefined();
    });

    it("must return a project", () => {
      const projectId = 1;
      const project = getProject(projectId);

      expect(project.id).toBeDefined();
      expect(project.id).toBe(1);
      expect(project.name).toBeDefined();
      expect(project.description).toBeDefined();
    });
  });

  describe("getTasks", () => {
    const { getTasks } = MockService;

    it("must be defined", () => {
      expect(getTasks).toBeDefined();
    });

    it("must return tasks", () => {
      const projectId = 1;
      const tasks = getTasks(projectId);

      expect(tasks).toBeDefined();
      expect(Array.isArray(tasks)).toBeTruthy();

      const [task] = tasks;

      expect(task.id).toBeDefined();
      expect(task.projectId).toBe(projectId);
      expect(task.title).toBeDefined();
      expect(task.description).toBeDefined();
    });
  });

  describe("getTask", () => {
    const { getTask } = MockService;

    it("must be defined", () => {
      expect(getTask).toBeDefined();
    });

    it("must return a tasks", () => {
      const taskId = 1;
      const task = getTask(taskId);

      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.id).toBe(taskId);
      expect(task.title).toBeDefined();
      expect(task.description).toBeDefined();
    });
  });

  describe("getTodos", () => {
    const { getTodos } = MockService;

    it("must be defined", () => {
      expect(getTodos).toBeDefined();
    });

    it("must return todos", () => {
      const todos = getTodos();

      expect(todos).toBeDefined();
      expect(Array.isArray(todos)).toBeTruthy();

      const [todo] = todos;

      expect(todo.id).toBeDefined();
      expect(todo.title).toBeDefined();
      expect(todo.completed).toBeDefined();
    });
  });

  describe("addTodo", () => {
    const { addTodo } = MockService;

    it("must be defined", () => {
      expect(addTodo).toBeDefined();
    });

    it("must return todo with id", () => {
      const todo = addTodo({ title: "make-coffee" });

      expect(todo).toBeDefined();
      expect(todo.id).toBeDefined();
      expect(todo.title).toBeDefined();
      expect(todo.title).toBe("make-coffee");
      expect(todo.completed).toBeDefined();
      expect(todo.completed).toBeFalsy();
    });
  });

  describe("updateTodo", () => {
    const { updateTodo } = MockService;

    it("must be defined", () => {
      expect(updateTodo).toBeDefined();
    });

    it("must return todo as it is", () => {
      const testTodo = {
        id: 1,
        title: "make-coffee",
        completed: false,
      };

      const todo = updateTodo(testTodo);

      expect(todo).toBeDefined();
      expect(todo).toEqual(testTodo);
    });
  });

  describe("addTask", () => {
    const { addTask } = MockService;

    it("must be defined", () => {
      expect(addTask).toBeDefined();
    });

    it("must return task with id", () => {
      const task = addTask({ title: "make-coffee" });

      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.title).toBeDefined();
      expect(task.title).toBe("make-coffee");
    });
  });
});
