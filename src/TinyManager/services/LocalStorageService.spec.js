import LocalStorageService from "./LocalStorageService";

describe("LocalStorageService", () => {
  const getItem = jest.fn();
  const setItem = jest.fn();

  const service = {
    getItem,
    setItem,
  };

  beforeEach(() => {
    getItem.mockClear();
    setItem.mockClear();
  });

  it("must be defined", () => {
    expect(LocalStorageService).toBeDefined();
  });

  describe("DEFAULT_NOTES", () => {
    const { DEFAULT_NOTES } = LocalStorageService;

    it("must be defined", () => {
      expect(DEFAULT_NOTES).toBeDefined();
    });
  });

  describe("setDefaultNotes", () => {
    const { setDefaultNotes, DEFAULT_NOTES } = LocalStorageService;

    it("must be defined", () => {
      expect(setDefaultNotes).toBeDefined();
    });

    it("must set local storage DEFAULT_NOTES value", () => {
      setDefaultNotes(true, service);
      expect(service.setItem).toHaveBeenCalledTimes(1);
      expect(service.setItem).toHaveBeenCalledWith(DEFAULT_NOTES, true);
    });
  });

  describe("getDefaultNotes", () => {
    const { getDefaultNotes } = LocalStorageService;

    it("must be defined", () => {
      expect(getDefaultNotes).toBeDefined();
    });

    it("must get local storage DEFAULT_NOTES value", () => {
      getDefaultNotes(service);
      expect(service.getItem).toHaveBeenCalledTimes(1);
    });
  });
});
