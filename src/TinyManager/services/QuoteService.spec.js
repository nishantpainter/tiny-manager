import QuoteService from "./QuoteService";

describe("QuoteService", () => {
  describe("getQuote", () => {
    const { getQuote } = QuoteService;

    it("must be defined", () => {
      expect(getQuote).toBeDefined();
    });

    it("must return a quote", () => {
      const quote = getQuote();
      expect(quote).toBeDefined();
    });
  });
});
