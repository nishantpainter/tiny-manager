import DbService from "./DbService";

describe("DbService", () => {
  it("must be defined", () => {
    expect(DbService).toBeDefined();
    expect(DbService).toBeTruthy();
  });

  describe("getTable", () => {
    const { getTable } = DbService;

    it("must be defined", () => {
      expect(getTable).toBeDefined();
    });

    it("must return table", () => {
      const table = getTable("projects");
      expect(table).toBeDefined();
      expect(table.name).toBe("projects");
    });
  });

  describe("find", () => {
    const { find } = DbService;

    it("must be defined", () => {
      expect(find).toBeDefined();
    });
  });

  describe("findOne", () => {
    const { findOne } = DbService;

    it("must be defined", () => {
      expect(findOne).toBeDefined();
    });
  });

  describe("insert", () => {
    const { insert } = DbService;

    it("must be defined", () => {
      expect(insert).toBeDefined();
    });
  });

  describe("update", () => {
    const { update } = DbService;

    it("must be defined", () => {
      expect(update).toBeDefined();
    });
  });

  describe("remove", () => {
    const { remove } = DbService;

    it("must be defined", () => {
      expect(remove).toBeDefined();
    });
  });

  describe("DB", () => {
    const { getTable } = DbService;

    it("must be initialized", () => {
      const projectsTable = getTable("projects");

      expect(projectsTable).toBeDefined();
      expect(projectsTable.name).toEqual("projects");

      const todosTable = getTable("todos");

      expect(todosTable).toBeDefined();
      expect(todosTable.name).toEqual("todos");

      const tasksTable = getTable("tasks");

      expect(tasksTable).toBeDefined();
      expect(tasksTable.name).toEqual("tasks");

      const updatesTable = getTable("updates");

      expect(updatesTable).toBeDefined();
      expect(updatesTable.name).toEqual("updates");
    });
  });
});
