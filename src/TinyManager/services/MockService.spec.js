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
});
