import DbService from "./DbService";

describe("DbService", () => {
  it("must be defined", () => {
    expect(DbService).toBeDefined();
    expect(DbService).toBeTruthy();
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
});
