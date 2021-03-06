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
      expect(service.setItem).toHaveBeenCalledWith(DEFAULT_NOTES, "true");
    });
  });

  describe("getDefaultNotes", () => {
    const { getDefaultNotes } = LocalStorageService;

    it("must be defined", () => {
      expect(getDefaultNotes).toBeDefined();
    });

    it("must get local storage DEFAULT_NOTES value", () => {
      service.getItem.mockImplementation(() => true);

      const defaultNotes = getDefaultNotes(service);
      expect(service.getItem).toHaveBeenCalledTimes(1);
      expect(defaultNotes).toBeTruthy();
    });
  });

  describe("setDarkMode", () => {
    const { setDarkMode, DARK_MODE } = LocalStorageService;

    it("must be defined", () => {
      expect(setDarkMode).toBeDefined();
    });

    it("must set local storage DARK_MODE value", () => {
      setDarkMode(true, service);
      expect(service.setItem).toHaveBeenCalledTimes(1);
      expect(service.setItem).toHaveBeenCalledWith(DARK_MODE, "true");
    });
  });

  describe("getDarkMode", () => {
    const { getDarkMode } = LocalStorageService;

    it("must be defined", () => {
      expect(getDarkMode).toBeDefined();
    });

    it("must get local storage DARK_MODE value", () => {
      service.getItem.mockImplementation(() => true);

      const darkMode = getDarkMode(service);
      expect(service.getItem).toHaveBeenCalledTimes(1);
      expect(darkMode).toBeTruthy();
    });
  });

  describe("setNotes", () => {
    const { setNotes, NOTES } = LocalStorageService;

    it("must be defined", () => {
      expect(setNotes).toBeDefined();
    });

    it("must set local storage NOTES value", () => {
      setNotes("test-note", service);
      expect(service.setItem).toHaveBeenCalledTimes(1);
      expect(service.setItem).toHaveBeenCalledWith(NOTES, '"test-note"');
    });
  });

  describe("getNotes", () => {
    const { getNotes } = LocalStorageService;

    it("must be defined", () => {
      expect(getNotes).toBeDefined();
    });

    it("must get local storage NOTES value", () => {
      service.getItem.mockImplementation(() => JSON.stringify("test-note"));

      const notes = getNotes(service);
      expect(service.getItem).toHaveBeenCalledTimes(1);
      expect(notes).toBe("test-note");
    });
  });
});
