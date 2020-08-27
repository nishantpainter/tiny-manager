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
});
